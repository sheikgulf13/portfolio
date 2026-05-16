import { capabilities } from "@/utils/portfolioData";

export default function Capabilities() {
  return (
    <section id="capabilities" data-screen-label="03 Capabilities">
      <div className="section-eyebrow reveal">
        <span className="eyebrow">CAPABILITIES</span>
      </div>

      <ul className="capabilities-list">
        {capabilities.map((capability) => (
          <li className="cap-row reveal" key={capability.number}>
            <span className="cap-num">{capability.number}</span>
            <span className="cap-title">{capability.title}</span>
            <p className="cap-desc">{capability.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
