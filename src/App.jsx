import { useCallback, useEffect, useRef, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Work from './components/Work';
import Approach from './components/Approach';
import Services from './components/Services';
import Technology from './components/Technology';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';

const slideIds = ['top', 'story', 'work', 'approach', 'services', 'technology', 'credentials', 'contact'];

export default function App() {
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Keep the navigation state in sync with horizontal touch / mouse scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const updateActiveSlide = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const width = track.clientWidth || window.innerWidth;
        setActiveSlide(Math.max(0, Math.min(slideIds.length - 1, Math.round(track.scrollLeft / width))));
        frame = 0;
      });
    };
    track.addEventListener('scroll', updateActiveSlide, { passive: true });
    window.addEventListener('resize', updateActiveSlide, { passive: true });
    updateActiveSlide();
    return () => {
      track.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll choreography for each independently scrolling horizontal panel.
  // Reveals pull upward into focus, then lift away and fade when they leave view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(track.querySelectorAll(':scope > section'));
    const observers = [];

    sections.forEach((section, sectionIndex) => {
      const revealSelectors = [
        '.section-label',
        '.story__intro',
        '.chapter',
        '.work__intro',
        '.project',
        '.approach__text > *',
        '.services__head',
        '.service-row',
        '.tech__layout > *',
        '.credentials__hero',
        '.credentials__featured',
        '.credentials__modules',
        '.credentials__module',
        '.credentials__skills',
        '.credentials__skill',
        '.credentials__summary',
        '.cv-card',
        '.contact__head',
        '.inquiry > *',
        '.hero__content > .eyebrow',
        '.hero__identity > .display',
        '.hero__portrait-wrap',
        '.hero__meta > span',
        '.hero__socials > a',
        '.hero__bottom > *',
      ];

      revealSelectors.forEach((selector) => {
        section.querySelectorAll(selector).forEach((element) => element.classList.add('reveal'));
      });

      const elements = Array.from(section.querySelectorAll('.reveal'));
      if (reduceMotion) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      const staggerGroups = [
        '.story__chapters',
        '.projects',
        '.service-list',
        '.tech-list',
        '.credentials__module-grid',
        '.hero__meta',
        '.hero__socials',
      ];

      staggerGroups.forEach((selector) => {
        section.querySelectorAll(selector).forEach((group) => {
          Array.from(group.children)
            .filter((child) => child.classList.contains('reveal'))
            .forEach((child, index) => {
              child.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 85}ms`);
            });
        });
      });

      // A short observer margin creates a clear exit moment before an item
      // completely leaves the panel, instead of leaving it permanently visible.
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          const entering = entry.isIntersecting && entry.intersectionRatio >= 0.08;

          if (entering) {
            element.classList.remove('is-exiting');
            element.classList.add('is-visible');
          } else {
            element.classList.remove('is-visible');
            element.classList.add('is-exiting');
          }
        });
      }, {
        root: section,
        threshold: [0, 0.08, 0.18],
        rootMargin: '-8% 0px -10% 0px',
      });

      elements.forEach((element) => observer.observe(element));
      observers.push(observer);

      // Start the opening panel in its composed state. Other hero elements
      // still animate in as they cross the reveal threshold.
      if (sectionIndex === 0) {
        section.querySelectorAll('.hero__content > .eyebrow').forEach((element) => {
          element.classList.add('is-visible');
        });
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const goToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slideIds.length - 1, index));
    const slide = track.children[next];
    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, []);

  const goToSection = useCallback((id) => {
    const index = slideIds.indexOf(id);
    if (index !== -1) goToSlide(index);
  }, [goToSlide]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goToSlide(activeSlide + 1);
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goToSlide(activeSlide - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSlide, goToSlide]);

  return (
    <div className="site-shell">
      <Navigation onNavigate={goToSection} activeSlide={activeSlide} />
      <div className="portfolio-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(activeSlide + 1) / slideIds.length})` }} />
      </div>
      <div className="slide-index" aria-label={`Section ${activeSlide + 1} of ${slideIds.length}`}>
        <strong>{String(activeSlide + 1).padStart(2, '0')}</strong>
        <i />
        <small>{String(slideIds.length).padStart(2, '0')}</small>
      </div>
      <ChatAssistant />
      <main className="slide-track" ref={trackRef} aria-label="Portfolio slides">
        <Hero />
        <Story />
        <Work />
        <Approach />
        <Services />
        <Technology />
        <Credentials />
        <Contact />
      </main>
    </div>
  );
}
