"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio.config";
import { clamp } from "@/lib/utils";

export function CharacterDashboard() {
  const { profile } = portfolioConfig;

  return (
    <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hud-panel p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-neon sm:text-xs">Profile</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl truncate">{profile.name}</h2>
          <p className="text-sm text-white/60 sm:text-base">{profile.className}</p>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center border border-neon bg-neon/10 text-neon shadow-glow sm:h-16 sm:w-16">
          <Shield size={22} />
        </div>
      </div>
      <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <div className="mb-1 flex justify-between text-xs sm:mb-2 sm:text-sm">
              <span>{stat.label}</span>
              <span className="font-mono text-neon text-xs sm:text-sm">{stat.value}</span>
            </div>
            <div className="h-2 border border-neon/30 bg-black">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${clamp(stat.value)}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full bg-neon shadow-glow" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 border border-neon/25 p-2.5 text-xs text-white/70 sm:mt-6 sm:p-3 sm:text-sm">
        <Sparkles className="text-neon shrink-0" size={16} />
        Focus: Backend Systems, AI, and Product Engineering.
      </div>
    </motion.aside>
  );
}
