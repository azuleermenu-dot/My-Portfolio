const RECIPIENT = 'asnorali.dev@gmail.com';
const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 3600;
const localBuckets = new Map();
const MAX_LENGTHS = { name: 80, email: 254, subject: 120, message: 4000 };

function respond(res, status, payload) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(payload);
}

function clean(value, limit) {
  return String(value ?? '').replace(/\u0000/g, '').trim().slice(0, limit);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

async function checkRateLimit(ip) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    const key = 'asnor-portfolio-contact:' + ip;
    const headers = {
      Authorization: 'Bearer ' + redisToken,
      'Content-Type': 'application/json',
    };
    const increment = await fetch(redisUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(['INCR', key]),
    });
    if (!increment.ok) throw new Error('Shared rate-limit service unavailable');

    const result = await increment.json();
    const count = Number(result.result);
    if (!Number.isFinite(count)) throw new Error('Invalid rate-limit response');

    if (count === 1) {
      const expiry = await fetch(redisUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(['EXPIRE', key, WINDOW_SECONDS]),
      });
      if (!expiry.ok) throw new Error('Could not set rate-limit expiry');
    }

    return count <= MAX_REQUESTS;
  }

  // Fallback for local development. Configure Upstash for shared limits across Vercel instances.
  const now = Date.now();
  for (const [key, bucket] of localBuckets) {
    if (now - bucket.startedAt > WINDOW_SECONDS * 1000) localBuckets.delete(key);
  }
  const bucket = localBuckets.get(ip);
  if (!bucket || now - bucket.startedAt > WINDOW_SECONDS * 1000) {
    localBuckets.set(ip, { startedAt: now, count: 1 });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= MAX_REQUESTS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed.' });
  }

  const body = typeof req.body === 'string'
    ? (() => { try { return JSON.parse(req.body); } catch { return null; } })()
    : req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, { error: 'Please submit a valid message.' });
  }

  // Honeypot: return success quietly so automated form fillers do not retry.
  if (clean(body.website, 120)) return respond(res, 200, { ok: true });

  const submittedAt = Number(body.startedAt);
  const elapsed = Date.now() - submittedAt;
  if (!Number.isFinite(submittedAt) || elapsed < 1800 || elapsed > 24 * 60 * 60 * 1000) {
    return respond(res, 400, { error: 'Please review your message and try again.' });
  }

  const name = clean(body.name, MAX_LENGTHS.name);
  const email = clean(body.email, MAX_LENGTHS.email);
  const subject = clean(body.subject, MAX_LENGTHS.subject).replace(/[\r\n]/g, ' ');
  const message = clean(body.message, MAX_LENGTHS.message);

  if (!name || !email || !subject || !message) {
    return respond(res, 400, { error: 'Please complete all fields.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || /[\r\n]/.test(email)) {
    return respond(res, 400, { error: 'Enter a valid email address.' });
  }
  if (name.length < 2 || subject.length < 3 || message.length < 10) {
    return respond(res, 400, { error: 'Please add a little more detail to your message.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown')
    .split(',')[0].trim().slice(0, 80);

  try {
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return respond(res, 429, { error: 'Too many messages were sent from this connection. Please try again later.' });
    }
  } catch (error) {
    console.error('Contact rate-limit check failed:', error);
    return respond(res, 503, { error: 'The contact service is temporarily unavailable. Please email me directly.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return respond(res, 503, {
      error: 'Email delivery is not configured yet. Please email asnorali.dev@gmail.com directly for now.',
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email,
        subject: 'Portfolio inquiry — ' + subject,
        text: [
          'New portfolio inquiry',
          '',
          'Name: ' + name,
          'Email: ' + email,
          'Subject: ' + subject,
          '',
          message,
        ].join('\n'),
        html: '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#102033">' +
          '<h2>New portfolio inquiry</h2>' +
          '<p><strong>Name:</strong> ' + safeName + '</p>' +
          '<p><strong>Email:</strong> ' + safeEmail + '</p>' +
          '<p><strong>Subject:</strong> ' + safeSubject + '</p>' +
          '<p><strong>Message:</strong><br />' + safeMessage + '</p>' +
          '</div>',
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend returned an error:', response.status, result?.message || result?.name || 'Unknown error');
      return respond(res, 502, { error: 'Your message could not be delivered right now. Please email me directly.' });
    }

    return respond(res, 200, { ok: true, id: result.id || null });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return respond(res, 502, { error: 'Email delivery failed. Please email me directly at asnorali.dev@gmail.com.' });
  }
}