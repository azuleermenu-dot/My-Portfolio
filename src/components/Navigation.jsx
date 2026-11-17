import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['story', 'Story', 1],
  ['work', 'Work', 2],
  ['approach', 'Approach', 3],
  ['services', 'Services', 4],
  ['technology', 'Technology', 5],
  ['credentials', 'Credentials', 6],
  ['contact', 'Contact', 7],
];

export default function Navigation({ onNavigate, activeSlide = 0 }) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const badgeRef = useRef(null);

  const close = () => setOpen(false);
  const navigate = (event, id) => {
    event.preventDefault();
    close();
    onNavigate?.(id);
    if (id === 'top') window.history.replaceState(null, '', window.location.pathname);
    else window.history.replaceState(null, '', '#' + id);
  };

  const tiltBadge = (event) => {
    if (event.pointerType === 'touch') return;
    const badge = badgeRef.current;
    if (!badge) return;
    const bounds = badge.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    badge.style.setProperty('--badge-tilt-x', `${((0.5 - y) * 17).toFixed(2)}deg`);
    badge.style.setProperty('--badge-tilt-y', `${((x - 0.5) * 24).toFixed(2)}deg`);
    badge.style.setProperty('--badge-glare-x', `${(x * 100).toFixed(1)}%`);
    badge.style.setProperty('--badge-glare-y', `${(y * 100).toFixed(1)}%`);
  };

  const resetBadge = () => {
    const badge = badgeRef.current;
    if (!badge) return;
    badge.style.setProperty('--badge-tilt-x', '0deg');
    badge.style.setProperty('--badge-tilt-y', '0deg');
    badge.style.setProperty('--badge-glare-x', '50%');
    badge.style.setProperty('--badge-glare-y', '42%');
  };

  return (
    <header className="nav">
      <a
        className={`nav__brand ${activeSlide === 0 ? 'is-active' : ''}`}
        href="#top"
        onClick={(event) => navigate(event, 'top')}
        aria-label="Asnor Ali home"
        aria-current={activeSlide === 0 ? 'page' : undefined}
      >
        <span className="nav__brand-mark" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 27.5 10.5 8.5h3.2l7.2 19h-4l-1.3-3.8h-6.8l-1.3 3.8h-4Zm6.5-7.1h4.8l-2.4-6.3-2.4 6.3Z" fill="currentColor"/>
            <path d="m15 27.5 7.2-19h3.2l7.1 19h-4l-1.2-3.8h-6.9l-1.3 3.8H15Zm6.4-7.1h4.8l-2.4-6.3-2.4 6.3Z" fill="#EEE9DF"/>
          </svg>
        </span>
        <span className="nav__brand-copy">
          <strong>ASNOR ALI</strong>
          <small>INDEPENDENT DEVELOPER</small>
        </span>
      </a>

      <div className="nav-id-rig">
        <span className="nav-id-anchor" aria-hidden="true" />
        <span className="nav-id-ribbon" aria-hidden="true">
          <span>AA · ASNOR ALI · WEB DEVELOPER</span>
        </span>
        <span className="nav-id-buckle" aria-hidden="true"><i /></span>

        <div className="nav-id-pendulum">
          <button
            ref={badgeRef}
            type="button"
            className={`nav-id-card${flipped ? ' is-flipped' : ''}`}
            onPointerMove={tiltBadge}
            onPointerLeave={resetBadge}
            onBlur={resetBadge}
            onClick={() => setFlipped((value) => !value)}
            aria-label={flipped ? 'Show the front of Asnor Ali’s portfolio badge' : 'Flip Asnor Ali’s hanging portfolio badge'}
            aria-pressed={flipped}
          >
            <span className="nav-id-extrusion" aria-hidden="true" />
            <span className="nav-id-edge nav-id-edge--left" aria-hidden="true" />
            <span className="nav-id-edge nav-id-edge--right" aria-hidden="true" />
            <span className="nav-id-edge nav-id-edge--top" aria-hidden="true" />
            <span className="nav-id-edge nav-id-edge--bottom" aria-hidden="true" />

            <span className="nav-id-body">
              <span className="nav-id-face nav-id-face--front">
                <span className="nav-id-topline">
                  <span className="nav-id-monogram">AA</span>
                  <span><strong>CREATOR PASS</strong><small>PERSONAL PORTFOLIO</small></span>
                  <b>01</b>
                </span>
                <span className="nav-id-photo">
                  <img src="/asnor-ali.webp" alt="Portrait of Asnor Ali" width="600" height="750" fetchPriority="high" decoding="async" />
                  <i />
                </span>
                <strong className="nav-id-name">ASNOR ALI</strong>
                <span className="nav-id-role">FREELANCE WEB DEVELOPER</span>
                <span className="nav-id-divider" />
                <span className="nav-id-footer"><span>INDEPENDENT</span><b>PH · 2026</b></span>
                <span className="nav-id-hologram" aria-hidden="true" />
                <span className="nav-id-reflection" aria-hidden="true" />
              </span>

              <span className="nav-id-face nav-id-face--back">
                <span className="nav-id-back-logo">AA<span> / </span> ASNOR ALI</span>
                <strong className="nav-id-back-title">DESIGN.<br/>DEVELOP.<br/><em>DELIVER.</em></strong>
                <span className="nav-id-back-line" />
                <span className="nav-id-back-url">ASNORALI.VERCEL.APP</span>
                <span className="nav-id-barcode" aria-hidden="true" />
                <small>PERSONAL BRAND DISPLAY · NOT AN OFFICIAL ID</small>
              </span>
            </span>
          </button>
        </div>
        <span className="nav-id-hint">TAP TO FLIP</span>
      </div>

      <button
        className="nav__toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Main navigation">
        {links.map(([id, label, index]) => (
          <a
            key={id}
            className={activeSlide === index ? 'is-active' : ''}
            href={`#${id}`}
            onClick={(event) => navigate(event, id)}
            aria-current={activeSlide === index ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
