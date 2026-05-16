import { contact } from "@/utils/portfolioData";

export default function Contact() {
  return (
    <section id="contact" data-screen-label="07 Contact">
      <div className="section-eyebrow reveal">
        <span className="eyebrow">CONTACT</span>
      </div>
      <h2 className="contact-statement reveal">
        <span className="contact-statement-word" data-cursor-shape="square">
          Let&apos;s
        </span>{" "}
        <span className="contact-statement-word" data-cursor-shape="square">
          get
        </span>
        <br />
        <span className="contact-statement-word" data-cursor-shape="square">
          to
        </span>{" "}
        <span className="contact-statement-word" data-cursor-shape="square">
          work.
        </span>
      </h2>
      <div className="contact-email-wrap">
        <a
          href={`mailto:${contact.email}`}
          className="contact-email reveal"
          data-magnetic
          data-cursor="hover"
          data-cursor-size="sm"
        >
          {contact.email} <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
