"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function CyberCity() {
  const [active, setActive] = useState(portfolioConfig.world.buildings[0]);

  return (
    <SectionFrame id="world" eyebrow="Interactive Cyberpunk City" title="Explore The Operating System">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <div className="city-depth grid min-h-[520px] grid-cols-2 items-end gap-4 border border-neon/25 bg-grid bg-[length:34px_34px] p-5 sm:grid-cols-4">
          {portfolioConfig.world.buildings.map((building, index) => {
            const Icon = (Icons[building.icon] ?? Icons.Building2) as Icons.LucideIcon;
            return (
              <motion.button
                key={building.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                onClick={() => setActive(building)}
                className="group flex flex-col justify-end border border-neon/30 bg-panel/80 p-3 text-left shadow-insetGlow transition hover:-translate-y-2 hover:border-neon hover:shadow-glow"
                style={{ height: `${180 + (index % 4) * 58}px` }}
              >
                <Icon className="mb-4 text-neon" size={28} />
                <span className="font-mono text-sm font-bold uppercase">{building.name}</span>
                <span className="mt-2 text-xs text-white/50">{building.section}</span>
              </motion.button>
            );
          })}
        </div>
        <aside className="hud-panel p-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon">Building Selected</p>
          <h3 className="mt-3 text-3xl font-black">{active.name}</h3>
          <p className="mt-2 text-neon">{active.section}</p>
          <p className="mt-5 text-white/68">{active.description}</p>
          <a className="mt-8 inline-block border border-neon bg-neon px-4 py-3 font-mono text-sm font-bold uppercase text-black" href={`#${active.id === "ai" ? "projects" : active.id}`}>
            Enter Building
          </a>
        </aside>
      </div>
    </SectionFrame>
  );
}
