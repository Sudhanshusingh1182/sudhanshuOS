"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gamepad2, Asterisk } from "lucide-react";
import { NeonSnake } from "@/features/game/NeonSnake";
import { AsteroidDodge } from "@/features/game/AsteroidDodge";

type GameId = "snake" | "dodge" | null;

type GameHubProps = {
  onClose: () => void;
};

const games = [
  {
    id: "snake" as const,
    title: "Neon Snake",
    description: "Steer the serpent. Eat. Grow. Survive. Classic arcade with a cyberpunk twist.",
    icon: Gamepad2,
    difficulty: "Medium"
  },
  {
    id: "dodge" as const,
    title: "Asteroid Dodge",
    description: "Dodge falling debris. Speed increases over time. How long can you last?",
    icon: Asterisk,
    difficulty: "Hard"
  }
];

export function GameHub({ onClose }: GameHubProps) {
  const [activeGame, setActiveGame] = useState<GameId>(null);

  if (activeGame === "snake") return <NeonSnake onClose={() => setActiveGame(null)} />;
  if (activeGame === "dodge") return <AsteroidDodge onClose={() => setActiveGame(null)} />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="hud-panel relative w-full max-w-2xl p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-mono text-lg font-bold uppercase text-neon">Game Hub</h2>
              <p className="font-mono text-xs text-white/45">Select a game to play</p>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-neon">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((game, i) => (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", damping: 20, stiffness: 300 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveGame(game.id)}
                className="hud-panel group flex flex-col items-start gap-3 p-5 text-left transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(34,197,94,0.2)]"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center border border-neon/30 bg-neon/8 text-neon group-hover:bg-neon group-hover:text-black transition-colors duration-300">
                    <game.icon size={22} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 border border-white/10 px-2 py-1">
                    {game.difficulty}
                  </span>
                </div>
                <h3 className="mt-2 font-mono text-sm font-bold uppercase text-white group-hover:text-neon transition-colors duration-300">
                  {game.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">{game.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
