import { useEffect, useRef, useState } from 'react';
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
import Footer from './components/Footer';

const slideNames = ['Home', 'Story', 'Work', 'Approach', 'Services', 'Technology', 'Credentials', 'Contact', 'Links'];

export default function App() {
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const width = track.clientWidth || window.innerWidth;
      setActiveSlide(Math.max(0, Math.min(slideNames.length - 1, Math.round(track.scrollLeft / width))));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slideNames.length - 1, index));
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <Navigation />
      <main className="slide-track" ref={trackRef} aria-label="Portfolio slides">
        <Hero />
        <Story />
        <Work />
        <Approach />
        <Services />
        <Technology />
        <Credentials />
        <Contact />
        <Footer />
      </main>
      <div className="slide-controls" aria-label="Slide navigation">
        <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous slide"><ArrowLeft size={16} /></button>
        <span><strong>{String(activeSlide + 1).padStart(2, '0')}</strong><i />{String(slideNames.length).padStart(2, '0')} <small>{slideNames[activeSlide]}</small></span>
        <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === slideNames.length - 1} aria-label="Next slide"><ArrowRight size={16} /></button>
      </div>
    </div>
  );
}
