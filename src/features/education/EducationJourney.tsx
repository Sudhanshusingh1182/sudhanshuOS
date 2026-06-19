"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, MapPin, ChevronRight } from "lucide-react";
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

function MilestoneDot({ active }: { active: boolean }) {
  return (
    <div className="relative">
      <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
        active ? "border-neon bg-neon shadow-[0_0_16px_rgba(34,197,94,0.4)]" : "border-neon/30 bg-void"
      }`} />
      {active && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -inset-1.5 rounded-full border border-neon/30"
        />
      )}
    </div>
  );
}

function EducationCard({ stage, index, isLeft }: {
  stage: typeof portfolioConfig.education[0];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className={`relative md:flex md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className={`hud-panel relative overflow-hidden p-5 transition-all duration-300 hover:border-neon/60 hover:shadow-glow ${isLeft ? "" : "text-left"}`}
        >
          <div className={`flex items-center gap-3 ${isLeft ? "flex-row-reverse" : ""}`}>
            <div className="relative shrink-0">
              <div className="grid h-10 w-10 place-items-center border border-neon/30 bg-neon/8 text-neon">
                <GraduationCap size={18} />
              </div>
            </div>
            <span className="font-mono text-xs text-white/40">{stage.year}</span>
          </div>
          <h3 className="mt-3 text-lg font-black">{stage.stage}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin size={12} className="text-white/30 shrink-0" />
            <p className="text-sm text-white/60">{stage.institution}</p>
          </div>
          <p className="mt-2 text-xs text-white/40 leading-relaxed">{stage.result}</p>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {stage.achievements.map((ach) => (
              <span key={ach} className="flex items-center gap-1 border border-neon/20 px-1.5 py-0.5 text-[10px] text-neon/70 sm:px-2">
                <Award size={9} /> {ach}
              </span>
            ))}
          </div>

          <div className="mt-3 border-t border-neon/10 pt-3">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">Highlights</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-4">
              {stage.highlights.map((h) => (
                <span key={h} className="flex items-center gap-1 text-[10px] text-white/50 sm:text-[11px]">
                  <ChevronRight size={9} className="text-neon/40 shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex md:w-12 md:shrink-0 md:justify-center">
        <MilestoneDot active={index === 0} />
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="grid h-10 w-10 place-items-center border border-neon/30 bg-neon/8 text-neon">
              <GraduationCap size={18} />
            </div>
            <MilestoneDot active={index === 0} />
          </div>
          <span className="font-mono text-xs text-white/40">{stage.year}</span>
        </div>
        <motion.div
          whileHover={{ y: -2 }}
          className="hud-panel p-4 transition-all duration-300 hover:border-neon/60 hover:shadow-glow sm:p-5"
        >
          <h3 className="text-base font-black sm:text-lg">{stage.stage}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin size={12} className="text-white/30 shrink-0" />
            <p className="text-xs text-white/60 sm:text-sm">{stage.institution}</p>
          </div>
          <p className="mt-2 text-xs text-white/40 leading-relaxed">{stage.result}</p>
          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {stage.achievements.map((ach) => (
              <span key={ach} className="flex items-center gap-1 border border-neon/20 px-1.5 py-0.5 text-[10px] text-neon/70 sm:px-2">
                <Award size={9} /> {ach}
              </span>
            ))}
          </div>
          <div className="mt-3 border-t border-neon/10 pt-3">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">Highlights</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-4">
              {stage.highlights.map((h) => (
                <span key={h} className="flex items-center gap-1 text-[10px] text-white/50 sm:text-[11px]">
                  <ChevronRight size={9} className="text-neon/40 shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EducationJourney() {
  const items = portfolioConfig.education;

  return (
    <SectionFrame id="education" eyebrow="Academic Path" title="Knowledge Journey">
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-neon/30 via-neon/15 to-transparent md:block" />
        <div className="absolute left-1/2 top-0 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-neon bg-neon/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] md:block" />

        <div className="space-y-8 md:space-y-0">
          {items.map((stage, i) => (
            <EducationCard key={stage.stage} stage={stage} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
