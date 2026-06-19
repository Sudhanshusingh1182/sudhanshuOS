"use client";

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export function ExperienceLogs() {
  return (
    <SectionFrame id="experience" eyebrow="Career Logs" title="Experience Timeline">
      <div className="relative">
        <div className="absolute left-[19px] top-0 h-full w-px bg-neon/30" />

        <div className="space-y-10">
          {portfolioConfig.experience.map((item, i) => (
            <motion.div
              key={`${item.company}-${item.year}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={itemVariants}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              className="relative pl-12"
            >
              <div className="absolute left-[11px] top-1.5 h-4 w-4 rounded-full border-2 border-neon bg-void shadow-[0_0_12px_rgba(34,197,94,0.3)]" />
              <div className="hud-panel p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs border border-neon/30 px-2 py-1 text-neon">{item.year}</span>
                  <span className="h-px flex-1 bg-neon/20" />
                </div>
                <h3 className="text-2xl font-black">{item.role}</h3>
                <p className="mt-1 font-mono text-sm text-neon/70">{item.company}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.objectives.map((obj) => (
                    <span key={obj} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-neon/50" />
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
