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
            <path d="M5.5 27.5 13.1 8.5h3.4l7.6 19h-4.3l-1.4-3.8h-7.2l-1.4 3.8H5.5Zm7.1-7.2h4.4l-2.2-5.9-2.2 5.9Z" fill="currentColor"/>
            <path d="M22 27.5V8.5h3.8v15.3h5.1v3.7H22Z" fill="#EEE9DF"/>
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
