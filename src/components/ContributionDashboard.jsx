import { useEffect, useMemo, useState } from 'react';
import { Github, ExternalLink, GitCommitHorizontal } from 'lucide-react';

const username = 'azuleermenu-dot';
const profileUrl = `https://github.com/${username}`;
const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
const colors = ['#17191d', '#493a28', '#80613c', '#b58a52', '#d2a86b'];

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function ContributionDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load contribution data');
        return response.json();
      })
      .then((result) => {
        if (!Array.isArray(result.contributions)) throw new Error('Invalid contribution data');
        setData(result);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, []);

  const calendar = useMemo(() => {
    if (!data?.contributions?.length) return null;
    const entries = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
    const byDate = new Map(entries.map((item) => [item.date, item]));
    const first = new Date(`${entries[0].date}T00:00:00Z`);
    const last = new Date(`${entries[entries.length - 1].date}T00:00:00Z`);
    const start = new Date(first);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());
    const end = new Date(last);
    end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
    const cells = [];
    const monthLabels = [];
    let previousMonth = -1;

    for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const key = dateKey(cursor);
      const column = Math.floor((cursor - start) / (7 * 86400000));
      if (cursor.getUTCMonth() !== previousMonth && cursor >= first) {
        monthLabels.push({
          label: cursor.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
          column,
        });
        previousMonth = cursor.getUTCMonth();
      }
      const item = byDate.get(key);
      cells.push({
        key,
        column,
        row: cursor.getUTCDay(),
        count: item?.count ?? 0,
        level: item?.level ?? 0,
        outside: cursor < first || cursor > last,
      });
    }
    return { cells, monthLabels, columns: Math.ceil((end - start + 1) / (7 * 86400000)) };
  }, [data]);

  const total = data?.total?.lastYear ?? (data?.contributions || []).reduce((sum, day) => sum + day.count, 0);

  return (
    <section className="contribution reveal" aria-labelledby="contribution-title">
      <div className="contribution__top">
        <div>
          <p className="eyebrow">OPEN SOURCE / GITHUB</p>
          <h3 id="contribution-title">CONTRIBUTION <em>ACTIVITY.</em></h3>
          <p className="contribution__description">
            A live view of my GitHub contribution history, updated from my public profile.
          </p>
        </div>
        <a className="contribution__profile" href={profileUrl} target="_blank" rel="noreferrer">
          <Github size={17} /> View GitHub <ExternalLink size={14} />
        </a>
      </div>

      <div className="contribution__chart">
        <div className="contribution__chart-head">
          <span><GitCommitHorizontal size={15} /> CONTRIBUTIONS OVER THE LAST YEAR</span>
          <span className="contribution__total">
            {data ? `${total.toLocaleString()} contributions` : error ? 'LIVE DATA UNAVAILABLE' : 'LOADING ACTIVITY…'}
          </span>
          <span className="contribution__legend">LESS <i /><i /><i /><i /> MORE</span>
        </div>

        {calendar ? (
          <div className="contribution__calendar" role="img" aria-label={`${total} GitHub contributions over the last year`}>
            <div className="contribution__months" style={{ gridTemplateColumns: `repeat(${calendar.columns}, minmax(0, 1fr))` }}>
              {calendar.monthLabels.map((month) => (
                <span key={`${month.label}-${month.column}`} style={{ gridColumn: month.column + 1 }}>{month.label}</span>
              ))}
            </div>
            <div className="contribution__grid" style={{ gridTemplateColumns: `repeat(${calendar.columns}, minmax(0, 1fr))` }}>
              {calendar.cells.map((cell) => (
                <span
                  key={cell.key}
                  className={cell.outside ? 'contribution__cell contribution__cell--empty' : 'contribution__cell'}
                  style={{ gridColumn: cell.column + 1, gridRow: cell.row + 1, backgroundColor: cell.outside ? 'transparent' : colors[Math.min(4, cell.level)] }}
                  title={cell.outside ? '' : `${cell.count} contributions on ${cell.key}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="contribution__loading">{error ? 'Could not load the live contribution graph. Open GitHub to view the latest activity.' : 'Loading your GitHub contribution history…'}</div>
        )}
        <p className="contribution__note">Daily counts are based on the public contribution activity shown by GitHub. Select the graph to open the full profile.</p>
      </div>
    </section>
  );
}
