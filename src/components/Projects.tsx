import { projects } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

const systemsTags = new Set([
  "Java",
  "Spring Boot",
  "Kafka",
  "Kubernetes",
  "gRPC",
  "Python",
  "AWS",
  "Terraform",
  "C++",
  "Spark",
  "FastAPI",
  "PostgreSQL",
]);

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="ui-section-alt border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Projects"
          title="Selected work"
          description="Distributed systems, AI platforms, and cloud infrastructure — with interfaces where they matter."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.name} project={project} featured />
          ))}
        </div>

        {other.length > 0 && (
          <>
            <h3 className="ui-kicker mt-16 mb-6">Also built</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {other.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const className = `ui-card group flex flex-col p-6 ${
    featured ? "ui-card-highlight" : ""
  } ${project.github ? "cursor-pointer" : ""}`;

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{project.category}</span>
        {project.github ? (
          <span className="text-xs text-muted transition-colors group-hover:text-accent">
            GitHub →
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
        {project.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Tag key={tech} highlight={systemsTags.has(tech)}>
            {tech}
          </Tag>
        ))}
      </div>
    </>
  );

  if (project.github) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <article className={className}>{inner}</article>;
}
