import { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, RefreshCw } from 'lucide-react';

function LivePreview({ demoUrl, title }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    const timeout = window.setTimeout(() => {
      setStatus((current) => current === 'loading' ? 'slow' : current);
    }, 12000);

    return () => window.clearTimeout(timeout);
  }, [reloadKey, demoUrl]);

  return (
    <div
      className="project-visual project-visual--live"
      aria-label={`${title} live preview`}
      style={{ overflow: 'hidden', background: '#11110f' }}
    >
      <iframe
        key={reloadKey}
        src={demoUrl}
        title={`${title} live website preview`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        allow="fullscreen"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          background: '#11110f',
        }}
      />

      <div
        style={{
          position: 'absolute',
          zIndex: 4,
          top: 14,
          left: 14,
          right: 14,
          minHeight: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 10px',
          background: 'rgba(11,11,10,.9)',
          border: '1px solid rgba(238,233,223,.18)',
          backdropFilter: 'blur(10px)',
          color: '#c8c2b7',
          font: '9px DM Mono, monospace',
          letterSpacing: '.08em',
        }}
      >
        <span aria-hidden="true">● ● ●</span>
        <span>LIVE PREVIEW</span>
        <span style={{ flex: 1 }} />
        <button
          type="button"
          onClick={() => setReloadKey((value) => value + 1)}
          aria-label={`Refresh ${title} preview`}
          title="Refresh preview"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 0,
            padding: 5,
            color: 'inherit',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={13} />
        </button>
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} live website in a new tab`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            color: 'inherit',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          OPEN <ExternalLink size={12} />
        </a>
      </div>

      {status !== 'loaded' && (
        <div
          role={status === 'error' ? 'alert' : 'status'}
          style={{
            position: 'absolute',
            zIndex: 3,
            inset: '58px 14px 14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 24,
            textAlign: 'center',
            color: '#c8c2b7',
            background: 'rgba(17,17,15,.88)',
            font: '11px DM Mono, monospace',
            lineHeight: 1.7,
            pointerEvents: status === 'slow' || status === 'error' ? 'auto' : 'none',
          }}
        >
          <span>
            {status === 'loading'
              ? 'LOADING LIVE PREVIEW…'
              : status === 'error'
                ? 'THE EMBEDDED PREVIEW COULD NOT LOAD.'
                : 'THE PREVIEW IS TAKING LONGER THAN EXPECTED.'}
          </span>
          {status !== 'loading' && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#eee9df', textUnderlineOffset: 4 }}
            >
              OPEN THE LIVE WEBSITE
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Visual({ tone, demoUrl, title }) {
  if (demoUrl) {
    return <LivePreview demoUrl={demoUrl} title={title} />;
  }

  return (
    <div className={`project-visual project-visual--${tone}`} aria-label={`${title} project artwork`}>
      <div className="visual-noise" />
      {tone === 'identity' && <><span className="visual-letter">M</span><div className="visual-orbit" /></>}
      {tone === 'coffee' && <><div className="visual-ring" /><div className="visual-bean" /><div className="visual-word">WICKED COFFEE · CONCEPT</div></>}
      {tone === 'route' && <><div className="route-map"><i /><i /><i /><i /></div><div className="route-pin">+</div></>}
      {tone === 'game' && <><div className="game-cube" /><div className="game-grid" /><div className="game-particle p1" /><div className="game-particle p2" /></>}
    </div>
  );
}

export default function Project({ project }) {
  return (
    <article className="project reveal">
      <div className="project__visual-wrap">
        <Visual tone={project.tone} demoUrl={project.demoUrl} title={project.title} />
      </div>

      <div className="project__info">
        <div className="project__meta">
          <span>{project.category}</span>
          <span>{project.technologies.join(' / ')}</span>
        </div>

        <h3 className="display display--project">{project.title}</h3>

        <div className="project__foot">
          <p>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
            {project.href ? (
              <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                View project <ArrowUpRight size={17} />
              </a>
            ) : (
              <span className="text-link" aria-label="Source repository not currently available">
                Source not linked
              </span>
            )}
            {project.demoUrl && (
              <a className="text-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Live preview <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
