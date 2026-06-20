"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code, Briefcase, GitBranch, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

function DetailRow({ icon, label, items }: { icon: React.ReactNode; label: string; items: string[] }) {
  return (
    <div className="mt-4 border-t border-neon/10 pt-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-neon/70">{icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60">{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="border border-neon/20 px-2 py-0.5 text-xs text-neon/70">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceLogs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <SectionFrame id="experience" eyebrow="Experience" title="Experience Timeline">
      <div className="relative">
        <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-neon/40 via-neon/20 to-transparent" />

        <div className="space-y-8">
          {portfolioConfig.experience.map((item, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <motion.div
                key={`${item.company}-${item.year}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={itemVariants}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                className="relative pl-12"
              >
                <motion.div
                  animate={{ scale: isExpanded ? 1.3 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[11px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-neon bg-void shadow-[0_0_16px_rgba(34,197,94,0.3)]"
                />
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-[7px] top-[-2px] h-[26px] w-[26px] rounded-full border border-neon/40 shadow-[0_0_24px_rgba(34,197,94,0.2)]"
                  />
                )}

                <motion.div
                  layout
                  className="hud-panel overflow-hidden p-4 transition-all duration-300 hover:border-neon/60 hover:shadow-glow sm:p-5"
                >
                  <div className="mb-3 flex items-center gap-2 sm:gap-3">
                    <span className="font-mono text-[10px] border border-neon/30 px-2 py-1 text-neon sm:text-xs">{item.year}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className="grid h-7 w-7 shrink-0 place-items-center border border-white/10 text-white/40 hover:border-neon/40 hover:text-neon"
                    >
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-black sm:text-2xl">{item.role}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Briefcase size={12} className="text-neon/60 shrink-0" />
                        <p className="font-mono text-xs text-neon/80 sm:text-sm">{item.company}</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm">{item.summary}</p>

                  <div className="mt-3 grid gap-1.5 sm:mt-4 sm:grid-cols-2 sm:gap-2">
                    {item.objectives.map((obj) => (
                      <span key={obj} className="flex items-start gap-2 text-xs text-white/65 sm:text-sm">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-neon/50" />
                        {obj}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                          <DetailRow
                            icon={<Code size={12} />}
                            label="Skills Learned"
                            items={item.skills}
                          />
                          <DetailRow
                            icon={<GitBranch size={12} />}
                            label="Projects Worked On"
                            items={item.projects}
                          />
                          <DetailRow
                            icon={<Sparkles size={12} />}
                            label="Key Contributions"
                            items={item.contributions}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
