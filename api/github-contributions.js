const USERNAME = 'azuleermenu-dot';

function attribute(source, name) {
  const match = source.match(new RegExp('\\b' + name + '=["\\']([^"\\']*)["\\']', 'i'));
  return match?.[1] ?? null;
}

function plainText(value) {
  return value
    .replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, ' ')
    .replace(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\\s+/g, ' ')
    .trim();
}

function parseContributionCalendar(html) {
  // GitHub has changed the calendar markup over time: data-date/data-level
  // may live on a TD or on a nested day element. Parse by date-bearing tag.
  const markers = [...html.matchAll(/<([a-z][\\w:-]*)\\b[^>]*\\bdata-date=["'](\\d{4}-\\d{2}-\\d{2})["'][^>]*>/gi)];
  const days = [];

  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index];
    const tag = marker[0];
    const date = marker[2];
    const start = marker.index;
    const end = markers[index + 1]?.index ?? Math.min(html.length, start + 5000);
    const fragment = html.slice(start, end);
    const levelRaw = attribute(tag, 'data-level') ?? attribute(fragment, 'data-level') ?? '0';
    const accessibleText = [
      attribute(tag, 'aria-label'),
      attribute(tag, 'title'),
      plainText(fragment),
    ].filter(Boolean).join(' ');
    const countMatch = accessibleText.match(/(\\d[\\d,]*)\\s+contributions?/i);
    const count = countMatch ? Number(countMatch[1].replace(/,/g, '')) : 0;
    const level = Number(levelRaw);

    days.push({
      date,
      count: Number.isFinite(count) ? count : 0,
      level: Number.isInteger(level) ? Math.max(0, Math.min(4, level)) : 0,
    });
  }

  const unique = new Map(days.map((day) => [day.date, day]));
  return [...unique.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const to = new Date();
    const from = new Date(to);
    from.setUTCFullYear(from.getUTCFullYear() - 1);

    const url = new URL(`https://github.com/users/${USERNAME}/contributions`);
    url.searchParams.set('from', from.toISOString().slice(0, 10));
    url.searchParams.set('to', to.toISOString().slice(0, 10));

    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-GitHub-Contribution-Calendar/1.0)',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);

    const html = await response.text();
    const contributions = parseContributionCalendar(html);
    if (contributions.length < 300) {
      throw new Error(`Incomplete GitHub calendar received (${contributions.length} days).`);
    }

    const total = contributions.reduce((sum, day) => sum + day.count, 0);
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    return res.status(200).json({
      username: USERNAME,
      source: 'github-public-calendar',
      total,
      contributions,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub contribution sync failed:', error);
    return res.status(502).json({
      error: 'GitHub contribution data could not be loaded',
      detail: error.message,
    });
  }
}
