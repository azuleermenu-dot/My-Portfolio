const USERNAME = 'azuleermenu-dot';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
      headers: {
        'Accept': 'text/html, */*',
        'User-Agent': 'Mozilla/5.0 (compatible; AsnorPortfolio/1.0)',
        'Referer': `https://github.com/${USERNAME}',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const svg = await response.text();
    if (!svg.includes('<svg') || !svg.includes('data-date')) {
      throw new Error('GitHub contribution calendar response was not recognized');
    }

    const contributions = [];
    const rects = svg.match(/<rect\\b[^>]*>/g) || [];

    for (const rect of rects) {
      const date = rect.match(/data-date="([^"]+)"/)?.[1];
      const count = Number(rect.match(/data-count="(\\d+)"/)?.[1] ?? 0);
      const levelName = rect.match(/data-level="([^"]+)"/)?.[1] ?? '';
      if (!date) continue;

      const levelMap = {
        'zero': 0,
        'first-quartile': 1,
        'second-quartile': 2,
        'third-quartile': 3,
        'fourth-quartile': 4,
      };
      const level = levelMap[levelName] ?? (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4);
      contributions.push({ date, count, level });
    }

    if (!contributions.length) {
      throw new Error('No contribution days were found in GitHub response');
    }

    const total = contributions.reduce((sum, day) => sum + day.count, 0);
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ username: USERNAME, total, contributions });
  } catch (error) {
    console.error('GitHub contribution fetch failed:', error);
    return res.status(502).json({ error: 'Unable to retrieve the live GitHub contribution calendar' });
  }
}
