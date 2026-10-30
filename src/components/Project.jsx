import { ArrowUpRight, ExternalLink } from 'lucide-react';

function Visual({ tone, demoUrl, title }) {
  if (demoUrl) {
    return (
      <div
        className={`project-visual project-visual--${tone}`}
        aria-label={`${title} live preview`}
        style={{ overflow: 'hidden', background: '#11110f' }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 3,
            top: 14,
            left: 14,
            right: 14,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 10px',
            background: 'rgba(11,11,10,.88)',
            border: '1px solid rgba(238,233,223,.15)',
            backdropFilter: 'blur(8px)',
            font: '9px DM Mono, monospace',
            letterSpacing: '.08em',
            color: '#96938c',
          }}
        >
          <span>●</span><span>●</span><span>●</span><span style={{ marginLeft: 8 }}>LIVE PREVIEW</span>
        </div>
        <iframe
          src={demoUrl}
          title={`${title} live website preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            background: '#11110f',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual--${tone}`} aria-label={`${title} project preview`}>
      <div className="visual-noise" />
      {tone === 'route' && <><div className="route-map"><i /><i /><i /><i /></div><div className="route-pin">+</div></>}
      {tone === 'game' && <><div className="game-cube" /><div className="game-grid" /><div className="game-particle p1" /><div className="game-particle p2" /></>}
    </div>
  );
}

export default function Project({ project }) {
  return (
    <article className="project reveal">
      <div className="project__visual-wrap">
        <Visual tone={project.tone} demoUrl={project.demoUrl} title={project.title.replace('\n', ' ')} />
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
            <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
              View project <ArrowUpRight size={17} />
            </a>
            {project.demoUrl && (
              <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">
                Live preview <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
