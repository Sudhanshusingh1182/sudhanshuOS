"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Star, Sparkles, Medal, X } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

const icons = [Trophy, Award, Star, Medal, Sparkles, Award];

function AchievementCard({ achievement, index, onSelect }: {
  achievement: typeof portfolioConfig.achievements[0];
  index: number;
  onSelect: () => void;
}) {
  const Icon = icons[index % icons.length];
  const colors = ["from-neon/30 to-neon/5", "from-yellow-500/30 to-yellow-500/5", "from-blue-500/30 to-blue-500/5", "from-purple-500/30 to-purple-500/5", "from-cyan-500/30 to-cyan-500/5", "from-emerald-500/30 to-emerald-500/5"];

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4, type: "spring", damping: 20 }}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateX: 4,
        rotateY: -4,
        transition: { duration: 0.3 }
      }}
      onClick={onSelect}
      className="group cursor-pointer"
      style={{ perspective: "600px" }}
    >
        <div className="hud-panel relative overflow-hidden p-4 text-center transition-all duration-300 group-hover:border-neon group-hover:shadow-glow sm:p-5">
          <div className={`absolute inset-0 bg-gradient-to-b ${colors[index]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
          <div className="relative z-10">
            <div className="relative mx-auto grid h-16 w-16 place-items-center sm:h-20 sm:w-20">
            <div className="absolute inset-0 rounded-full border border-neon/20 group-hover:border-neon/50 transition-all duration-300" />
            <div className="absolute inset-2 rounded-full border border-neon/10 group-hover:border-neon/30 transition-all duration-300" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-neon/10"
            />
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", damping: 10 }}
              className="grid place-items-center"
            >
              <Icon size={24} className="text-neon drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
            </motion.div>
          </div>
          <h3 className="mt-5 font-mono text-base font-bold uppercase sm:text-lg">{achievement.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-white/55 line-clamp-2">{achievement.description}</p>
          {achievement.date && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-neon/60">{achievement.date}</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ExpandedAchievement({ achievement, index, onClose }: {
  achievement: typeof portfolioConfig.achievements[0];
  index: number;
  onClose: () => void;
}) {
  const Icon = icons[index % icons.length];
  const IconBg = [Trophy, Award, Star, Medal, Sparkles, Award][index % 6];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0, rotateX: 5 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.85, y: 30, opacity: 0, rotateX: 5 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="hud-panel relative max-w-lg w-full p-5 text-center sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/15 text-white/50 hover:border-neon hover:text-neon sm:right-4 sm:top-4 sm:h-9 sm:w-9">
          <X size={16} />
        </button>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-neon/30 bg-neon/5 shadow-[0_0_40px_rgba(34,197,94,0.15)] sm:h-28 sm:w-28">
          <IconBg size={32} className="text-neon drop-shadow-[0_0_16px_rgba(34,197,94,0.6)] sm:size-12" />
        </div>
        <h2 className="mt-4 font-mono text-xl font-bold uppercase sm:mt-6 sm:text-2xl">{achievement.title}</h2>
        {achievement.date && (
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60 sm:mt-2 sm:text-xs">Unlocked {achievement.date}</p>
        )}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent sm:mt-6" />
        <p className="mt-4 text-xs leading-relaxed text-white/70 sm:mt-6 sm:text-sm">{achievement.description}</p>
        <div className="mt-6 flex justify-center gap-2 sm:mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-1.5 w-1.5 rounded-full bg-neon/40"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AchievementArena() {
  const [selected, setSelected] = useState<{ achievement: typeof portfolioConfig.achievements[0]; index: number } | null>(null);

  return (
    <SectionFrame id="achievements" eyebrow="Arena" title="Trophy Hall">
      <p className="mb-6 font-mono text-xs text-white/40">Unlocked achievements — click to inspect</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {portfolioConfig.achievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.title}
            achievement={achievement}
            index={index}
            onSelect={() => setSelected({ achievement, index })}
          />
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <ExpandedAchievement
            achievement={selected.achievement}
            index={selected.index}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}
