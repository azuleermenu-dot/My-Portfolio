import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowUpRight, AudioLines, Code2, Compass,
  Database, DraftingCompass, ExternalLink, Github, Headphones, Linkedin,
  Mail, MoveUpRight, Play, Send, Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    slug: 'kdyyn-market', number: '01', title: 'KDYNN Market', kind: 'Build',
    label: 'MARKETPLACE WEBSITE', status: 'WEB PROJECT',
    description: 'A marketplace website project focused on a clear storefront experience, product presentation, and responsive browsing.',
    overview: 'A website project for KDYNN Market. The presentation focuses on a clear digital storefront and a straightforward way for visitors to discover the marketplace.',
    approach: 'A practical storefront direction with a clean hierarchy, focused content, and responsive layouts that keep the browsing experience understandable.',
    focus: ['Digital storefront presentation', 'Responsive structure and navigation', 'Clear product discovery'],
    stack: ['Next.js', 'React', 'TypeScript'],
    repo: 'https://github.com/azuleermenu-dot/KDYNN-MARKET',
    live: 'https://kdyyn-market.vercel.app',
    visual: 'market',
  },
  {
    slug: 'wicked-coffee', number: '02', title: 'Wicked Coffee', kind: 'Concept',
    label: 'COFFEE SHOP WEBSITE CONCEPT', status: 'CONCEPT PROJECT',
    description: 'A creative coffee shop website concept exploring an expressive brand atmosphere and a warm, memorable digital experience.',
    overview: 'A coffee shop website concept designed to explore how art direction, typography, and atmosphere can shape a memorable online experience.',
    approach: 'A warm editorial direction with coffee-inspired tones, clear page structure, and a responsive experience for smaller screens.',
    focus: ['Coffee-shop visual direction', 'Brand atmosphere and storytelling', 'Responsive website presentation'],
    stack: [],
    repo: null,
    live: null,
    visual: 'coffee',
  },
  {
    slug: 'ember-and-salt', number: '03', title: 'Ember & Salt', kind: 'Concept',
    label: 'FICTIONAL RESTAURANT BRAND & WEBSITE', status: 'FICTIONAL CONCEPT',
    description: 'A fictional premium restaurant branding and website concept created to explore an elegant, atmospheric hospitality experience.',
    overview: 'An original fictional restaurant identity and website concept. It is included as a creative portfolio exploration, not as a real restaurant, client, or business affiliation.',
    approach: 'An editorial hospitality direction built around atmosphere, considered typography, restrained colour, and a cohesive digital identity.',
    focus: ['Fictional restaurant identity', 'Premium editorial art direction', 'Cohesive website concept'],
    stack: [],
    repo: null,
    live: null,
    visual: 'ember',
  },
];

const technologyGroups = [
  { title: 'Frontend', items: [['HTML','html5'],['CSS','css3'],['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['Vite','vite'],['Next.js','nextdotjs']] },
  { title: 'Programming', items: [['Java','java'],['Python','python'],['Luau','lua']] },
  { title: 'Backend & Database', items: [['PostgreSQL','postgresql'],['MongoDB','mongodb'],['NoSQL',null]] },
  { title: 'Tools & Platforms', items: [['Git','git'],['GitHub','github'],['Vercel','vercel']] },
];

const exploring = [
  'Scroll-driven storytelling',
  'Motion design and interaction',
  'Responsive interface systems',
  'Modern frontend architecture',
];

function useScrollMotion(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    let ticker;

    if (!reduced) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.05, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-reveal]', { autoAlpha: 1, y: 0 });
        gsap.set('[data-image-reveal]', { clipPath: 'inset(0 0 0 0)' });
        return;
      }

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 34 }, {
          autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 87%', once: true },
        });
      });

      gsap.utils.toArray('[data-parallax]').forEach((element) => {
        const speed = Number(element.dataset.parallax) || 0.1;
        gsap.to(element, {
          yPercent: speed * -55, ease: 'none',
          scrollTrigger: { trigger: element.closest('section') || element, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      gsap.utils.toArray('.section-heading').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, x: -28 }, {
          autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 91%', once: true },
        });
      });

      ['.process-step', '.technology-card', '.project-card'].forEach((selector) => {
        gsap.utils.toArray(selector).forEach((element, index) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 38, scale: 0.985 }, {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.75,
            delay: (index % 4) * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
      });

      gsap.utils.toArray('.glass-card, .contact-form').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 48, rotateX: 2 }, {
          autoAlpha: 1, y: 0, rotateX: 0, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('[data-image-reveal]').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0 0)', duration: 1.1, ease: 'power3.inOut',
          scrollTrigger: { trigger: element, start: 'top 83%', once: true },
        });
      });

      const path = document.querySelector('.story-path');
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: '#workspace', start: 'top 68%', end: 'bottom 48%', scrub: 1 },
        });
      }

      const track = document.querySelector('.projects-track');
      const portfolio = document.querySelector('#portfolio');
      if (track && portfolio && window.matchMedia('(min-width: 1100px)').matches) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 110);
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: portfolio, start: 'top top', end: () => '+=' + (distance() + window.innerHeight * 0.25),
            pin: true, scrub: 1, invalidateOnRefresh: true,
          },
        });
      }
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(refresh);
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenis) {
        gsap.ticker.remove(ticker);
        lenis.destroy();
      }
    };
  }, [enabled]);
}

function navigateTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', '#' + id);
}

function Galaxy() {
  const stars = useMemo(() => Array.from({ length: 95 }, (_, index) => ({
    id: index, x: (index * 37.17 + 8) % 100, y: (index * 61.31 + 5) % 100,
    size: index % 9 === 0 ? 2.4 : index % 4 === 0 ? 1.7 : 1.1,
    delay: (index % 13) * -0.5, duration: 3 + (index % 7) * 0.7,
  })), []);

  return <div className="galaxy" aria-hidden="true">
    <div className="galaxy__nebula galaxy__nebula--one" />
    <div className="galaxy__nebula galaxy__nebula--two" />
    <div className="galaxy__nebula galaxy__nebula--three" />
    <div className="galaxy__dust" />
    {stars.map((star) => <i className="galaxy__star" key={star.id} style={{
      left: star.x + '%', top: star.y + '%', width: star.size + 'px', height: star.size + 'px',
      animationDelay: star.delay + 's', animationDuration: star.duration + 's',
    }} />)}
    <i className="galaxy__shoot galaxy__shoot--one" />
    <i className="galaxy__shoot galaxy__shoot--two" />
    <div className="galaxy__vignette" />
  </div>;
}

function Nav({ active, onNavigate }) {
  const links = [['home','Home'],['about','About'],['portfolio','Portfolio'],['contact','Contact']];
  return <header className="nav-wrap">
    <nav className="nav-glass" aria-label="Main navigation">
      <a className="nav-brand" href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>AA<span>.</span></a>
      <div className="nav-links">{links.map(([id,label]) => <a key={id} href={'#'+id} className={active===id?'active':''} aria-current={active===id?'page':undefined} onClick={(e)=>{e.preventDefault();onNavigate(id);}}>{label}</a>)}</div>
      <a className="nav-cta" href="mailto:asnorali.dev@gmail.com"><i /> Let's talk <ArrowUpRight size={13}/></a>
    </nav>
  </header>;
}

function TypingRole() {
  const roles = ['Freelance Web Developer','Frontend Developer','Web Designer','Creative Developer'];
  const [index,setIndex] = useState(0);
  const [text,setText] = useState('');
  const [deleting,setDeleting] = useState(false);
  useEffect(() => {
    const role=roles[index];
    let timeout;
    if (!deleting && text.length<role.length) timeout=setTimeout(()=>setText(role.slice(0,text.length+1)),72);
    else if (!deleting) timeout=setTimeout(()=>setDeleting(true),1400);
    else if (text.length>0) timeout=setTimeout(()=>setText(role.slice(0,text.length-1)),32);
    else { setDeleting(false); setIndex((value)=>(value+1)%roles.length); }
    return ()=>clearTimeout(timeout);
  },[text,deleting,index]);
  return <span className="typing-role" aria-label={roles[index]}>{text}<i /></span>;
}

function Hero() {
  return <section id="home" className="hero section">
    <div className="hero__glow" data-parallax=".14" />
    <div className="hero__meta" data-reveal><span>INDEPENDENT PRACTICE</span><span>PHILIPPINES · 2026</span></div>
    <div className="hero__layout">
      <div className="hero__copy">
        <p className="eyebrow" data-reveal>HELLO, I'M ASNOR ALI</p>
        <h1 data-reveal><span>Welcome to</span><strong>My Portfolio<span>.</span></strong></h1>
        <div className="hero__role" data-reveal><small>I AM A</small><TypingRole/></div>
        <p className="hero__description" data-reveal>I build modern digital experiences by combining technology, creativity, and thoughtful design.</p>
        <div className="hero__actions" data-reveal>
          <button className="button button--primary" onClick={()=>navigateTo('portfolio')}>Explore my projects <ArrowDownRight size={17}/></button>
          <button className="button button--secondary" onClick={()=>navigateTo('contact')}>Contact me</button>
        </div>
        <div className="hero__socials" data-reveal>
          <a href="https://github.com/azuleermenu-dot" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>
          <a href="https://linkedin.com/in/asnor-ali-006b50446" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
          <a href="mailto:asnorali.dev@gmail.com" aria-label="Email"><Mail/></a>
        </div>
      </div>
      <div className="hero__visual" data-parallax=".18">
        <div className="hero__orbit hero__orbit--one"/><div className="hero__orbit hero__orbit--two"/>
        <article className="id-card" data-image-reveal>
          <div className="id-card__top"><span>PERSONAL PROFILE</span><span>AA / 001</span></div>
          <img src="/asnor-ali.webp" alt="Portrait of Asnor Ali" width="480" height="480" fetchPriority="high"/>
          <div className="id-card__identity"><div><strong>Asnor Ali</strong><span>Freelance Web Developer</span></div><b>AA.</b></div>
          <div className="id-card__bottom"><span>SELF-EMPLOYED</span><span>PH / WEB</span></div>
        </article>
        <span className="hero__visual-label">DESIGN · DEVELOPMENT · INTERACTION</span>
      </div>
    </div>
    <div className="hero__bottom"><span>THOUGHTFUL DIGITAL EXPERIENCES</span><span>SCROLL TO DISCOVER ↓</span></div>
  </section>;
}

function About() {
  return <section id="about" className="about section">
    <div className="section-heading"><span>01 / ABOUT ME</span><span>A LITTLE ABOUT THE PERSON BEHIND THE SCREEN</span></div>
    <div className="about__grid">
      <div className="about__title" data-reveal><p className="eyebrow">GET TO KNOW ME</p><h2>Hi, I'm<br/><span>Asnor Ali.</span></h2></div>
      <div className="about__copy" data-reveal>
        <p className="eyebrow">ABOUT / 001</p>
        <p className="about__lead">I'm a freelance web developer passionate about creating modern, interactive, and visually engaging digital experiences.</p>
        <p>I enjoy transforming ideas into functional websites, exploring modern technologies, and building solutions that combine thoughtful design with practical functionality.</p>
        <p>My focus is on responsive interfaces, modern web technologies, and creating digital experiences that feel professional, intuitive, and memorable.</p>
        <button className="button button--secondary" onClick={()=>navigateTo('contact')}>Contact me <ArrowUpRight size={15}/></button>
      </div>
    </div>
  </section>;
}

function Workspace() {
  const process=[['01','Discover','Understand the goal, the audience, and what the experience needs to do.',Compass],['02','Design','Shape the structure, visual direction, and interactions around the idea.',DraftingCompass],['03','Develop','Build, test, and refine a responsive experience with care.',Code2]];
  return <section id="workspace" className="workspace section">
    <div className="section-heading"><span>02 / CREATIVE WORKSPACE</span><span>IDEAS INTO EXPERIENCES</span></div>
    <div className="workspace__intro" data-reveal><div><p className="eyebrow">HOW I APPROACH THE WORK</p><h2>A little music.<br/><span>A lot of ideas.</span></h2></div><p>Every project starts with curiosity. I like exploring how structure, visuals, and small interactions can make a digital experience feel clear and memorable.</p></div>
    <div className="workspace__grid">
      <article className="glass-card glass-card--process" data-reveal>
        <div className="card-top"><span className="eyebrow">THE CREATIVE WORKSPACE</span><span>01 — 03</span></div>
        <div className="process-list">{process.map(([number,title,copy,Icon])=><div className="process-step" key={number}><small>{number}</small><i><Icon size={20}/></i><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
        <svg className="workspace-path" viewBox="0 0 520 180" fill="none" aria-hidden="true"><path className="story-path" d="M12 145 C110 145 105 18 210 38 S325 165 395 88 S470 28 508 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </article>
      <article className="glass-card glass-card--exploring" data-reveal>
        <div className="card-top"><span className="eyebrow">CURRENTLY EXPLORING</span><Sparkles size={17}/></div>
        <h3>Always learning.<br/><span>Always building.</span></h3>
        <ul>{exploring.map((item,index)=><li key={item}><small>0{index+1}</small>{item}<ArrowUpRight size={14}/></li>)}</ul>
      </article>
      <article className="glass-card glass-card--music" data-reveal>
        <div className="card-top"><span className="eyebrow">A PERSONAL NOTE</span><AudioLines size={18}/></div>
        <div className="music-panel"><div className="music-art"><div/><AudioLines size={25}/></div><div><small>LISTENING ROOM</small><h3>Soundtrack<br/>not connected.</h3><p>No audio source is configured yet. This space is ready for a playlist later.</p><div className="music-controls"><button disabled aria-label="Previous track">‹</button><button disabled aria-label="Play music"><Play size={14}/></button><button disabled aria-label="Next track">›</button><span><Headphones size={12}/> NO AUDIO SOURCE</span></div></div></div>
      </article>
    </div>
  </section>;
}

function ProjectVisual({project}) {
  return <div className={'project-visual project-visual--'+project.visual}>
    <div className="project-browser"><span>● ● ●</span><small>{project.label}</small><ArrowUpRight size={13}/></div>
    <div className="project-visual__art">
      {project.visual==='market' && <><small>KDYNN MARKET / DIGITAL STOREFRONT</small><strong>Market<br/>your way.</strong><span>DISCOVER SOMETHING NEW</span><div className="market-tiles"><i/><i/><i/><i/></div></>}
      {project.visual==='coffee' && <><small>COFFEE · COMMUNITY · CONCEPT</small><strong>Stay a<br/>little longer.</strong><span>WICKED COFFEE</span><div className="coffee-orbit"/></>}
      {project.visual==='ember' && <><small>FICTIONAL RESTAURANT IDENTITY</small><strong>Fire.<br/>Flavor.<br/><em>Feeling.</em></strong><span>EMBER & SALT / CONCEPT</span><div className="ember-glow"/></>}
    </div>
    <div className="project-visual__caption">PORTFOLIO VISUAL / {project.number}</div>
  </div>;
}

function ProjectDetail({project,onBack}) {
  return <main className="project-detail">
    <header className="detail-header"><button onClick={onBack}><ArrowLeft size={16}/> Back to portfolio</button><a href="#home">AA<span>.</span></a></header>
    <p className="eyebrow" data-reveal>{project.number} / {project.label}</p>
    <div className="detail-title" data-reveal><h1>{project.title}</h1><span className={'status '+(project.kind==='Concept'?'status--concept':'')}>{project.status}</span></div>
    <p className="detail-lead" data-reveal>{project.overview}</p>
    <div className="detail-actions">{project.live && <a className="button button--primary" href={project.live} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={15}/></a>}{project.repo && <a className="button button--secondary" href={project.repo} target="_blank" rel="noreferrer">View repository <Github size={15}/></a>}</div>
    <div className="detail-visual"><ProjectVisual project={project}/></div>
    <div className="detail-content">
      <article data-reveal><p className="eyebrow">01 / OVERVIEW</p><h2>The idea behind<br/><span>the project.</span></h2><p>{project.description}</p></article>
      <article data-reveal><p className="eyebrow">02 / DESIGN APPROACH</p><h2>Clarity with<br/><span>character.</span></h2><p>{project.approach}</p></article>
      <article data-reveal><p className="eyebrow">03 / PROJECT FOCUS</p><ul>{project.focus.map(item=><li key={item}>{item}</li>)}</ul></article>
      <article data-reveal><p className="eyebrow">04 / TECHNOLOGIES</p>{project.stack.length?<div className="detail-stack">{project.stack.map(item=><span key={item}>{item}</span>)}</div>:<p>Technology details have not been published for this project.</p>}</article>
    </div>
    <button className="text-link" onClick={onBack}><ArrowLeft size={15}/> Back to selected work</button>
  </main>;
}

function Portfolio({onOpen}) {
  const [filter,setFilter]=useState('All work');
  const filtered=projects.filter(project=>filter==='All work'||project.kind===(filter==='Concepts'?'Concept':'Build'));
  return <section id="portfolio" className="portfolio-section section">
    <div className="section-heading"><span>03 / SELECTED WORK</span><span>PROJECTS · CONCEPTS · EXPERIMENTS</span></div>
    <div className="portfolio__intro" data-reveal><div><p className="eyebrow">A FEW THINGS I'VE BEEN BUILDING</p><h2>Selected<br/><span>projects.</span></h2></div><div className="portfolio__side"><p>A collection of website work and clearly labelled concepts. Each project is a chance to explore a different idea through design and development.</p><div className="filters">{['All work','Builds','Concepts'].map(item=><button key={item} className={filter===item?'active':''} onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</button>)}</div></div></div>
    <div className="projects-viewport"><div className="projects-track">{filtered.map(project=><article className="project-card" key={project.slug}>
      <button className="project-open" onClick={()=>onOpen(project.slug)} aria-label={'Open project details for '+project.title}><ProjectVisual project={project}/></button>
      <div className="project-info"><div className="project-meta"><span>{project.number} / {project.label}</span><span className={'status '+(project.kind==='Concept'?'status--concept':'')}>{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-stack">{project.stack.length?project.stack.map(item=><span key={item}>{item}</span>):<span>Stack not published</span>}</div><div className="project-links"><button onClick={()=>onOpen(project.slug)}>Project details <ArrowDownRight size={14}/></button>{project.live&&<a href={project.live} target="_blank" rel="noreferrer">Live demo <ExternalLink size={13}/></a>}{project.repo&&<a href={project.repo} target="_blank" rel="noreferrer">GitHub <Github size={13}/></a>}</div></div>
    </article>)}</div></div>
    <div className="portfolio-footnote"><span>{filtered.length} PROJECTS SHOWN</span><span>Concept work is labelled. No client relationship is implied.</span></div>
  </section>;
}

function Technology() {
  return <section id="technology" className="technology section">
    <div className="section-heading"><span>04 / TECHNOLOGY</span><span>TOOLS I WORK WITH</span></div>
    <div className="technology__intro" data-reveal><div><p className="eyebrow">THE TOOLKIT</p><h2>Built with<br/><span>curiosity.</span></h2></div><p>I work across frontend development, programming, data, and deployment tools. The right stack depends on the needs of the project.</p></div>
    <div className="technology-groups">{technologyGroups.map((group,index)=><div className="technology-group" key={group.title} data-reveal><div className="technology-group__title"><small>0{index+1}</small><h3>{group.title}</h3><span>{group.items.length} TOOLS</span></div><div className="technology-grid">{group.items.map(([name,icon])=><article className="technology-card" key={name}><span className="technology-icon">{icon?<img src={'https://cdn.simpleicons.org/'+icon} alt="" loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('icon-fallback');e.currentTarget.parentElement.textContent=name.slice(0,2);}}/>:<Database size={25}/>}</span><h4>{name}</h4><ArrowUpRight className="tech-arrow" size={13}/></article>)}</div></div>)}</div>
  </section>;
}

function Contact() {
  const [status,setStatus]=useState({type:'idle',message:''});
  const started=useRef(Date.now());
  async function submit(event) {
    event.preventDefault();
    const form=event.currentTarget;
    const data=new FormData(form);
    setStatus({type:'loading',message:'Sending your message…'});
    try {
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        name:String(data.get('name')||'').trim(),email:String(data.get('email')||'').trim(),subject:String(data.get('subject')||'').trim(),message:String(data.get('message')||'').trim(),website:String(data.get('website')||''),startedAt:started.current,
      })});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error||'Your message could not be sent.');
      form.reset();started.current=Date.now();
      setStatus({type:'success',message:'Thanks — your inquiry has been sent.'});
    } catch(error) {
      setStatus({type:'error',message:(error.message||'Message delivery failed.')+' You can also email me directly at asnorali.dev@gmail.com.'});
    }
  }
  return <section id="contact" className="contact section">
    <div className="section-heading"><span>05 / CONTACT</span><span>LET'S START A CONVERSATION</span></div>
    <div className="contact__layout">
      <div className="contact__copy" data-reveal><p className="eyebrow">HAVE AN IDEA IN MIND?</p><h2>Let's build<br/><span>something together.</span></h2><p>Have an idea or project in mind? Let's discuss how we can bring it to life.</p><a href="mailto:asnorali.dev@gmail.com" className="contact-email"><Mail size={17}/> asnorali.dev@gmail.com <ArrowUpRight size={15}/></a><div className="contact-availability"><i/> INDEPENDENT · SELF-EMPLOYED</div></div>
      <form className="contact-form" onSubmit={submit} data-reveal>
        <div className="form-row"><label>Name<input name="name" required maxLength="80" autoComplete="name" placeholder="Your name"/></label><label>Email<input name="email" required type="email" maxLength="254" autoComplete="email" placeholder="you@example.com"/></label></div>
        <label>Subject<input name="subject" required maxLength="120" placeholder="What would you like to build?"/></label>
        <label>Message<textarea name="message" required maxLength="4000" rows="5" placeholder="Tell me a little about your idea…"/></label>
        <div className="honeypot" aria-hidden="true"><label>Leave empty<input name="website" tabIndex="-1" autoComplete="off"/></label></div>
        <button className="button button--primary" type="submit" disabled={status.type==='loading'}>{status.type==='loading'?'Sending…': 'Send message'} <Send size={15}/></button>
        {status.type!=='idle'&&<p className={'form-status form-status--'+status.type} role="status" aria-live="polite">{status.message}</p>}
        <small className="form-note">Messages are sent to my email. Your details are not displayed publicly.</small>
      </form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer"><div className="footer__top"><div><a className="footer__brand" href="#home" onClick={e=>{e.preventDefault();navigateTo('home');}}>Asnor Ali<span>.</span></a><p>Freelance Web Developer · Self-Employed</p></div><button onClick={()=>navigateTo('home')}>Back to top <ArrowUpRight size={15}/></button></div><div className="footer__bottom"><nav>{[['home','Home'],['about','About'],['portfolio','Portfolio'],['contact','Contact']].map(([id,name])=><a key={id} href={'#'+id} onClick={e=>{e.preventDefault();navigateTo(id);}}>{name}</a>)}</nav><div><a href="https://github.com/azuleermenu-dot" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href="https://linkedin.com/in/asnor-ali-006b50446" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><a href="mailto:asnorali.dev@gmail.com" aria-label="Email"><Mail size={16}/></a></div><small>© {new Date().getFullYear()} ASNOR ALI. ALL RIGHTS RESERVED.</small></div></footer>;
}

export default function App() {
  const [activeProject,setActiveProject]=useState(null);
  const [activeSection,setActiveSection]=useState('home');
  useScrollMotion(!activeProject);
  const openProject=useCallback((slug)=>{history.pushState(null,'','#project/'+slug);setActiveProject(projects.find(project=>project.slug===slug)||null);window.scrollTo(0,0);},[]);
  const closeProject=useCallback(()=>{history.replaceState(null,'','#portfolio');setActiveProject(null);setTimeout(()=>document.getElementById('portfolio')?.scrollIntoView({behavior:'auto'}),40);},[]);
  useEffect(()=>{
    const sync=()=>{const match=location.hash.match(/^#project\/([a-z0-9-]+)$/i);setActiveProject(projects.find(project=>project.slug===match?.[1])||null);};
    window.addEventListener('popstate',sync);window.addEventListener('hashchange',sync);
    return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync);};
  },[]);
  useEffect(()=>{
    if(activeProject)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActiveSection(entry.target.id);}),{rootMargin:'-35% 0px -50% 0px'});
    ['home','about','portfolio','contact'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el);});
    return()=>observer.disconnect();
  },[activeProject]);
  return <div className="site-shell"><Galaxy/><main>{activeProject?<ProjectDetail project={activeProject} onBack={closeProject}/>:<><Nav active={activeSection} onNavigate={navigateTo}/><Hero/><About/><Workspace/><Portfolio onOpen={openProject}/><Technology/><Contact/><Footer/></>}</main></div>;
}
