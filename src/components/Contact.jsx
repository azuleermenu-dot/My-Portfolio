import { ArrowUpRight, Mail } from 'lucide-react';

const email = 'asnorali404@gmail.com';

export default function Contact() {
  const submit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const subject = `Project inquiry — ${data.get('project') || 'New project'}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('project')}\n\n${data.get('message')}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="contact section">
      <div className="contact__glow" />

      <div className="section-label section-label--light">
        <span>07</span>
        <span>CONTACT</span>
        <span>OPEN FOR IDEAS</span>
      </div>

      <div className="contact__head reveal">
        <p className="eyebrow">SAY HELLO</p>
        <h2 className="display">
          LET'S MAKE
          <br />
          <em>SOMETHING REAL.</em>
        </h2>
        <p>
          Have an idea, website or digital product in mind?
          <br />
          Tell me what you’re building.
        </p>
        <a className="contact__email" href={`mailto:${email}`}>
          {email} <ArrowUpRight size={20} />
        </a>
      </div>

      <form className="inquiry reveal" onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="name">01 / NAME</label>
          <input id="name" name="name" required placeholder="Your name" />
        </div>

        <div className="form-field">
          <label htmlFor="email">02 / EMAIL</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="project">03 / PROJECT TYPE</label>
          <select id="project" name="project" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Business website</option>
            <option>Landing page</option>
            <option>Web application</option>
            <option>Personal portfolio</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="message">04 / MESSAGE</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            placeholder="Tell me what you're building..."
          />
        </div>

        <button className="submit" type="submit">
          Send inquiry <Mail size={18} />
        </button>
      </form>
    </section>
  );
}
