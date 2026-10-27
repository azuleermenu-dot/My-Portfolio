import '../styles/credentials.css';

const completed = [
  {
    title: 'BreakpointLabs — Fullstack Developer Program',
    meta: 'Sep 2026 · 74 of 74 activities',
    description:
      'HTML, CSS, JavaScript, React, Node.js, Express, SQL, Git & GitHub, deployment, and more.',
  },
  {
    title: 'GitHub Foundations — Learning Path',
    meta: 'Aug 2026',
    description:
      'Version control, collaboration, pull requests, repositories, and GitHub workflow.',
  },
  {
    title: 'Responsive Web Design (freeCodeCamp)',
    meta: 'Jul 2026',
    description:
      'Build responsive and accessible websites using modern HTML and CSS.',
  },
];

const planned = [
  {
    title: 'Google IT Automation with Python Certificate',
    description:
      'Learn Python, Git, GitHub, troubleshooting, debugging, testing, configuration management, and cloud.',
  },
  {
    title: 'Google Cloud Computing Foundations',
    description:
      'Understand cloud concepts, infrastructure, networking, security, and Google Cloud services.',
  },
  {
    title: 'Google Cloud Engineering',
    description:
      'Learn to design, build, and manage scalable cloud solutions using Google Cloud.',
  },
  {
    title: 'Google Cloud Data Analytics',
    description:
      'Work with data, SQL, BigQuery, and data visualization to make data-driven decisions.',
  },
  {
    title: 'Google Cloud Cybersecurity',
    description:
      'Learn to identify, prevent, and respond to security threats in the cloud.',
  },
  {
    title: 'Google Cloud Skill Badges & Certifications',
    description:
      'Earn skill badges in areas like cloud, data, security, and developer tools.',
  },
];

export default function Credentials() {
  return (
    <section className="credentials section" id="credentials">
      <div className="section-label">
        <span>07</span>
        <span>TRAINING / CREDENTIALS</span>
        <span>LEARNING PATH</span>
      </div>

      <div className="credentials__hero reveal">
        <p className="eyebrow">LEARN · BUILD · GROW</p>
        <h2 className="display">
          PROOF OF<br />
          <em>THE WORK.</em>
        </h2>
        <p className="credentials__intro">
          A record of completed training and the professional learning paths I am
          working toward as I grow into a fullstack developer.
        </p>
      </div>

      <div className="credentials__grid">
        <div className="credentials__column reveal">
          <div className="credentials__heading">
            <span className="credentials__status credentials__status--done">●</span>
            <span>COMPLETED TRAINING</span>
          </div>

          {completed.map((item, index) => (
            <article className="credential-card" key={item.title}>
              <div className="credential-card__top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item.meta}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="credentials__column reveal">
          <div className="credentials__heading">
            <span className="credentials__status">○</span>
            <span>PLANNED / IN PROGRESS</span>
          </div>

          {planned.map((item, index) => (
            <article className="credential-card credential-card--planned" key={item.title}>
              <div className="credential-card__top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>PLANNED / IN PROGRESS</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="credentials__note reveal">
        <span>01</span>
        <p>
          Certifications and learning paths are listed according to their actual
          completion status. Planned credentials are intentionally kept separate
          from completed achievements.
        </p>
      </div>
    </section>
  );
}
