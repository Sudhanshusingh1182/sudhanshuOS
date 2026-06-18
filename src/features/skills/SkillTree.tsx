"use client";

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

export function SkillTree() {
  return (
    <SectionFrame id="skills" eyebrow="Engineering Workshop" title="RPG Skill Tree">
      <div className="grid gap-5 lg:grid-cols-5">
        {portfolioConfig.skills.map((category) => (
          <div key={category.title} className="hud-panel p-4">
            <h3 className="font-mono text-lg font-bold uppercase text-neon">{category.title}</h3>
            <div className="mt-5 space-y-4">
              {category.nodes.map((node, index) => (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="group relative border border-neon/25 bg-black/60 p-3 hover:border-neon hover:shadow-glow"
                  title={node.detail}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{node.name}</span>
                    <span className="font-mono text-xs text-neon">{node.level}%</span>
                  </div>
                  <div className="mt-3 h-1 border border-neon/20">
                    <div className="h-full bg-neon" style={{ width: `${node.level}%` }} />
                  </div>
                  <p className="mt-3 hidden text-xs text-white/55 group-hover:block">{node.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
