import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(document.querySelector('.slide-track')?.scrollLeft > 20);
    const track = document.querySelector('.slide-track');
    track?.addEventListener('scroll', handleScroll, { passive: true });
    return () => track?.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setOpen(false);
  const navigate = (event, id) => {
    event.preventDefault();
    close();
    onNavigate?.(id);
    if (id === 'top') window.history.replaceState(null, '', window.location.pathname);
    else window.history.replaceState(null, '', '#' + id);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#top" onClick={(event) => navigate(event, 'top')} aria-label="Asnor Ali home">AA<span>.</span></a>
      <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Main navigation">
        <a href="#story" onClick={(event) => navigate(event, 'story')}>Story</a>
        <a href="#work" onClick={(event) => navigate(event, 'work')}>Work</a>
        <a href="#credentials" onClick={(event) => navigate(event, 'credentials')}>Credentials</a>
        <a href="#services" onClick={(event) => navigate(event, 'services')}>Services</a>
        <a href="#contact" onClick={(event) => navigate(event, 'contact')}>Contact</a>
      </nav>
      <a className="nav__cta" href="#contact" onClick={(event) => navigate(event, 'contact')}>Let's talk <ArrowUpRight size={15} /></a>
    </header>
  );
}
