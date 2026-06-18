"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { portfolioConfig } from "@/data/portfolio.config";
import { AIAssistant } from "@/features/assistant/AIAssistant";
import { BootSequence } from "@/features/boot/BootSequence";
import { CharacterDashboard } from "@/features/rpg/CharacterDashboard";
import { SkillTree } from "@/features/skills/SkillTree";
import { CyberCity } from "@/features/world/CyberCity";
import { AchievementArena } from "@/features/achievements/AchievementArena";
import { ProjectArchive } from "@/features/projects/ProjectArchive";
import { CodingCommandCenter } from "@/features/coding/CodingCommandCenter";
import { ExperienceLogs } from "@/features/experience/ExperienceLogs";
import { EducationJourney } from "@/features/education/EducationJourney";
import { InterestsZone } from "@/features/interests/InterestsZone";
import { ContactTerminal } from "@/features/contact/ContactTerminal";
import { CommandDock } from "@/components/CommandDock";

const ParticleGrid = dynamic(() => import("@/components/ParticleGrid").then((module) => module.ParticleGrid), {
  ssr: false
});

export function HomeExperience() {
  const [booted, setBooted] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <main className="scanlines min-h-screen overflow-x-hidden bg-void text-white">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <ParticleGrid />
      <CommandDock onTalk={() => setAssistantOpen(true)} />
      <AIAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />

      <section id="home" className="relative flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-70" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-neon">System Online</p>
            <h1 className="mt-4 max-w-4xl font-mono text-5xl font-black uppercase leading-tight neon-text sm:text-7xl">
              SUDHANSHU OS v1.0
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/82">{portfolioConfig.profile.title}</p>
            <div className="mt-8 hud-panel max-w-2xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon">Current Mission</p>
              <p className="mt-3 text-2xl font-semibold">&quot;{portfolioConfig.profile.mission}&quot;</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="border border-neon bg-neon px-5 py-3 font-mono text-sm font-bold uppercase text-black shadow-glow" href="#world">
                Enter System
              </a>
              <button className="border border-neon/70 px-5 py-3 font-mono text-sm font-bold uppercase text-neon" onClick={() => setAssistantOpen(true)}>
                Talk To AI
              </button>
              <a
                className="border border-neon/70 px-5 py-3 font-mono text-sm font-bold uppercase text-neon"
                href={portfolioConfig.profile.resume.url}
                download
              >
                Download Resume
              </a>
              <a className="border border-white/20 px-5 py-3 font-mono text-sm font-bold uppercase text-white" href="#world">
                Explore World
              </a>
            </div>
          </div>
          <CharacterDashboard />
        </div>
      </section>

      <CyberCity />
      <SkillTree />
      <ProjectArchive />
      <AchievementArena />
      <CodingCommandCenter />
      <ExperienceLogs />
      <EducationJourney />
      <InterestsZone />
      <ContactTerminal />
    </main>
  );
}
