"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";
import type { Project } from "@/types/portfolio";

const filters: Array<Project["category"] | "All"> = ["All", "AI", "Backend", "Full Stack", "Open Source"];

export function ProjectArchive() {
  const [filter, setFilter] = useState<Project["category"] | "All">("All");
  const projects = filter === "All" ? portfolioConfig.projects : portfolioConfig.projects.filter((project) => project.category === filter);

  return (
    <SectionFrame id="projects" eyebrow="Project Archive" title="Mission Database">
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={item === filter ? "border border-neon bg-neon px-4 py-2 font-mono text-xs font-bold uppercase text-black" : "border border-neon/30 px-4 py-2 font-mono text-xs font-bold uppercase text-neon"}>
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.article key={project.name} whileHover={{ rotateX: 2, rotateY: -2, y: -4 }} className="hud-panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon">{project.category} Mission</p>
                <h3 className="mt-2 text-2xl font-black">{project.name}</h3>
              </div>
              <span className="border border-neon/40 px-3 py-1 font-mono text-xs text-neon">{project.status}</span>
            </div>
            <p className="mt-4 text-white/65">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/70">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <span key={feature} className="border-l border-neon pl-3 text-sm text-white/65">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-sm text-neon">Difficulty: {project.difficulty}</span>
              <div className="flex gap-2">
                <a href={project.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center border border-white/15 hover:border-neon" aria-label={`${project.name} GitHub`}>
                  <Github size={17} />
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center border border-neon bg-neon text-black" aria-label={`${project.name} live demo`}>
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
