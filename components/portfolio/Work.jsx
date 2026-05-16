import { projects } from "@/utils/portfolioData";

export default function Work() {
  return (
    <section id="work" data-screen-label="02 Work">
      <div className="section-eyebrow reveal">
        <span className="eyebrow">SELECTED WORK</span>
        <h2 className="section-title">Selected Work.</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.name} className="project-card reveal" data-cursor="hover">
            <div className="project-image">
              <span className="project-image-label">[ PROJECT IMAGE ]</span>
            </div>
            <div className="project-meta">
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`project-status-${project.statusType}`}>{project.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
