import { projects } from '../data/projects';
import Project from './Project';

export default function Work() {
  return (
    <section id="work" className="work section">
      <div className="section-label">
        <span>03</span>
        <span>SELECTED WORK</span>
        <span>PROJECTS / CONCEPTS</span>
      </div>

      <div className="work__intro reveal">
        <p className="eyebrow">SELECTED WORK</p>
        <h2 className="display">
          THINGS I'VE
          <br />
          <em>BUILT &amp; EXPLORED.</em>
        </h2>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <Project key={project.number} project={project} />
        ))}
      </div>
    </section>
  );
}
