import { Github, ExternalLink, GitCommitHorizontal } from 'lucide-react';

const profileUrl = 'https://github.com/azuleermenu-dot';
// Explicit dark theme keeps zero-activity days transparent/dim instead of white.
const chartUrl = 'https://ghchart.xqsit94.in/dark:d2a86b/azuleermenu-dot';

export default function ContributionDashboard() {
  return (
    <section className="contribution reveal" aria-labelledby="contribution-title">
      <div className="contribution__top">
        <div>
          <p className="eyebrow">OPEN SOURCE / GITHUB</p>
          <h3 id="contribution-title">CONTRIBUTION <em>ACTIVITY.</em></h3>
          <p className="contribution__description">
            A live view of my GitHub contribution history. The activity graph is
            supplied by GitHub chart data and updates as my public activity changes.
          </p>
        </div>
        <a className="contribution__profile" href={profileUrl} target="_blank" rel="noreferrer">
          <Github size={17} /> View GitHub <ExternalLink size={14} />
        </a>
      </div>

      <div className="contribution__chart">
        <div className="contribution__chart-head">
          <span><GitCommitHorizontal size={15} /> CONTRIBUTIONS OVER THE LAST YEAR</span>
          <span className="contribution__legend">LESS <i /><i /><i /><i /> MORE</span>
        </div>
        <a href={profileUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub profile and contribution history">
          <img
            src={chartUrl}
            alt="GitHub contribution activity chart for azuleermenu-dot"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </a>
        <p className="contribution__note">For the exact contribution count and activity details, open the GitHub profile.</p>
      </div>
    </section>
  );
}
