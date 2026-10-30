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
        <div className="hero__identity">
          <h1 className="display display--hero">ASNOR<br /><em>ALI.</em></h1>
          <div className="hero__portrait-wrap">
            <div className="hero__portrait-frame">
              <img className="hero__portrait" src="/asnor-ali.webp" alt="Portrait of Asnor Ali" width="600" height="750" fetchPriority="high" decoding="async" />
              <span className="hero__portrait-index">PORTRAIT / 2026</span>
            </div>
            <img className="asta-companion" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38JmUnMaaRRtQLkv4cn1Bj0fDuh/7ada038d-e946-45ca-81bd-c7a6ef78a486.gif" alt="Asta from Black Clover in a looping anime action animation" width="540" height="304" loading="eager" decoding="async" />
            <span className="asta-caption" aria-hidden="true">NEVER GIVE UP.</span>
          </div>
        </div>
        <div className="hero__bottom">
          <p className="hero__statement">I build digital experiences where design, technology and ideas meet.</p>
          <a className="circle-link" href="#story" onClick={(event) => { event.preventDefault(); document.querySelector('.nav__links a[href="#story"]')?.click(); }} aria-label="Explore my story"><ArrowDownRight size={23} /></a>
        </div>
      </div>
      <div className="hero__edge">SWIPE OR USE ARROWS TO EXPLORE ↓</div>
    </section>
  );
}
