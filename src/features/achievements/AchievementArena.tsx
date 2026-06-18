"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function AchievementArena() {
  return (
    <SectionFrame id="achievements" eyebrow="Arena" title="Unlockable Achievements">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {portfolioConfig.achievements.map((achievement, index) => (
          <motion.article key={achievement.title} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="hud-panel p-4 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center border border-neon bg-neon/10 text-neon shadow-glow">
              <Trophy size={30} />
            </div>
            <h3 className="mt-4 font-mono text-lg font-bold uppercase">{achievement.title}</h3>
            <p className="mt-3 text-sm text-white/58">{achievement.description}</p>
            {achievement.date && <p className="mt-3 font-mono text-xs text-neon">{achievement.date}</p>}
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
