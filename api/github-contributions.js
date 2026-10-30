const USERNAME = 'azuleermenu-dot';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(503).json({ error: 'GitHub sync is not configured. Add GITHUB_TOKEN to the Vercel project environment.' });
  }

  try {
    const to = new Date();
    const from = new Date(to);
    from.setUTCFullYear(from.getUTCFullYear() - 1);

    const query = `
      query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        query,
        variables: {
          login: USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL returned HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((item) => item.message).join('; '));
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || !Array.isArray(calendar.weeks)) {
      throw new Error('GitHub did not return a contribution calendar for this account.');
    }

    const levelMap = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const contributions = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? 0,
      }))
    );

    if (!contributions.length) {
      throw new Error('GitHub returned an empty contribution calendar.');
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    return res.status(200).json({
      username: USERNAME,
      source: 'github-graphql',
      total: calendar.totalContributions,
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
