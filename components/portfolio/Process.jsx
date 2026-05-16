import { processSteps } from "@/utils/portfolioData";

function ProcessVisual({ stepIndex }) {
  if (stepIndex === 0) {
    return (
      <div className="process-visual process-visual-understand" aria-hidden="true">
        <div className="visual-brief">
          <div className="visual-brief-head" />
          <div className="visual-brief-line visual-brief-line-1" />
          <div className="visual-brief-line visual-brief-line-2" />
          <div className="visual-brief-line visual-brief-line-3" />
        </div>
        <div className="visual-lens" />
        <div className="visual-flow-line visual-flow-line-1" />
        <div className="visual-flow-line visual-flow-line-2" />
        <div className="visual-flow-node visual-flow-node-1" />
        <div className="visual-flow-node visual-flow-node-2" />
        <div className="visual-flow-node visual-flow-node-3" />
      </div>
    );
  }

  if (stepIndex === 1) {
    return (
      <div className="process-visual process-visual-build" aria-hidden="true">
        <div className="visual-window">
          <div className="visual-window-head" />
          <div className="visual-build-body">
            <div className="visual-build-sidebar">
              <span className="visual-build-nav visual-build-nav-1" />
              <span className="visual-build-nav visual-build-nav-2" />
              <span className="visual-build-nav visual-build-nav-3" />
            </div>
            <div className="visual-build-main">
              <div className="visual-build-progress">
                <span className="visual-build-progress-step visual-build-progress-step-1" />
                <span className="visual-build-progress-step visual-build-progress-step-2" />
                <span className="visual-build-progress-step visual-build-progress-step-3" />
              </div>
              <div className="visual-grid">
                <span className="visual-cell visual-cell-1" />
                <span className="visual-cell visual-cell-2" />
                <span className="visual-cell visual-cell-3" />
                <span className="visual-cell visual-cell-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="process-visual process-visual-handover" aria-hidden="true">
      <div className="visual-handover-source">
        <div className="visual-handover-source-line visual-handover-source-line-1" />
        <div className="visual-handover-source-line visual-handover-source-line-2" />
        <div className="visual-handover-source-line visual-handover-source-line-3" />
      </div>
      <div className="visual-handover-arrow" />
      <div className="visual-handover-target">
        <div className="visual-handover-target-slot" />
        <div className="visual-handover-target-badge" />
      </div>
    </div>
  );
}

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
                <div className="process-copy">
                  <div className="process-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="process-title">{step.title}</div>
                  <p className="process-desc">{step.description}</p>
                </div>
                <ProcessVisual stepIndex={index} />
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
