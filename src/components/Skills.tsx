import { skillCategories } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

export function Skills() {
  const highlighted = skillCategories.filter((c) => c.highlight);
  const rest = skillCategories.filter((c) => !c.highlight);

  return (
    <section id="skills" className="ui-section-alt border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Skills"
          title="Full-stack, systems-first"
          description="Backend, data, and cloud are the foundation — with solid frontend and mobile skills to ship complete products."
        />

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {highlighted.map((category) => (
            <div key={category.title} className="ui-card ui-card-highlight p-6 md:p-8">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill} highlight>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((category) => (
            <div key={category.title} className="ui-card p-6">
              <h3 className="mb-4 font-medium text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
