import '../styles/technology.css';

const tech = [
  // Frontend
  { name: 'HTML5', category: 'Frontend', mark: 'HT', logo: 'html5/html5-original.svg' },
  { name: 'CSS3', category: 'Frontend', mark: 'CS', logo: 'css3/css3-original.svg' },
  { name: 'JavaScript', category: 'Frontend', mark: 'JS', logo: 'javascript/javascript-original.svg' },
  { name: 'React', category: 'Frontend', mark: 'RE', logo: 'react/react-original.svg' },
  { name: 'Next.js', category: 'Frontend', mark: 'NX', logo: 'nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', mark: 'TW', logo: 'tailwindcss/tailwindcss-original.svg' },

  // Backend
  { name: 'Node.js', category: 'Backend', mark: 'NO', logo: 'nodejs/nodejs-original.svg' },
  { name: 'Express.js', category: 'Backend', mark: 'EX', logo: 'express/express-original.svg' },
  { name: 'Python', category: 'Backend', mark: 'PY', logo: 'python/python-original.svg' },
  { name: 'REST APIs', category: 'Backend', mark: 'API' },
  { name: 'SQL', category: 'Backend', mark: 'SQL' },

  // Databases
  { name: 'PostgreSQL', category: 'Database', mark: 'PG', logo: 'postgresql/postgresql-original.svg' },
  { name: 'MySQL', category: 'Database', mark: 'MY', logo: 'mysql/mysql-original.svg' },
  { name: 'MongoDB', category: 'Database · Basics', mark: 'MO', logo: 'mongodb/mongodb-original.svg' },

  // Tools & others
  { name: 'Git & GitHub', category: 'Tools & Development', mark: 'GH', logo: 'github/github-original.svg' },
  { name: 'Docker', category: 'Tools & Others', mark: 'DO', logo: 'docker/docker-original.svg' },
  { name: 'VS Code', category: 'Tools & Others', mark: 'VS', logo: 'vscode/vscode-original.svg' },
  { name: 'Postman', category: 'Tools & Others', mark: 'PM', logo: 'postman/postman-original.svg' },
  { name: 'Firebase', category: 'Tools & Others · Basics', mark: 'FB', logo: 'firebase/firebase-plain.svg' },

  // Existing portfolio stack
  { name: 'Vite', category: 'Build Tool', mark: 'VI', logo: 'vitejs/vitejs-original.svg' },
  { name: 'TypeScript', category: 'Language', mark: 'TS', logo: 'typescript/typescript-original.svg' },
  { name: 'Java', category: 'Language', mark: 'JA', logo: 'java/java-original.svg' },
  { name: 'Vercel', category: 'Deployment', mark: 'VE', logo: 'vercel/vercel-original.svg' },
  { name: 'Luau', category: 'Game Development', mark: 'LU', logo: 'lua/lua-original.svg' },
];

export default function Technology() {
  return (
    <section className="technology section" id="technology">
      <div className="section-label">
        
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
                <div className="tech-card__logo" title={item.name}>
                  {item.logo ? (
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.logo}`}
                      alt={item.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                        event.currentTarget.nextElementSibling.hidden = false;
                      }}
                    />
                  ) : null}
                  <span className="tech-badge-fallback" hidden aria-hidden="true">
                    {item.mark}
                  </span>
                  {!item.logo && <span className="tech-badge-fallback" aria-hidden="true">{item.mark}</span>}
                </div>
                <span className="tech-card__category">{item.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
