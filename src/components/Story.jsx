const chapters = [
  [
    'BEGINNING',
    'It started with curiosity — wondering how websites were made, then opening things up and trying to make them myself.',
  ],
  [
    'LEARNING',
    'I learned by building. Small experiments became real interfaces, and every broken thing became another lesson.',
  ],
  [
    'BUILDING',
    'I kept making: websites, concepts and systems. The process taught me to care about both what people see and what makes it work.',
  ],
  [
    'NOW',
    'Today, I’m focused on creating digital experiences with stronger visual direction, cleaner engineering and more intentional details.',
  ],
  [
    'NEXT',
    'There is still a lot to learn. That is part of the point — keep experimenting, keep refining, keep building.',
  ],
];

export default function Story() {
  return (
    <section id="story" className="story section">
      <div className="section-label">
        <span>02</span>
        <span>MY STORY</span>
        <span>PERSONAL / ONGOING</span>
      </div>

      <div className="story__intro reveal">
        <p className="eyebrow">A WORK IN PROGRESS</p>
        <h2 className="display">
          I'M ASNOR,
          <br />
          <em>
            A DEVELOPER
            <br />
            WHO LEARNED
            <br />
            BY BUILDING.
          </em>
        </h2>
      </div>

      <div className="story__chapters">
        {chapters.map(([title, paragraph]) => (
          <article className="chapter reveal" key={title}>
            
            <div className="chapter__title">{title}</div>
            <p>{paragraph}</p>
            <span className="chapter__line" />
          </article>
        ))}
      </div>
    </section>
  );
}
