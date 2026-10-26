import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" />
      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />
      <div className="hero__grain" />

      <div className="hero__meta">
        <span>WEB DEVELOPER</span>
        <span>CREATIVE BUILDER</span>
        <span>PH / 2026</span>
      </div>

      <div className="hero__content">
        <p className="eyebrow">PERSONAL DIGITAL SPACE / 001</p>
        <h1 className="display display--hero">
          ASNOR
          <br />
          <em>ALI.</em>
        </h1>

        <div className="hero__bottom">
          <p className="hero__statement">
            I build digital experiences where design, technology and ideas meet.
          </p>

          <a
            className="circle-link"
            href="#story"
            aria-label="Explore my story"
          >
            <ArrowDownRight size={23} />
          </a>
        </div>
      </div>

      <div className="hero__edge">SCROLL TO EXPLORE ↓</div>
    </section>
  );
}
