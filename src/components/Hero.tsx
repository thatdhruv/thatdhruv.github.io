import { features } from "@/config/features";
import { heroStack, personal } from "@/data/portfolio";
import { HeroChart } from "./HeroChart";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="ui-hero-bg relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="ui-hero-glow-1" />
      <div className="ui-hero-glow-2" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="max-w-3xl animate-fade-up">
            <p className="ui-kicker">{personal.title}</p>
            <h1 className="ui-hero-title">
              {personal.name.split(" ")[0]}{" "}
              <span className="ui-hero-accent">Trivedi</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {personal.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className="ui-btn-primary">
                View Projects
              </a>
              <a
                href={personal.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn-secondary"
              >
                Resume
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <MailIcon />
                {personal.email}
              </a>
              <span className="flex items-center gap-2">
                <LocationIcon />
                {personal.location}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {heroStack.map((skill) => (
                <span key={skill} className="ui-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {features.heroChart ? (
            <HeroChart />
          ) : features.heroVisual ? (
            <HeroVisual />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}
