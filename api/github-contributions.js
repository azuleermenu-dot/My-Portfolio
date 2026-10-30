const USERNAME = 'azuleermenu-dot';

function readAttribute(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '=["\\']([^"\\']*)["\\']', 'i'));
  return match?.[1] ?? null;
}

function stripHtml(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseContributionCalendar(html) {
  const contributions = [];
  const cells = html.match(/<td\b[^>]*>[\s\S]*?<\/td>/gi) ?? [];

  for (const cell of cells) {
    const openingTag = cell.match(/<td\b[^>]*>/i)?.[0] ?? '';
    const date = readAttribute(openingTag, 'data-date');
    const levelValue = readAttribute(openingTag, 'data-level');
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;

    const text = stripHtml(cell);
    const countMatch = text.match(/(\d[\d,]*)\s+contributions?/i);
    const count = countMatch ? Number(countMatch[1].replace(/,/g, '')) : 0;
    const level = Number(levelValue);

    contributions.push({
      date,
      count: Number.isFinite(count) ? count : 0,
      level: Number.isInteger(level) ? Math.max(0, Math.min(4, level)) : 0,
    });
  }

  const unique = new Map(contributions.map((item) => [item.date, item]));
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

    const url = new URL(\`https://github.com/users/\${USERNAME}/contributions\`);
    url.searchParams.set('from', from.toISOString().slice(0, 10));
    url.searchParams.set('to', to.toISOString().slice(0, 10));

    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Portfolio-GitHub-Contribution-Calendar',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(\`GitHub returned HTTP \${response.status}\`);
    }

    const html = await response.text();
    const contributions = parseContributionCalendar(html);
    if (!contributions.length) {
      throw new Error('GitHub contribution calendar markup was not found.');
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
