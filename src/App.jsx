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

  // Reliable reveal + pull-away transitions for the horizontal slide container.
  // IntersectionObserver toggles a class consumed by the existing CSS, so the
  // effect is visible without relying on animation-library inline styles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(track.querySelectorAll(':scope > section'));
    const observers = [];

    // Each slide is its own vertical scroll container. Observe each slide's
    // reveal elements against that slide (not the outer horizontal track).
    // This is the key fix that makes reveals trigger while scrolling vertically
    // inside a slide on phones, tablets, and desktop.
    sections.forEach((section) => {
      const elements = Array.from(section.querySelectorAll('.reveal'));

      if (reduceMotion) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      // Add a restrained stagger to repeated rows/cards without delaying
      // unrelated elements across the whole page.
      const groups = [
        '.story__chapters',
        '.projects',
        '.service-list',
        '.care-plans',
        '.care-terms',
        '.credentials__module-grid',
      ];

      groups.forEach((selector) => {
        section.querySelectorAll(selector).forEach((group) => {
          Array.from(group.children)
            .filter((child) => child.classList.contains('reveal'))
            .forEach((child, index) => {
              child.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 65}ms`);
            });
        });
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, {
        root: section,
        threshold: 0.08,
        rootMargin: '0px 0px -3% 0px',
      });

      elements.forEach((element) => observer.observe(element));
      observers.push(observer);
    });

    // Hero has a dedicated entrance treatment in the existing stylesheet.
    track.querySelectorAll('.hero__content').forEach((element) => {
      element.classList.add('is-visible');
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
