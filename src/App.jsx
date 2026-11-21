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

  // Keep the navigation state aligned with native horizontal scrolling,
  // including viewport changes caused by mobile browser chrome or rotation.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = 0;
    const updateActiveSlide = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const width = track.clientWidth || window.innerWidth || 1;
        const next = Math.max(0, Math.min(slideIds.length - 1, Math.round(track.scrollLeft / width)));
        setActiveSlide(next);
        frame = 0;
      });
    };

    const visualViewport = window.visualViewport;
    track.addEventListener('scroll', updateActiveSlide, { passive: true });
    window.addEventListener('resize', updateActiveSlide, { passive: true });
    visualViewport?.addEventListener('resize', updateActiveSlide, { passive: true });
    updateActiveSlide();

    return () => {
      track.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
      visualViewport?.removeEventListener('resize', updateActiveSlide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll reveals use each panel as its own vertical observer root.
  // Older WebViews without IntersectionObserver use a scroll fallback so
  // content is animated into view rather than remaining permanently hidden.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const sections = Array.from(track.children).filter((child) => child.tagName === 'SECTION');
    const elementsBySection = [];
    const observers = [];
    const cleanups = [];
    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealSelectors = [
      '.section-label', '.story__intro', '.chapter', '.work__intro', '.project',
      '.approach__text > *', '.services__head', '.service-row', '.tech__layout > *',
      '.credentials__hero', '.credentials__featured', '.credentials__modules',
      '.credentials__module', '.credentials__skills', '.credentials__skill',
      '.credentials__summary', '.cv-card', '.contact__head', '.inquiry > *',
      '.hero__content > .eyebrow', '.hero__identity > .display', '.hero__portrait-wrap',
      '.hero__meta > span', '.hero__socials > a', '.hero__bottom > *',
    ];

    const staggerGroups = [
      '.story__chapters', '.projects', '.service-list', '.tech-list',
      '.credentials__module-grid', '.hero__meta', '.hero__socials',
    ];

    sections.forEach((section) => {
      revealSelectors.forEach((selector) => {
        section.querySelectorAll(selector).forEach((element) => element.classList.add('reveal'));
      });

      const elements = Array.from(section.querySelectorAll('.reveal'));
      elementsBySection.push({ section, elements });

      staggerGroups.forEach((selector) => {
        section.querySelectorAll(selector).forEach((group) => {
          Array.from(group.children)
            .filter((child) => child.classList.contains('reveal'))
            .forEach((child, index) => {
              child.style.setProperty('--reveal-delay', (Math.min(index, 6) * 85) + 'ms');
            });
        });
      });
    });

    const setRevealState = (element, visible) => {
      element.classList.toggle('is-visible', visible);
      element.classList.toggle('is-exiting', !visible);
    };

    if (reduceMotion) {
      elementsBySection.forEach(({ elements }) => {
        elements.forEach((element) => setRevealState(element, true));
      });
    } else if (typeof window.IntersectionObserver === 'function') {
      // Observe all reveal targets against the horizontal track itself.
      // Each slide is a nested vertical scroller; using the real track as the
      // common root also accounts for the currently visible horizontal panel.
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.025;
          setRevealState(entry.target, visible);
        });
      }, {
        root: track,
        threshold: [0, 0.025, 0.08],
        rootMargin: '-2% 0px -2% 0px',
      });

      elementsBySection.forEach(({ elements }) => {
        elements.forEach((element) => observer.observe(element));
      });
      observers.push(observer);
    } else {
      // Fallback for older Safari/WebViews: calculate visibility during each
      // panel's own vertical scroll, horizontal navigation, and viewport resize.
      let fallbackFrame = 0;
      const updateFallback = () => {
        if (fallbackFrame) return;
        fallbackFrame = window.requestAnimationFrame(() => {
          fallbackFrame = 0;
          const viewportWidth = track.clientWidth || window.innerWidth || 1;
          const viewportHeight = track.clientHeight || window.innerHeight || 1;

          elementsBySection.forEach(({ section, elements }) => {
            const sectionRect = section.getBoundingClientRect();
            const panelIsVisible = sectionRect.right > 1 && sectionRect.left < viewportWidth - 1;
            const top = sectionRect.top + Math.min(24, viewportHeight * 0.025);
            const bottom = sectionRect.bottom - Math.min(24, viewportHeight * 0.025);

            elements.forEach((element) => {
              const rect = element.getBoundingClientRect();
              const visible = panelIsVisible && rect.bottom > top && rect.top < bottom;
              setRevealState(element, visible);
            });
          });
        });
      };

      const passive = { passive: true };
      sections.forEach((section) => {
        section.addEventListener('scroll', updateFallback, passive);
        cleanups.push(() => section.removeEventListener('scroll', updateFallback));
      });
      track.addEventListener('scroll', updateFallback, passive);
      window.addEventListener('resize', updateFallback, passive);
      window.visualViewport?.addEventListener('resize', updateFallback, passive);
      cleanups.push(() => track.removeEventListener('scroll', updateFallback));
      cleanups.push(() => window.removeEventListener('resize', updateFallback));
      cleanups.push(() => window.visualViewport?.removeEventListener('resize', updateFallback));
      cleanups.push(() => {
        if (fallbackFrame) window.cancelAnimationFrame(fallbackFrame);
      });
      updateFallback();
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const goToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slideIds.length - 1, index));
    const slide = track.children[next];
    if (!slide) return;

    // Measure relative to the scroll track; offsetParent can differ between
    // Safari and Chromium when nested horizontal panels are used.
    const targetLeft = track.scrollLeft
      + slide.getBoundingClientRect().left
      - track.getBoundingClientRect().left;
    const reducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof track.scrollTo === 'function') {
      track.scrollTo({
        left: targetLeft,
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    } else {
      track.scrollLeft = targetLeft;
    }
  }, []);

  // Explicit horizontal swipe fallback for mobile browsers with nested
  // horizontal/vertical scrollers. Native scrolling remains the primary path;
  // this only steps a slide when the browser did not move the track itself.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let gesture = null;
    const interactiveSelector = 'a, button, input, textarea, select, [contenteditable="true"]';

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target?.closest?.(interactiveSelector)) return;

      const width = track.clientWidth || 1;
      gesture = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startLeft: track.scrollLeft,
        startIndex: Math.max(0, Math.min(slideIds.length - 1, Math.round(track.scrollLeft / width))),
      };
    };

    const finishGesture = (event) => {
      if (!gesture || (event.pointerId != null && event.pointerId !== gesture.pointerId)) return;

      const current = gesture;
      gesture = null;

      const deltaX = event.clientX - current.startX;
      const deltaY = event.clientY - current.startY;
      const horizontalSwipe = Math.abs(deltaX) >= 52 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
      const nativeTrackMoved = Math.abs(track.scrollLeft - current.startLeft) > (track.clientWidth || 1) * 0.14;

      if (horizontalSwipe && !nativeTrackMoved) {
        goToSlide(current.startIndex + (deltaX < 0 ? 1 : -1));
      }
    };

    const cancelGesture = () => {
      gesture = null;
    };

    track.addEventListener('pointerdown', onPointerDown, { passive: true });
    track.addEventListener('pointerup', finishGesture, { passive: true });
    track.addEventListener('pointercancel', cancelGesture, { passive: true });
    track.addEventListener('lostpointercapture', cancelGesture, { passive: true });

    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointerup', finishGesture);
      track.removeEventListener('pointercancel', cancelGesture);
      track.removeEventListener('lostpointercapture', cancelGesture);
    };
  }, [goToSlide]);

  const goToSection = useCallback((id) => {
    const index = slideIds.indexOf(id);
    if (index !== -1) goToSlide(index);
  }, [goToSlide]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTyping = target?.isContentEditable
        || /INPUT|TEXTAREA|SELECT/.test(target?.tagName || '');
      if (event.altKey || event.ctrlKey || event.metaKey || isTyping) return;

      if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToSlide(slideIds.length - 1);
      } else if (event.key === 'ArrowRight' || event.key === 'PageDown') {
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
