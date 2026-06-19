"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio.config";
import { AIAssistant } from "@/features/assistant/AIAssistant";
import { GameHub } from "@/features/game/GameHub";
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
import { NetworkHub } from "@/features/social/NetworkHub";
import { AudioFeed } from "@/features/audio/AudioFeed";

const ParticleGrid = dynamic(() => import("@/components/ParticleGrid").then((module) => module.ParticleGrid), {
  ssr: false
});

export function HomeExperience() {
  const [booted, setBooted] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [gameHubOpen, setGameHubOpen] = useState(false);

  const buttons = [
    { label: "Talk To AI", onClick: () => setAssistantOpen(true) },
    { label: "View Resume", onClick: () => window.open(portfolioConfig.profile.resume.url, "_blank") },
    { label: "Play Games", onClick: () => setGameHubOpen(true) }
  ];

  return (
    <main className="scanlines min-h-screen overflow-x-hidden bg-void text-white">
      {!booted && <BootSequence onComplete={() => { window.scrollTo(0, 0); setBooted(true); }} />}
      <ParticleGrid />
      <NetworkHub />
      <CommandDock onTalk={() => setAssistantOpen(true)} />
      <AIAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
      {gameHubOpen && <GameHub onClose={() => setGameHubOpen(false)} />}

      <AnimatePresence>
        {!assistantOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 grid h-14 w-14 place-items-center border border-neon bg-neon text-black shadow-glow"
            onClick={() => setAssistantOpen(true)}
            whileHover={{ scale: 1.1, boxShadow: "0 0 32px rgba(34,197,94,0.5)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open SudhanshuGPT"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <section id="home" className="relative flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-70" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inline-flex h-full w-full rounded-full bg-neon"
                />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon sm:text-sm">System Online</p>
            </div>

            <h1 className="mt-4 max-w-4xl font-mono text-4xl font-black uppercase leading-tight neon-text sm:text-5xl md:text-6xl lg:text-7xl">
              SUDHANSHU OS
            </h1>
            <div className="mt-1 h-0.5 w-20 bg-neon/60 sm:w-24" />

            <p className="mt-5 max-w-2xl text-base text-white/82 sm:text-lg">{portfolioConfig.profile.title}</p>

            <div className="mt-8 hud-panel max-w-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60">mission.log</span>
                <span className="h-px flex-1 bg-neon/20" />
              </div>
              <p className="mt-3 text-base font-semibold leading-relaxed sm:text-xl">&quot;{portfolioConfig.profile.mission}&quot;</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {buttons.map((btn, i) => (
                <motion.button
                  key={btn.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={btn.onClick}
                  className="border border-neon/70 px-4 py-2.5 font-mono text-xs font-bold uppercase text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-glow sm:px-5 sm:py-3 sm:text-sm"
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>

          </div>
          <div className="flex flex-col gap-4">
            <CharacterDashboard />
            <AudioFeed />
          </div>
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
