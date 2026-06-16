import { education } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";

type EducationItem = (typeof education)[number];

export function Education() {
  return (
    <section id="education" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader label="Education" title="Academic background" />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <EducationCard key={item.school} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <article className="ui-card p-6">
      <h3 className="font-semibold text-foreground">{item.degree}</h3>
      <p className="mt-1 text-muted">
        {item.school} · {item.location}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-sm text-muted">{item.period}</time>
        {item.detail && (
          <span className="ui-tag ui-tag-highlight">{item.detail}</span>
        )}
      </div>
    </article>
  );
}
