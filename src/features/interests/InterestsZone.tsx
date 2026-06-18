import { Cpu } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function InterestsZone() {
  return (
    <SectionFrame id="interests" eyebrow="Interests Zone" title="Collectible Focus Cards">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioConfig.interests.map((interest) => (
          <article key={interest.name} className="border border-neon/25 bg-panel/70 p-4 transition hover:border-neon hover:shadow-glow">
            <Cpu className="text-neon" size={20} />
            <h3 className="mt-4 font-bold">{interest.name}</h3>
            <p className="mt-2 text-sm text-white/55">{interest.signal}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
