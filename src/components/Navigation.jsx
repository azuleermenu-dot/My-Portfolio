import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#top" onClick={close}>
        AA<span>.</span>
      </a>

      <button
        className="nav__toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        <a href="#story" onClick={close}>Story</a>
        <a href="#work" onClick={close}>Work</a>
        <a href="#credentials" onClick={close}>Credentials</a>
        <a href="#services" onClick={close}>Services</a>
        <a href="#contact" onClick={close}>Contact</a>
      </nav>

      <a className="nav__cta" href="#contact">
        Start a project <ArrowUpRight size={15} />
      </a>
    </header>
  );
}
