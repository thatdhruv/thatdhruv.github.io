import { personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {personal.name}</p>
        <p className="text-xs">Houston, TX</p>
      </div>
    </footer>
  );
}
