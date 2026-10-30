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
      <a className={`nav__brand ${activeSlide === 0 ? 'is-active' : ''}`} href="#top" onClick={(event) => navigate(event, 'top')} aria-label="Asnor Ali home" aria-current={activeSlide === 0 ? 'page' : undefined}>AA<span>.</span></a>
      <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Main navigation">
        {links.map(([id, label, index]) => <a key={id} className={activeSlide === index ? 'is-active' : ''} href={`#${id}`} onClick={(event) => navigate(event, id)} aria-current={activeSlide === index ? 'page' : undefined}>{label}</a>)}
      </nav>
    </header>
  );
}
