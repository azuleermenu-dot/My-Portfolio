import { ArrowDownToLine, CheckCircle2, Code2, GraduationCap, FileText } from 'lucide-react';
import '../styles/credentials.css';

const modules = [
  'HTML Basics', 'CSS Basics', 'JavaScript Fundamentals', 'React Basics',
  'Node.js Basics', 'Building REST APIs', 'Git in Practice', 'Code Quality',
  'Databases', 'Testing', 'Build a Full-Stack Project', 'Build in Public',
  'Career Preparation', 'Job Ready',
];
const skills = [
  { group: 'Frontend', items: 'HTML5, CSS3, JavaScript (ES6+), React, Responsive Design' },
  { group: 'Backend & APIs', items: 'Node.js, Express.js, REST APIs' },
  { group: 'Databases', items: 'SQL, PostgreSQL' },
  { group: 'Tools & Practices', items: 'Git, GitHub, Docker (basics), Authentication & JWT' },
];

export default function Credentials() {
  return (
    <section className="credentials section" id="credentials">
      <div className="section-label"><span>07</span><span>TRAINING / CREDENTIALS</span><span>LEARNING & EXPERIENCE</span></div>
      <div className="credentials__hero reveal">
        <p className="eyebrow">LEARN · BUILD · GROW</p>
        <h2 className="display">TRAINED TO<br /><em>BUILD.</em></h2>
        <p className="credentials__intro">A record of structured full-stack developer training, completed modules, and the technical foundations covered through the BreakpointLabs program.</p>
      </div>
      <article className="credentials__featured reveal">
        <div className="credentials__featured-icon"><GraduationCap size={25} /></div>
        <div className="credentials__featured-copy">
          <span className="credentials__kicker">COMPLETED TRAINING · SEPTEMBER 2026</span>
          <h3>BreakpointLabs — Full-Stack Developer Program</h3>
          <p>74 of 74 activities completed</p>
        </div>
        <span className="credentials__complete"><CheckCircle2 size={15} /> COMPLETE</span>
      </article>
      <div className="credentials__details">
        <div className="credentials__modules reveal">
          <div className="credentials__heading"><span>01</span> COMPLETED MODULES &amp; ACHIEVEMENTS</div>
          <div className="credentials__module-grid">
            {modules.map((item, index) => <div className="credentials__module" key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><CheckCircle2 size={15} /></div>)}
          </div>
        </div>
        <div className="credentials__skills reveal">
          <div className="credentials__heading"><span>02</span> TECHNICAL SKILLS</div>
          {skills.map((skill) => <div className="credentials__skill" key={skill.group}><span>{skill.group}</span><p>{skill.items}</p></div>)}
        </div>
      </div>
      <div className="credentials__summary reveal">
        <Code2 size={18} />
        <p>Training covered frontend and backend development, REST APIs, version control, databases, testing, full-stack project work, and deployment.</p>
        <a className="credentials__download" href="/asnor-ali-developer-credentials.pdf" target="_blank" rel="noreferrer">Credentials PDF <ArrowDownToLine size={16} /></a>
      </div>
      <div className="cv-card reveal">
        <div className="cv-card__icon"><FileText size={22} /></div>
        <div className="cv-card__copy"><span>PERSONAL CV / 2026</span><h3>Asnor Ali — Curriculum Vitae</h3><p>Profile, technical skills, selected projects, education and completed developer training.</p></div>
        <a className="cv-card__button" href="/asnor-ali-cv.html" target="_blank" rel="noreferrer">View / Save CV <ArrowDownToLine size={16} /></a>
      </div>
    </section>
  );
}
