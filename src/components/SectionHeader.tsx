interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <p className="ui-kicker">{label}</p>
      <h2 className="ui-section-title">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
