import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, inView, stagger } from 'motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

const slideNames = ['Home', 'Story', 'Work', 'Approach', 'Services', 'Technology', 'Credentials', 'Contact'];
const slideIds = ['top', 'story', 'work', 'approach', 'services', 'technology', 'credentials', 'contact'];

export default function App() {
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideAnimationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const width = track.clientWidth || window.innerWidth;
        setActiveSlide(Math.max(0, Math.min(slideNames.length - 1, Math.round(track.scrollLeft / width))));
        frame = 0;
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? 0.01 : 0.72;
    const easing = [0.22, 1, 0.36, 1];

    const stopHero = inView('.hero__content', (element) => {
      animate(Array.from(element.children), { opacity: [0, 1], y: [18, 0] }, {
        duration, delay: reduceMotion ? 0 : stagger(0.1), ease: easing,
      });
    }, { root: track, amount: 0.15 });

    const stopReveals = inView('.reveal', (element) => {
      const controls = animate(element, { opacity: 1, y: 0 }, {
        duration: reduceMotion ? 0.01 : 0.75, ease: easing,
      });
      return () => controls.stop();
    }, { root: track, amount: 0.08 });

    return () => { stopHero(); stopReveals(); };
  }, []);

  const goToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slideNames.length - 1, index));
    slideAnimationRef.current?.stop();
    const target = next * track.clientWidth;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.scrollSnapType = '';
      track.scrollLeft = target;
      return;
    }

    // Temporarily release snap points so Motion can control the full glide.
    track.style.scrollSnapType = 'none';
    const controls = animate(track, { scrollLeft: target }, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    slideAnimationRef.current = controls;
    controls.finished.then(() => {
      if (slideAnimationRef.current === controls) {
        track.style.scrollSnapType = '';
        slideAnimationRef.current = null;
      }
    }).catch(() => {});
  }, []);

  const goToSection = useCallback((id) => {
    const index = slideIds.indexOf(id);
    if (index !== -1) goToSlide(index);
  }, [goToSlide]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goToSlide(activeSlide + 1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goToSlide(activeSlide - 1); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSlide, goToSlide]);

  return (
    <div className="site-shell">
      <Navigation onNavigate={goToSection} activeSlide={activeSlide} />
      <ChatAssistant />
      <main className="slide-track" ref={trackRef} aria-label="Portfolio slides">
        <Hero /><Story /><Work /><Approach /><Services /><Technology /><Credentials /><Contact />
      </main>
      <div className="slide-controls" aria-label="Slide navigation">
        <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous slide"><ArrowLeft size={16} /></button>
        <span><strong>{String(activeSlide + 1).padStart(2, '0')}</strong><i />{String(slideNames.length).padStart(2, '0')} <small>{slideNames[activeSlide]}</small></span>
        <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === slideNames.length - 1} aria-label="Next slide"><ArrowRight size={16} /></button>
      </div>
    </div>
  );
}
