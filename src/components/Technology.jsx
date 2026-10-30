import '../styles/technology.css';

const tech = [
  // Frontend
  { name: 'HTML5', category: 'Frontend', mark: 'HT' },
  { name: 'CSS3', category: 'Frontend', mark: 'CS' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', mark: 'JS' },
  { name: 'React', category: 'Frontend', mark: 'RE' },
  { name: 'Next.js', category: 'Frontend', mark: 'NX' },
  { name: 'Tailwind CSS', category: 'Frontend', mark: 'TW' },

  // Backend
  { name: 'Node.js', category: 'Backend', mark: 'NO' },
  { name: 'Express.js', category: 'Backend', mark: 'EX' },
  { name: 'Python', category: 'Backend', mark: 'PY' },
  { name: 'REST APIs', category: 'Backend', mark: 'API' },
  { name: 'SQL', category: 'Backend', mark: 'SQL' },

  // Databases
  { name: 'PostgreSQL', category: 'Database', mark: 'PG' },
  { name: 'MySQL', category: 'Database', mark: 'MY' },
  { name: 'MongoDB', category: 'Database · Basics', mark: 'MO' },

  // Tools & others
  { name: 'Git & GitHub', category: 'Tools & Development', mark: 'GH' },
  { name: 'Docker', category: 'Tools & Others', mark: 'DO' },
  { name: 'VS Code', category: 'Tools & Others', mark: 'VS' },
  { name: 'Postman', category: 'Tools & Others', mark: 'PM' },
  { name: 'Firebase', category: 'Tools & Others · Basics', mark: 'FB' },

  // Existing portfolio stack
  { name: 'Vite', category: 'Build Tool', mark: 'VI' },
  { name: 'TypeScript', category: 'Language', mark: 'TS' },
  { name: 'Java', category: 'Language', mark: 'JA' },
  { name: 'Vercel', category: 'Deployment', mark: 'VE' },
  { name: 'Luau', category: 'Game Development', mark: 'LU' },
];

export default function Technology() {
  return (
    <section className="technology section" id="technology">
      <div className="section-label">
        <span>06</span>
        <span>TECHNOLOGY</span>
        <span>TOOLS / CRAFT</span>
      </div>

      <div className="tech__layout">
        <div className="tech__intro reveal">
          <p className="eyebrow">THE TOOLBOX</p>
          <h2 className="display">
            TOOLS I<br />
            <em>WORK WITH.</em>
          </h2>
          <p className="tech__description">
            My current technical stack spans frontend and backend development,
            databases, APIs, deployment, and the tools I use to build and ship
            modern web applications.
          </p>
        </div>

        <div className="tech-grid reveal">
          {tech.map((item) => (
            <article className="tech-card" key={item.name}>
              <div className="tech-card__top">
                <span className="tech-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className="tech-card__content">
                <span className="tech-badge" aria-hidden="true">
                  {item.mark}
                </span>
                <div>
                  <h3>{item.name}</h3>
                  <span className="tech-card__category">
                    {item.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
