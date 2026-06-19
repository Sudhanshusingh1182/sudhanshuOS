"use client";

import { motion } from "framer-motion";
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

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

export function CommandDock({ onTalk }: CommandDockProps) {
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="System command dock"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="hud-panel flex items-center gap-0.5 p-1.5 sm:gap-1 sm:p-2">
        <motion.a
          variants={item}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="grid h-9 w-9 place-items-center border border-neon/30 text-neon transition-shadow duration-200 hover:shadow-[0_0_16px_rgba(34,197,94,0.2)] sm:h-11 sm:w-11"
          href="#home"
          aria-label="Home"
        >
          <Cpu size={16} />
        </motion.a>
        {links.map((link) => (
          <motion.a
            key={link.href}
            variants={item}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-9 w-9 place-items-center border border-white/10 text-white/75 transition-all duration-200 hover:border-neon hover:text-neon hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] sm:h-11 sm:w-11"
            href={link.href}
            aria-label={link.label}
          >
            <link.icon size={16} />
          </motion.a>
        ))}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="grid h-9 w-9 place-items-center border border-neon bg-neon text-black transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(34,197,94,0.35)] sm:h-11 sm:w-11"
          onClick={onTalk}
          aria-label="Open SudhanshuGPT"
        >
          <Bot size={16} />
        </motion.button>
      </div>
    </motion.nav>
  );
}
