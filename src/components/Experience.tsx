import { experience } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

const backendTags = new Set([
  "AWS",
  "Kafka",
  "C++",
  "PyTorch",
  "Terraform",
  "FastAPI",
  "Spark",
  "PostgreSQL",
  "Spring Boot",
  "gRPC",
  "Oracle",
]);

export function Experience() {
  return (
    <section id="experience" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Experience"
          title="Where I've built and shipped"
          description="Research, industry, and internships — across cloud platforms, data pipelines, and production services."
        />

        <div className="relative space-y-8">
          <div className="ui-timeline-line absolute top-0 left-[19px] hidden h-full w-px md:block" />

          {experience.map((job, i) => (
            <article key={i} className="ui-card relative p-6 md:ml-12 md:p-8">
              <div className="absolute -left-12 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-background md:flex">
                <span className="ui-timeline-dot" />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                  <p className="mt-1 text-muted">
                    {job.company} · {job.location}
                  </p>
                </div>
                <time className="shrink-0 text-sm text-muted">{job.period}</time>
              </div>

              <ul className="mt-5 space-y-3">
                {job.highlights.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="ui-timeline-dot mt-2 h-1.5 w-1.5 shrink-0 opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Tag key={tag} highlight={backendTags.has(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
