"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio.config";
import { clamp } from "@/lib/utils";

export function CharacterDashboard() {
  const { profile } = portfolioConfig;

  return (
    <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hud-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-neon">Character Profile</p>
          <h2 className="mt-2 text-3xl font-black">{profile.name}</h2>
          <p className="text-white/60">{profile.className}</p>
        </div>
        <div className="grid h-16 w-16 place-items-center border border-neon bg-neon/10 text-neon shadow-glow">
          <Shield size={30} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-white/10 p-3">
          <p className="text-xs uppercase text-white/45">Level</p>
          <p className="font-mono text-3xl text-neon">{profile.level}</p>
        </div>
        <div className="border border-white/10 p-3">
          <p className="text-xs uppercase text-white/45">XP Sync</p>
          <p className="font-mono text-3xl text-neon">{profile.xp}%</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{stat.label}</span>
              <span className="font-mono text-neon">{stat.value}</span>
            </div>
            <div className="h-2 border border-neon/30 bg-black">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${clamp(stat.value)}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full bg-neon shadow-glow" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 border border-neon/25 p-3 text-sm text-white/70">
        <Sparkles className="text-neon" size={18} />
        Mission alignment: Backend + AI + Product Impact.
      </div>
    </motion.aside>
  );
}
