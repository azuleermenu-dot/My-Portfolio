const tech = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Build Tool' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'HTML / CSS', category: 'Web' },
  { name: 'Git / GitHub', category: 'Development' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'Luau', category: 'Game Dev' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Python', category: 'Language' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'NoSQL', category: 'Database' },
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
            Technologies I use to design, build, deploy, and experiment with
            digital experiences.
          </p>
        </div>

        <div className="tech-grid reveal">
          {tech.map((item, index) => (
            <article className="tech-card" key={item.name}>
              <div className="tech-card__top">
                <span className="tech-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="tech-card__arrow">↗</span>
              </div>
              <div className="tech-card__content">
                <span className="tech-badge">{item.category}</span>
                <h3>{item.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
