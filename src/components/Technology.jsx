import '../styles/technology.css';

const tech = [
  { name: 'React', category: 'Frontend', mark: 'RE' },
  { name: 'Vite', category: 'Build Tool', mark: 'VI' },
  { name: 'JavaScript', category: 'Language', mark: 'JS' },
  { name: 'Java', category: 'Language', mark: 'JA' },
  { name: 'TypeScript', category: 'Language', mark: 'TS' },
  { name: 'Next.js', category: 'Framework', mark: 'NX' },
  { name: 'HTML / CSS', category: 'Web', mark: 'HC' },
  { name: 'Git / GitHub', category: 'Development', mark: 'GH' },
  { name: 'Vercel', category: 'Deployment', mark: 'VE' },
  { name: 'Luau', category: 'Game Dev', mark: 'LU' },
  { name: 'MongoDB', category: 'Database', mark: 'MO' },
  { name: 'Python', category: 'Language', mark: 'PY' },
  { name: 'PostgreSQL', category: 'Database', mark: 'PG' },
  { name: 'NoSQL', category: 'Database', mark: 'NS' },
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
            A focused collection of technologies I use to design, build,
            deploy, and experiment with digital experiences.
          </p>
        </div>

        <div className="tech-grid reveal">
          {tech.map((item, index) => (
            <article className="tech-card" key={item.name}>
              <div className="tech-card__top">
                <span className="tech-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
