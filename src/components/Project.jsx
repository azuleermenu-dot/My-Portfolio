import { ArrowUpRight } from 'lucide-react';

function Visual({ tone }) {
  return (
    <div
      className={`project-visual project-visual--${tone}`}
      aria-hidden="true"
    >
      <div className="visual-noise" />

      {tone === 'identity' && (
        <>
          <div className="visual-letter">AA</div>
          <div className="visual-orbit" />
        </>
      )}

      {tone === 'coffee' && (
        <>
          <div className="visual-ring" />
          <div className="visual-bean" />
          <div className="visual-word">WICKED</div>
        </>
      )}

      {tone === 'route' && (
        <>
          <div className="route-map">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="route-pin">+</div>
        </>
      )}

      {tone === 'game' && (
        <>
          <div className="game-cube" />
          <div className="game-grid" />
          <div className="game-particle p1" />
          <div className="game-particle p2" />
        </>
      )}
    </div>
  );
}

export default function Project({ project }) {
  return (
    <article className="project reveal">
      <div className="project__visual-wrap">
        <Visual tone={project.tone} />
        <span className="project__number">{project.number}</span>
      </div>

      <div className="project__info">
        <div className="project__meta">
          <span>{project.category}</span>
          <span>{project.technologies.join(' / ')}</span>
        </div>

        <h3 className="display display--project">
          {project.title.split('\n').map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h3>

        <div className="project__foot">
          <p>{project.description}</p>
          <a className="text-link" href={project.href}>
            View project <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}
