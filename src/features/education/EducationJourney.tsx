"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

export function EducationJourney() {
  const items = portfolioConfig.education;

  return (
    <SectionFrame id="education" eyebrow="Academic Path" title="Education Journey">
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neon/20 md:block" />

        <div className="space-y-8 md:space-y-0">
          {items.map((stage, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={stage.stage}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                className={`relative md:flex md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                  <div className={`hud-panel inline-block p-5 ${isLeft ? "" : "text-left"}`}>
                    <div className={`flex items-center gap-3 ${isLeft ? "flex-row-reverse" : ""}`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-neon/30 bg-neon/8 text-neon">
                        <GraduationCap size={18} />
                      </span>
                      <span className="font-mono text-xs text-white/40">{stage.year}</span>
                    </div>
                    <h3 className={`mt-3 text-lg font-black ${isLeft ? "" : ""}`}>{stage.stage}</h3>
                    <p className="mt-1 text-sm text-white/60">{stage.institution}</p>
                    <p className="mt-2 text-xs text-white/40 leading-relaxed">{stage.result}</p>
                  </div>
                </div>

                <div className="hidden md:flex md:w-12 md:shrink-0 md:justify-center">
                  <div className="relative z-10 mt-7 h-5 w-5 rounded-full border-2 border-neon bg-void shadow-[0_0_14px_rgba(34,197,94,0.25)]" />
                </div>

                <div className="md:hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-neon/30 bg-neon/8 text-neon">
                      <GraduationCap size={18} />
                    </span>
                    <span className="font-mono text-xs text-white/40">{stage.year}</span>
                  </div>
                  <div className="hud-panel p-5">
                    <h3 className="text-lg font-black">{stage.stage}</h3>
                    <p className="mt-1 text-sm text-white/60">{stage.institution}</p>
                    <p className="mt-2 text-xs text-white/40 leading-relaxed">{stage.result}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
