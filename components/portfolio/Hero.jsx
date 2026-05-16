export default function Hero() {
  return (
    <section id="hero" data-screen-label="01 Hero">
      <h1 className="hero-headline reveal">
        <span className="hero-headline-line">
          <span className="hero-headline-word" data-cursor-shape="square">
            Apps.
          </span>{" "}
          <span className="hero-headline-word" data-cursor-shape="square">
            Automations.
          </span>{" "}
          <span className="hero-headline-word" data-cursor-shape="square">
            Agents.
          </span>
        </span>
      </h1>

      <p className="hero-sub hero-sub-compact reveal">
        Full-stack development, workflow automation, and AI agents - built end to end, by one person.
      </p>

      <div className="hero-bottom">
        <div className="hero-meta reveal">
          <div>LAT 13.0827° N</div>
          <div>LON 80.2707° E</div>
          <div>IST UTC+05:30</div>
        </div>
        <a href="#contact" className="hero-cta reveal" data-magnetic data-cursor="hover">
          Start a project <span className="arrow">→</span>
        </a>
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
