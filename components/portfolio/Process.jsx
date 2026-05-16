import { processSteps } from "@/utils/portfolioData";

export default function Process() {
  return (
    <section id="process" data-screen-label="05 Process">
      <div className="process-story">
        <div className="process-label-wrap">
          <div className="section-eyebrow process-eyebrow">
            <span className="eyebrow">PROCESS</span>
          </div>
        </div>

        <div className="process-stages" aria-live="polite">
          {processSteps.map((step, index) => (
            <article className="process-stage" id={`process-stage-${index + 1}`} key={step.number}>
              <div className="process-step">
                <div className="process-num">{step.number}</div>
                <div className="process-title">{step.title}</div>
                <p className="process-desc">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="process-progress" aria-hidden="true">
          <div className="process-progress-fill" id="process-progress-fill" />
        </div>
      </div>
    </section>
  );
}
