import { GraduationCap } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function EducationJourney() {
  return (
    <SectionFrame id="education" eyebrow="Education Center" title="Unlocked Stages">
      <div className="grid gap-4 md:grid-cols-3">
        {portfolioConfig.education.map((stage) => (
          <article key={stage.stage} className="hud-panel p-5">
            <GraduationCap className="text-neon" size={28} />
            <p className="mt-4 font-mono text-sm uppercase text-neon">{stage.stage}</p>
            <h3 className="mt-2 text-xl font-black">{stage.institution}</h3>
            <p className="mt-3 text-white/62">{stage.result}</p>
            <p className="mt-4 font-mono text-xs text-white/45">{stage.year}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
