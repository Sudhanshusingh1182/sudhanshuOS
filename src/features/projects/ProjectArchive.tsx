"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Search } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";
import type { Project } from "@/types/portfolio";

const categories: Array<"All" | Project["category"]> = ["All", "AI", "Backend", "Full Stack", "Frontend"];

function ProjectCard({ project, index, total, selected, onSelect }: {
  project: Project;
  index: number;
  total: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const angle = (index / total) * 360;
  const radius = 120 + (index % 5) * 20;
  const zOffset = (index % 7) * 15 - 45;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.5, type: "spring", damping: 22, stiffness: 200 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateX: 3,
        rotateY: -3,
        transition: { duration: 0.3 }
      }}
      onClick={onSelect}
      className="group cursor-pointer"
      style={{ perspective: "800px" }}
    >
      <div
        className="hud-panel relative overflow-hidden p-4 transition-all duration-300 group-hover:border-neon group-hover:shadow-glow sm:p-5"
        style={{
          transform: `rotateX(${Math.sin(angle * Math.PI / 180) * 2}deg) rotateY(${Math.cos(angle * Math.PI / 180) * 2}deg) translateZ(${zOffset}px)`
        }}
      >
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-neon/10 opacity-0 transition-all duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 60px rgba(34,197,94,0.08)" }} />
        <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon/70">{project.category}</p>
            <h3 className="mt-2 text-lg font-black sm:text-xl lg:text-2xl truncate">{project.name}</h3>
          </div>
          <span className={`shrink-0 border px-2 py-1 font-mono text-[10px] sm:px-3 sm:py-1 sm:text-xs ${
            project.status === "Completed" ? "border-neon/40 text-neon" :
            project.status === "In Progress" ? "border-yellow-600/40 text-yellow-500" :
            "border-white/20 text-white/50"
          }`}>
            {project.status}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/60 line-clamp-2 sm:text-sm">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="border border-white/8 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/60 sm:px-2 sm:text-[11px]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] text-white/30 sm:text-[11px]">+{project.technologies.length - 4}</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between sm:mt-4">
          <span className="font-mono text-[10px] text-neon/60 sm:text-xs">{project.difficulty}</span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <a href={project.github} target="_blank" rel="noreferrer" className="grid h-7 w-7 place-items-center border border-white/15 text-white/50 hover:border-neon hover:text-neon sm:h-8 sm:w-8" aria-label={`${project.name} GitHub`}>
              <Github size={13} />
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="grid h-7 w-7 place-items-center border border-neon/50 text-neon hover:bg-neon hover:text-black sm:h-8 sm:w-8" aria-label={`${project.name} demo`}>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ExpandedProject({ project, onClose }: { project: Project; onClose: () => void }) {
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
        layoutId={project.name}
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="hud-panel relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/15 text-white/50 hover:border-neon hover:text-neon sm:right-4 sm:top-4 sm:h-9 sm:w-9">
          <X size={16} />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon/70 sm:text-xs">{project.category}</p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">{project.name}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className={`border px-2 py-1 font-mono text-[10px] sm:px-3 sm:text-xs ${
            project.status === "Completed" ? "border-neon/40 text-neon" :
            project.status === "In Progress" ? "border-yellow-600/40 text-yellow-500" :
            "border-white/20 text-white/50"
          }`}>
            {project.status}
          </span>
          <span className="font-mono text-[10px] text-white/40 sm:text-xs">{project.difficulty}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/70 sm:mt-5">{project.description}</p>
        <div className="mt-5 sm:mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60 mb-2 sm:text-xs">Technology Stack</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="border border-neon/25 bg-neon/5 px-2 py-1 text-xs text-neon/80 sm:px-3 sm:text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60 mb-2 sm:text-xs">Key Features</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <span key={feature} className="flex items-start gap-2 text-xs text-white/65 sm:text-sm">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-neon/60" />
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-white/20 px-4 py-2.5 font-mono text-xs text-white hover:border-neon hover:text-neon sm:px-5 sm:py-3 sm:text-sm">
            <Github size={14} /> View Source
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-neon bg-neon px-4 py-2.5 font-mono text-xs font-bold text-black hover:shadow-glow sm:px-5 sm:py-3 sm:text-sm">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectArchive() {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = portfolioConfig.projects;

  const filtered = useMemo(() => {
    let result = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filter, search, projects]);

  return (
    <SectionFrame id="projects" eyebrow="Projects" title="Project Archive">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`border px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase transition-all duration-200 sm:px-4 sm:py-2 sm:text-xs ${
                item === filter
                  ? "border-neon bg-neon text-black shadow-glow"
                  : "border-neon/20 text-neon/70 hover:border-neon/50 hover:text-neon"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/10 bg-transparent py-2 pl-9 pr-3 font-mono text-xs text-white placeholder:text-white/20 focus:border-neon/50 focus:outline-none sm:w-56 sm:text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="font-mono text-sm text-white/30">No projects match your search.</p>
        </div>
      ) : (
        <div className="relative" style={{ perspective: "1200px" }}>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                total={filtered.length}
                selected={selected?.name === project.name}
                onSelect={() => setSelected(project)}
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <ExpandedProject project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}
