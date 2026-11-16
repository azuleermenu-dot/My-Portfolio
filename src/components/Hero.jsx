import { useRef, useState } from 'react';
import { ArrowDownRight, Facebook, Github, Linkedin } from 'lucide-react';

export default function Hero() {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const tiltCard = (event) => {
    if (event.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty('--tilt-x', `${((0.5 - y) * 18).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${((x - 0.5) * 22).toFixed(2)}deg`);
    card.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
  };

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '45%');
  };

  return (
    <section id="top" className="hero">
      <div className="hero__grid" />
      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />
      <div className="hero__grain" />

      <div className="hero__meta">
        <span>FREELANCE WEB DEVELOPER</span>
        <span>INDEPENDENT / SELF-EMPLOYED</span>
        <span>PH / 2026</span>
      </div>

      <div className="hero__content">
        <p className="eyebrow">INDEPENDENT CREATIVE PRACTICE / 001</p>
        <div className="hero__identity">
          <h1 className="display display--hero">ASNOR<br /><em>ALI.</em></h1>

          <div className="hero__portrait-wrap">
            <div className="id-lanyard" aria-hidden="true">
              <span className="id-lanyard__strap">ASNOR · PERSONAL PORTFOLIO</span>
              <span className="id-lanyard__clip" />
            </div>

            <div className="id-card-scene">
              <button
                ref={cardRef}
                type="button"
                className={`id-card${flipped ? ' is-flipped' : ''}`}
                onPointerMove={tiltCard}
                onPointerLeave={resetCard}
                onBlur={resetCard}
                onClick={() => setFlipped((value) => !value)}
                aria-label={flipped ? 'Flip the portfolio ID card to the front' : 'Flip the portfolio ID card to the back'}
                aria-pressed={flipped}
              >
                <span className="id-card__face id-card__front">
                  <span className="id-card__header">
                    <span className="id-card__seal">AA</span>
                    <span className="id-card__header-copy">
                      <strong>CREATOR PROFILE</strong>
                      <small>PERSONAL PORTFOLIO / 001</small>
                    </span>
                    <span className="id-card__micro-mark">PH</span>
                  </span>

                  <span className="id-card__photo">
                    <img src="/asnor-ali.webp" alt="Portrait of Asnor Ali" width="600" height="750" fetchPriority="high" decoding="async" />
                  </span>

                  <span className="id-card__name">ASNOR ALI</span>
                  <span className="id-card__role">FREELANCE WEB DEVELOPER</span>
                  <span className="id-card__rule" />

                  <span className="id-card__footer">
                    <span>INDEPENDENT / SELF-EMPLOYED</span>
                    <strong>2026</strong>
                  </span>
                  <span className="id-card__glare" aria-hidden="true" />
                </span>

                <span className="id-card__face id-card__back">
                  <span className="id-card__back-top">
                    <span className="id-card__seal">AA</span>
                    <span>ASNOR ALI / DIGITAL CREATIVE</span>
                  </span>
                  <span className="id-card__back-index">PORTFOLIO ID <strong>01</strong></span>
                  <strong className="id-card__back-statement">DESIGN.<br />DEVELOP.<br /><em>DELIVER.</em></strong>
                  <span className="id-card__back-rule" />
                  <span className="id-card__back-site">ASNORALI.VERCEL.APP</span>
                  <span className="id-card__barcode" aria-hidden="true" />
                  <small className="id-card__disclaimer">PERSONAL BRAND DISPLAY · NOT AN OFFICIAL ID</small>
                  <span className="id-card__glare" aria-hidden="true" />
                </span>
              </button>
            </div>

            <span className="id-card-hint">TAP TO FLIP · MOVE TO INTERACT</span>
          </div>
        </div>

        <nav className="hero__socials" aria-label="Social links">
          <a href="https://www.linkedin.com/in/asnor-ali-006b50446" target="_blank" rel="noreferrer"><Linkedin size={17} /><span>LinkedIn</span></a>
          <a href="https://www.facebook.com/share/1GT5huzMcA/" target="_blank" rel="noreferrer"><Facebook size={17} /><span>Facebook</span></a>
          <a href="https://github.com/azuleermenu-dot" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span></a>
        </nav>

        <div className="hero__bottom">
          <p className="hero__statement">I work independently with clients to create thoughtful websites and digital experiences for their ideas and businesses.</p>
          <a className="circle-link" href="#story" onClick={(event) => { event.preventDefault(); document.querySelector('.nav__links a[href="#story"]')?.click(); }} aria-label="Explore my story"><ArrowDownRight size={23} /></a>
        </div>
      </div>
      <div className="hero__edge">SWIPE OR USE ARROWS TO EXPLORE ↓</div>
    </section>
  );
}