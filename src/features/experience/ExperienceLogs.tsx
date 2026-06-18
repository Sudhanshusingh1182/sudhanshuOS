import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function ExperienceLogs() {
  return (
    <SectionFrame id="experience" eyebrow="Experience Logs" title="Mission History">
      <div className="space-y-5">
        {portfolioConfig.experience.map((item) => (
          <article key={`${item.company}-${item.year}`} className="hud-panel grid gap-4 p-5 md:grid-cols-[160px_1fr]">
            <div className="font-mono text-4xl font-black text-neon">{item.year}</div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">Quest Started</p>
              <h3 className="mt-2 text-2xl font-black">{item.role} at {item.company}</h3>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {item.objectives.map((objective) => (
                  <span key={objective} className="border-l border-neon pl-3 text-white/68">
                    {objective}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
