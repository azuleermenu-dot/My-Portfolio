import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#top" onClick={close} aria-label="Asnor Ali home">AA<span>.</span></a>
      <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Main navigation">
        <a href="#story" onClick={close}>Story</a><a href="#work" onClick={close}>Work</a>
        <a href="#credentials" onClick={close}>Credentials</a><a href="#services" onClick={close}>Services</a>
        <a href="#contact" onClick={close}>Contact</a>
      </nav>
      <a className="nav__cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
    </header>
  );
}
