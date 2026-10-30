const USERNAME = 'azuleermenu-dot';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(\`https://github.com/users/\${USERNAME}/contributions\`, {
      headers: {
        Accept: 'text/html, */*',
        'User-Agent': 'Mozilla/5.0 (compatible; AsnorPortfolio/1.0)',
        Referer: \`https://github.com/\${USERNAME}\`,
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(\`GitHub returned HTTP \${response.status}\`);

    const html = await response.text();
    const rects = html.match(/<rect\b[^>]*>/gi) ?? [];
    const contributions = [];

    for (const rect of rects) {
      const date = rect.match(/\bdata-date=["']([^"']+)["']/i)?.[1];
      if (!date) continue;

      const countValue = rect.match(/\bdata-count=["'](\d+)["']/i)?.[1];
      const levelValue = rect.match(/\bdata-level=["'](\d+)["']/i)?.[1];
      const count = Number(countValue ?? 0);
      const level = levelValue == null
        ? (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4)
        : Math.max(0, Math.min(4, Number(levelValue)));

      contributions.push({ date, count, level });
    }

    const uniqueDays = [...new Map(contributions.map((day) => [day.date, day])).values()];
    if (uniqueDays.length < 300) {
      throw new Error(\`GitHub returned only \${uniqueDays.length} calendar days; expected roughly 365\`);
    }

    uniqueDays.sort((a, b) => a.date.localeCompare(b.date));
    const total = uniqueDays.reduce((sum, day) => sum + day.count, 0);

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    return res.status(200).json({
      username: USERNAME,
      source: 'github.com',
      total,
      contributions: uniqueDays,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub contribution sync failed:', error);
    return res.status(502).json({
      error: 'GitHub contribution data could not be parsed',
      detail: error.message,
    });
  }
}
