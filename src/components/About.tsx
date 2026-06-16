import { about } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="About"
          title="Building systems that scale"
          description="Full-stack engineer with depth in distributed systems, data pipelines, and cloud infrastructure."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="ui-card p-6">
      <p className="ui-stat-value">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
