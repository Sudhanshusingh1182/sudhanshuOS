"use client";

import { Bot, Cpu, FolderArchive, Radio, Trophy, Wrench } from "lucide-react";

type CommandDockProps = {
  onTalk: () => void;
};

const links = [
  { href: "#world", label: "World", icon: Radio },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#projects", label: "Projects", icon: FolderArchive },
  { href: "#achievements", label: "Arena", icon: Trophy }
];

export function CommandDock({ onTalk }: CommandDockProps) {
  return (
    <nav aria-label="System command dock" className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="hud-panel flex items-center gap-1 p-2">
        <a className="grid h-11 w-11 place-items-center border border-neon/30 text-neon" href="#home" aria-label="Home">
          <Cpu size={18} />
        </a>
        {links.map((link) => (
          <a key={link.href} className="grid h-11 w-11 place-items-center border border-white/10 text-white/75 transition hover:border-neon hover:text-neon" href={link.href} aria-label={link.label}>
            <link.icon size={18} />
          </a>
        ))}
        <button className="grid h-11 w-11 place-items-center border border-neon bg-neon text-black" onClick={onTalk} aria-label="Open SudhanshuGPT">
          <Bot size={18} />
        </button>
      </div>
    </nav>
  );
}
