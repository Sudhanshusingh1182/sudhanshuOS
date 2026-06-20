import { Cpu } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function InterestsZone() {
  return (
    <SectionFrame id="interests" eyebrow="Interests" title="Areas of Interest">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioConfig.interests.map((interest) => (
          <article key={interest.name} className="border border-neon/25 bg-panel/70 p-3 transition hover:border-neon hover:shadow-glow sm:p-4">
            <Cpu className="text-neon" size={18} />
            <h3 className="mt-3 font-bold text-sm sm:mt-4 sm:text-base">{interest.name}</h3>
            <p className="mt-1.5 text-xs text-white/55 sm:mt-2 sm:text-sm">{interest.signal}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
