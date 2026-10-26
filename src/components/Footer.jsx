import { Facebook, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>
          ASNOR ALI<span>.</span>
        </strong>
        <small>WEB DEVELOPER / 2026</small>
      </div>

      <nav className="footer__socials" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/asnor-ali-006b50446"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://www.facebook.com/share/1GT5huzMcA/"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <Facebook size={18} />
          <span>Facebook</span>
        </a>
        <a
          href="https://github.com/azuleermenu-dot"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github size={18} />
          <span>GitHub</span>
        </a>
      </nav>

      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}
