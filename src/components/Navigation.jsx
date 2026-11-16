import { useState } from 'react';
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
  const close = () => setOpen(false);
  const navigate = (event, id) => {
    event.preventDefault();
    close();
    onNavigate?.(id);
    if (id === 'top') window.history.replaceState(null, '', window.location.pathname);
    else window.history.replaceState(null, '', '#' + id);
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
