const services = [
  [
    '01',
    'BUSINESS WEBSITES',
    'Clear, expressive websites designed around a real brand and its people.',
  ],
  [
    '02',
    'LANDING PAGES',
    'Focused pages that communicate one strong idea without unnecessary noise.',
  ],
  [
    '03',
    'WEB APPLICATIONS',
    'Useful interfaces and interactive products built to grow with the idea.',
  ],
  [
    '04',
    'PERSONAL PORTFOLIOS',
    'Distinct digital spaces that make someone’s work and story feel memorable.',
  ],
];

export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="section-label">
        <span>05</span>
        <span>WHAT I BUILD</span>
        <span>CAPABILITIES</span>
      </div>

      <div className="services__head reveal">
        <p className="eyebrow">SERVICES</p>
        <h2 className="display">
          WHAT
          <br />
          <em>I BUILD.</em>
        </h2>
      </div>

      <div className="service-list">
        {services.map(([number, title, description]) => (
          <article className="service-row reveal" key={number}>
            <span className="service-row__num">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="service-row__arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
