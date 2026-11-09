import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ContributionDashboard from './components/ContributionDashboard';
import { projects } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

const services = [
  ['01', 'Business websites', 'Clear, considered websites that help businesses explain what they do and earn trust.'],
  ['02', 'Landing pages', 'Focused digital experiences for launches, campaigns, products, and services.'],
  ['03', 'Web applications', 'Useful interfaces and practical tools built around real workflows.'],
  ['04', 'Personal portfolios', 'Distinctive online spaces that make work, skills, and identity easy to understand.'],
];

const technologies = [
  ['React', 'Frontend'], ['Next.js', 'Frontend'], ['TypeScript', 'Language'],
  ['JavaScript', 'Language'], ['Vite', 'Build tool'], ['Tailwind CSS', 'Styling'],
  ['Node.js', 'Backend'], ['Python', 'Language'], ['Supabase', 'Backend / data'],
  ['PostgreSQL', 'Database'], ['MongoDB', 'Database'], ['Git & GitHub', 'Workflow'],
  ['Vercel', 'Deployment'], ['Java', 'Language'], ['Luau', 'Game development'],
];

const steps = [
  ['01', 'Understand', 'Start with the people, the problem, and what success should look like.'],
  ['02', 'Shape', 'Give the idea a clear structure, visual direction, and practical scope.'],
  ['03', 'Build', 'Turn the direction into a responsive, accessible, maintainable experience.'],
  ['04', 'Refine', 'Test across devices, improve the details, and prepare for launch.'],
];

function SectionLabel({ index, children, light = false }) {
  return <div className={`section-label${light ? ' section-label--light' : ''}`}><span>{index} / {children}</span><span>ASNOR ALI — PORTFOLIO</span></div>;
}

function ProjectCard({ project, index }) {
  const title = project.title.replaceAll('\\n', ' ');
  return (
    <article className={`project-card project-card--${project.tone || 'default'}`}>
      <div className="project-card__visual">
        <div className="project-card__visual-noise" />
        <span className="project-card__visual-index">SELECTED WORK / {project.number}</span>
        <div className="project-card__visual-title">{title.split(' ').map((word) => <span key={word}>{word}</span>)}</div>
        <span className="project-card__visual-caption">{project.category}</span>
        <span className="project-card__visual-orbit" aria-hidden="true" />
      </div>
      <div className="project-card__details">
        <div className="project-card__heading"><span>{project.number} — {project.category}</span><span>0{index + 1} / 0{projects.length}</span></div>
        <h3>{title}</h3>
        <p>{project.description}</p>
        <div className="project-card__tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="project-card__links">
          <a href={project.href} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={16} /></a>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Live concept <ArrowUpRight size={16} /></a>}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const projectsTrackRef = useRef(null);\n  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    let ticker;
    if (!reduceMotion) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.15 });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 42 }, {
            autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          });
        });

        gsap.utils.toArray('[data-parallax]').forEach((element) => {
          const speed = Number(element.dataset.parallax) || 0.12;
          gsap.to(element, {
            yPercent: speed * -100, ease: 'none',
            scrollTrigger: { trigger: element.closest('section') || element, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        const path = rootRef.current?.querySelector('.story-path');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: { trigger: '.process-section', start: 'top 65%', end: 'bottom 70%', scrub: 1 },
          });
        }

        const track = projectsTrackRef.current;
        const cards = track ? gsap.utils.toArray('.project-card', track) : [];
        if (track && cards.length > 1 && window.matchMedia('(min-width: 900px)').matches) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -distance(), ease: 'none',
            scrollTrigger: {
              trigger: '.work-section', start: 'top top', end: () => `+=${distance()}`,
              pin: true, scrub: 1, invalidateOnRefresh: true,
            },
          });
        }
      }
    }, rootRef);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target);
    else target.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="portfolio" ref={rootRef}>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>AA<span>.</span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Work</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
        </nav>
        <a className="header-availability" href="mailto:asnorali.dev@gmail.com"><span /> Available for projects</a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-topline"><span>INDEPENDENT WEB DEVELOPER</span><span>PHILIPPINES · 2026</span></div>
          <div className="hero-main">
            <div className="hero-copy">
              <p className="eyebrow" data-reveal>DESIGN-MINDED DEVELOPMENT / 001</p>
              <h1 className="hero-title" data-reveal>Digital experiences<br /><em>with intention.</em></h1>
              <div className="hero-bottomline" data-reveal>
                <p>I’m Asnor Ali — an independent freelance web developer building thoughtful websites and useful digital experiences for people and businesses.</p>
                <a className="round-link" href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }} aria-label="Explore selected work"><ArrowDownRight /></a>
              </div>
            </div>
            <div className="hero-portrait" data-parallax="0.18">
              <img src="/asnor-ali.webp" alt="Portrait of Asnor Ali" width="600" height="750" fetchPriority="high" />
              <span className="portrait-caption">ASNOR ALI / INDEPENDENT PRACTICE</span>
            </div>
          </div>
          <div className="hero-footer"><span>THOUGHTFUL BY DESIGN. BUILT FOR PEOPLE.</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="intro-section" id="about">
          <SectionLabel index="01">A LITTLE ABOUT ME</SectionLabel>
          <div className="intro-layout">
            <p className="intro-kicker" data-reveal>NOT JUST<br />ANOTHER WEBSITE.</p>
            <div className="intro-statement" data-reveal>
              <h2>I turn ideas into <em>clear, useful</em> digital experiences.</h2>
              <p>I work directly with clients to understand their goals, shape a considered direction, and build responsive websites that feel distinctive without getting in the way. Good design should make things easier to understand — and good development should make them work everywhere.</p>
              <a className="text-link" href="mailto:asnorali.dev@gmail.com">Have a project in mind? <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="intro-marquee" aria-hidden="true"><span>THINK CLEARLY · DESIGN WITH PURPOSE · BUILD WITH CARE · </span><span>THINK CLEARLY · DESIGN WITH PURPOSE · BUILD WITH CARE · </span></div>
        </section>

        <section className="work-section" id="work">
          <div className="work-heading">
            <SectionLabel index="02">SELECTED WORK</SectionLabel>
            <div className="work-title-row" data-reveal><h2>Ideas made<br /><em>tangible.</em></h2><p>A selection of projects, experiments, and concepts. Each one is an opportunity to solve a different problem with clarity and care.</p></div>
          </div>
          <div className="projects-viewport"><div className="projects-track" ref={projectsTrackRef}>{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div></div>
          <div className="work-footnote"><span>SELECTED PROJECTS / 2026</span><span>Concepts and works in progress are labelled accordingly.</span><a href="https://github.com/azuleermenu-dot" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="services-section" id="services">
          <SectionLabel index="03">WHAT I CAN HELP WITH</SectionLabel>
          <div className="services-intro" data-reveal><h2>Digital work,<br /><em>made practical.</em></h2><p>From a first online presence to a custom tool, I focus on the right solution for the actual need — not adding complexity for its own sake.</p></div>
          <div className="service-list">{services.map(([number, title, description]) => <article className="service-row" key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p><MoveUpRight size={20} /></article>)}</div>
        </section>

        <section className="process-section" id="approach">
          <SectionLabel index="04">HOW I WORK</SectionLabel>
          <div className="process-layout">
            <div className="process-heading" data-reveal><p className="eyebrow">A SIMPLE, THOUGHTFUL PROCESS</p><h2>From first thought<br />to <em>finished work.</em></h2><p>Every project is different, but a clear process keeps the work focused, collaborative, and moving forward.</p></div>
            <div className="process-steps">{steps.map(([number, title, description]) => <article className="process-step" key={number} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
            <svg className="process-art" viewBox="0 0 520 580" fill="none" aria-hidden="true"><path className="story-path" d="M260 12 C70 100 455 155 260 260 S65 420 260 568" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="260" cy="12" r="4" fill="currentColor" /><circle cx="260" cy="568" r="4" fill="currentColor" /></svg>
          </div>
        </section>

        <section className="tech-section" id="technology">
          <SectionLabel index="05">TOOLS & TECHNOLOGY</SectionLabel>
          <div className="tech-layout">
            <div data-reveal><p className="eyebrow">THE TOOLBOX</p><h2>Built with<br /><em>the right tools.</em></h2><p className="tech-copy">A practical toolkit across frontend, backend, data, and deployment. The stack is chosen around what the project needs.</p></div>
            <div className="tech-grid">{technologies.map(([name, category], index) => <div className="tech-item" key={name} data-reveal><span>0{index + 1}</span><strong>{name}</strong><small>{category}</small></div>)}</div>
          </div>
          <ContributionDashboard />
        </section>

        <section className="contact-section" id="contact">
          <SectionLabel index="06" light>LET’S TALK</SectionLabel>
          <div className="contact-layout">
            <div className="contact-copy" data-reveal><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let’s build<br /><em>something good.</em></h2><p>Have a website or digital product in mind? Share a little about it and let’s see what we can make.</p><a className="contact-email" href="mailto:asnorali.dev@gmail.com">asnorali.dev@gmail.com <ArrowUpRight /></a></div>
            <form className="contact-form" data-reveal onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const subject = `Project inquiry — ${form.get('project') || 'New project'}`; const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nProject: ${form.get('project')}\n\n${form.get('message')}`; window.location.href = `mailto:asnorali.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }}>
              <label>Name<input name="name" required placeholder="Your name" autoComplete="name" /></label>
              <label>Email<input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
              <label>What are you looking to build?<select name="project" defaultValue="Business website"><option>Business website</option><option>Landing page</option><option>Web application</option><option>Personal portfolio</option><option>Something else</option></select></label>
              <label>Tell me a little about it<textarea name="message" rows="4" required placeholder="A few details about your idea..." /></label>
              <button type="submit">Send project inquiry <ArrowUpRight size={18} /></button>
              <small>This opens your email app with the inquiry prepared. Nothing is stored on this website.</small>
            </form>
          </div>
          <footer className="site-footer"><a className="footer-mark" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>AA<span>.</span></a><span>INDEPENDENT / FREELANCE WEB DEVELOPER</span><div><a href="https://github.com/azuleermenu-dot" target="_blank" rel="noreferrer"><Github size={17} /></a><a href="https://www.linkedin.com/in/asnor-ali-006b50446" target="_blank" rel="noreferrer"><Linkedin size={17} /></a><a href="mailto:asnorali.dev@gmail.com"><Mail size={17} /></a></div><small>© 2026 ASNOR ALI. ALL RIGHTS RESERVED.</small></footer>
        </section>
      </main>
      <a className="back-to-top" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} aria-label="Back to top"><ArrowDown /></a>
    </div>
  );
}
