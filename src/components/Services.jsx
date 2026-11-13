import '../styles/website-care.css';

const services = [
  [
    'BUSINESS WEBSITES',
    'Clear, expressive websites designed around a real brand and its people.',
  ],
  [
    'LANDING PAGES',
    'Focused pages that communicate one strong idea without unnecessary noise.',
  ],
  [
    'WEB APPLICATIONS',
    'Useful interfaces and interactive products built to grow with the idea.',
  ],
  [
    'PERSONAL PORTFOLIOS',
    'Distinct digital spaces that make someone’s work and story feel memorable.',
  ],
];

const plans = [
  {
    name: 'STARTER',
    price: '₱499',
    description: 'A simple online home for your business.',
    features: [
      'Managed hosting and deployment',
      'HTTPS / SSL setup',
      'Basic technical maintenance',
      'Email support',
    ],
  },
  {
    name: 'BUSINESS',
    price: '₱999',
    description: 'For a business that needs occasional content care.',
    featured: true,
    features: [
      'Everything in Starter',
      'One small content update each month',
      'Monthly link and performance check',
      'Scheduled website-file backup',
    ],
  },
  {
    name: 'PRIORITY',
    price: '₱1,999',
    description: 'For websites that need more frequent attention.',
    features: [
      'Everything in Business',
      'Up to two small content updates each month',
      'Priority support on business days',
      'Monthly website health review',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="section-label">
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
        {services.map(([title, description]) => (
          <article className="service-row reveal" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="service-row__arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>

      <div className="care-offer">
        <div className="care-offer__intro reveal">
          <div className="care-offer__label">
            <span>WEBSITE CARE PLANS</span>
            <span>FOR SELECTED SMALL BUSINESSES</span>
          </div>
          <p className="eyebrow">WEBSITE-AS-A-SERVICE</p>
          <h2 className="care-offer__title">
            ₱0 WEBSITE
            <br />
            <em>BUILD FEE.</em>
          </h2>
          <p className="care-offer__summary">
            For selected small-business websites, I waive the initial design and
            development fee when you keep an active hosting and maintenance plan.
            You pay for ongoing website care each month. More complex websites
            are quoted separately.
          </p>
        </div>

        <div className="care-plans">
          {plans.map((plan) => (
            <article
              className={`care-plan reveal${plan.featured ? ' care-plan--featured' : ''}`}
              key={plan.name}
            >
              <div className="care-plan__top">
                <span className="care-plan__name">{plan.name}</span>
                {plan.featured && <span className="care-plan__badge">POPULAR</span>}
              </div>
              <p className="care-plan__price">
                {plan.price}<span> / month</span>
              </p>
              <p className="care-plan__description">{plan.description}</p>
              <ul className="care-plan__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">+</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="care-offer__pricing-note">
          Starting rates for eligible, low-traffic business websites. The final
          quote confirms the commercial hosting plan and any usage costs before
          work begins. Domain registration and renewal, business email, paid
          third-party tools, e-commerce, databases, and larger changes are
          quoted separately.
        </p>

        <div className="care-terms">
          <article className="care-terms__item">
            <span className="care-terms__number">01 / PAYMENT</span>
            <h3>Pay monthly. Stay maintained.</h3>
            <p>
              The first month is paid before development begins. Subscriptions
              are billed monthly in advance. Any minimum term and cancellation
              conditions are written in the agreement before work starts.
            </p>
          </article>
          <article className="care-terms__item">
            <span className="care-terms__number">02 / LATE PAYMENT</span>
            <h3>Clear reminders. Clear next steps.</h3>
            <p>
              Overdue reminders come first. At 15 days overdue, hosting and
              maintenance may be suspended. At 30 days, the subscription may
              be terminated under the agreement. Service can be restored after
              outstanding balances are settled. Website files are retained for
              up to 30 days after termination.
            </p>
          </article>
          <article className="care-terms__item">
            <span className="care-terms__number">03 / OWNERSHIP</span>
            <h3>Your business. Your domain.</h3>
            <p>
              The domain is registered in the client’s name. Domain renewals
              are separate. Website access, file handover, and any transfer
              requirements are documented in the service agreement.
            </p>
          </article>
          <article className="care-terms__item">
            <span className="care-terms__number">04 / SCOPE</span>
            <h3>Small updates, not unlimited rebuilds.</h3>
            <p>
              Content updates are limited to the plan allowance. New pages,
              major redesigns, custom features, integrations, and work outside
              the agreed scope are quoted separately.
            </p>
          </article>
        </div>

        <a
          className="care-offer__cta"
          href="mailto:asnorali.dev@gmail.com?subject=Website%20Care%20Plan%20Inquiry"
        >
          Discuss a website care plan <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
