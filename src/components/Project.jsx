import { ArrowUpRight, ExternalLink } from 'lucide-react';

function Visual({ tone, demoUrl, title }) {
  return (
    <div className={`project-visual project-visual--${tone}`} aria-label={`${title} project preview`}>
      {demoUrl ? (
        <div className="project-live-preview">
          <div className="preview-bar">
            <span className="preview-dot" />
            <span className="preview-dot" />
            <span className="preview-dot" />
            <span className="preview-url">LIVE PREVIEW</span>
          </div>
          <iframe
            src={demoUrl}
            title={`${title} live website preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <a className="preview-overlay" href={demoUrl} target="_blank" rel="noreferrer" aria-label={`Open ${title} live preview`}>
            <span>OPEN LIVE PREVIEW</span>
            <ExternalLink size={16} />
          </a>
        </div>
      ) : (
        <div className="visual-placeholder">
          <div className="visual-noise" />
          {tone === 'route' && <><div className="route-map"><i /><i /><i /><i /></div><div className="route-pin">+</div></>}
          {tone === 'game' && <><div className="game-cube" /><div className="game-grid" /><div className="game-particle p1" /><div className="game-particle p2" /></>}
          <span className="placeholder-label">PREVIEW COMING SOON</span>
        </div>
      )}
    </div>
  );
}

export default function Project({ project }) {
  return (
    <article className="project reveal">
      <div className="project__visual-wrap">
        <Visual tone={project.tone} demoUrl={project.demoUrl} title={project.title.replace('\n', ' ')} />
        <span className="project__number">{project.number}</span>
      </div>

      <div className="project__info">
        <div className="project__meta">
          <span>{project.category}</span>
          <span>{project.technologies.join(' / ')}</span>
        </div>

        <h3 className="display display--project">
          {project.title.split('\n').map((line) => <span key={line}>{line}</span>)}
        </h3>

        <div className="project__foot">
          <p>{project.description}</p>
          <div className="project-actions">
            <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
              View project <ArrowUpRight size={17} />
            </a>
            {project.demoUrl && (
              <a className="text-link project-demo-link" href={project.demoUrl} target="_blank" rel="noreferrer">
                Live preview <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
