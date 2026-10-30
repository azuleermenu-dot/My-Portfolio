import { useCallback, useEffect, useRef, useState } from 'react';
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

const slideNames = ['Home', 'Story', 'Work', 'Approach', 'Services', 'Technology', 'Credentials', 'Contact'];

export default function App() {
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slideNames.length - 1, index));
    track.scrollTo({ left: next * track.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, []);

  const goToSection = useCallback((id) => {
    const track = trackRef.current;
    const target = document.getElementById(id);
    if (!track || !target) return;
    const slide = target.closest('section, footer');
    const index = Array.from(track.children).indexOf(slide);
    if (index >= 0) goToSlide(index);
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
      <Navigation onNavigate={goToSection} />
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
      <div className="slide-controls" aria-label="Slide navigation">
        <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous slide"><ArrowLeft size={16} /></button>
        <span><strong>{String(activeSlide + 1).padStart(2, '0')}</strong><i />{String(slideNames.length).padStart(2, '0')} <small>{slideNames[activeSlide]}</small></span>
        <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === slideNames.length - 1} aria-label="Next slide"><ArrowRight size={16} /></button>
      </div>
    </div>
  );
}
