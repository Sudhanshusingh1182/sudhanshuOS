"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function CodingCommandCenter() {
  return (
    <SectionFrame id="arena" eyebrow="Coding Profiles" title="Command Center Rankings">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {portfolioConfig.codingProfiles.map((profile, i) => (
          <motion.a
            key={profile.platform}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -6, scale: 1.02 }}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            className="hud-panel block p-4 transition-shadow duration-200 hover:border-neon hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg font-bold uppercase text-neon">{profile.platform}</h3>
              <ExternalLink size={16} className="text-white/30" />
            </div>
            <p className="mt-4 text-2xl font-black">{profile.username}</p>
            <p className="mt-3 text-sm text-white/60">{profile.stats}</p>
            <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
              <span className="border border-white/10 p-2 text-white/55">Rating<br /><b className="text-neon">{profile.rating}</b></span>
              <span className="border border-white/10 p-2 text-white/55">Rank<br /><b className="text-neon">{profile.rank}</b></span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionFrame>
  );
}
