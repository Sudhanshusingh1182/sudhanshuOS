"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, X, Trophy } from "lucide-react";

const TILES = [
  { active: "bg-neon shadow-[0_0_32px_rgba(34,197,94,0.7)]", inactive: "bg-neon/10 border-neon/40" },
  { active: "bg-white shadow-[0_0_32px_rgba(255,255,255,0.4)]", inactive: "bg-white/10 border-white/30" },
  { active: "bg-neon shadow-[0_0_32px_rgba(34,197,94,0.7)]", inactive: "bg-neon/10 border-neon/40" },
  { active: "bg-white shadow-[0_0_32px_rgba(255,255,255,0.4)]", inactive: "bg-white/10 border-white/30" }
];

type Phase = "idle" | "showing" | "input" | "gameOver";

type MemoryGameProps = {
  onClose: () => void;
};

function getHighScore(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("neon-seq-high")) || 0;
}

function setHighScore(score: number) {
  if (typeof window === "undefined") return;
  const prev = getHighScore();
  if (score > prev) localStorage.setItem("neon-seq-high", String(score));
}

export function MemoryGame({ onClose }: MemoryGameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [hs, setHs] = useState(0);
  const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setHs(getHighScore()); }, []);

  const startGame = useCallback(() => {
    const first = Math.floor(Math.random() * 4);
    setSequence([first]);
    setPlayerIndex(0);
    setRound(1);
    setScore(0);
    setPhase("showing");
  }, []);

  useEffect(() => {
    if (phase !== "showing" || sequence.length === 0) return;

    let i = 0;
    setActiveTile(null);

    const interval = setInterval(() => {
      if (i > 0 && i <= sequence.length) setActiveTile(null);
      if (i >= sequence.length) {
        clearInterval(interval);
        setActiveTile(null);
        setPhase("input");
        setPlayerIndex(0);
        return;
      }
      setActiveTile(sequence[i]);
      i++;
    }, 550);

    return () => clearInterval(interval);
  }, [phase, sequence]);

  function handleTileClick(index: number) {
    if (phase !== "input") return;

    if (showTimeout.current) clearTimeout(showTimeout.current);
    setActiveTile(index);
    showTimeout.current = setTimeout(() => setActiveTile(null), 180);

    if (index !== sequence[playerIndex]) {
      const finalScore = score;
      setHighScore(finalScore);
      setHs(getHighScore());
      setPhase("gameOver");
      return;
    }

    const nextIndex = playerIndex + 1;
    setPlayerIndex(nextIndex);
    setScore(nextIndex);

    if (nextIndex === sequence.length) {
      const next = Math.floor(Math.random() * 4);
      setRound((r) => r + 1);
      setTimeout(() => {
        setSequence((prev) => [...prev, next]);
        setPhase("showing");
      }, 400);
    }
  }

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
          className="hud-panel relative w-full max-w-md p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-mono text-lg font-bold uppercase text-neon">Neon Sequence</h2>
              <p className="font-mono text-xs text-white/45">Round {round} &middot; Score {score}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/35">Best {hs}</span>
              <button onClick={onClose} className="text-white/50 hover:text-neon">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="mx-auto grid w-fit grid-cols-2 gap-3">
            {TILES.map((tile, i) => (
              <motion.button
                key={i}
                whileHover={phase === "input" ? { scale: 1.05 } : {}}
                whileTap={phase === "input" ? { scale: 0.95 } : {}}
                onClick={() => handleTileClick(i)}
                className={`h-28 w-28 rounded-lg border-2 transition-colors duration-100 sm:h-32 sm:w-32 ${
                  activeTile === i ? tile.active : tile.inactive
                }`}
                disabled={phase !== "input"}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            {phase === "idle" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="inline-flex items-center gap-2 border border-neon bg-neon px-6 py-3 font-mono text-sm font-bold uppercase text-black shadow-glow"
              >
                <Zap size={16} /> Start Game
              </motion.button>
            )}
            {phase === "showing" && (
              <p className="font-mono text-sm text-neon/80">
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  Watching sequence...
                </motion.span>
              </p>
            )}
            {phase === "input" && (
              <p className="font-mono text-sm text-white/50">Round {round} &mdash; repeat the pattern</p>
            )}
            {phase === "gameOver" && (
              <div>
                <p className="font-mono text-lg text-red-400">Signal Lost</p>
                <p className="mt-1 font-mono text-sm text-white/50">Score: {score}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="mt-3 inline-flex items-center gap-2 border border-neon px-6 py-2 font-mono text-sm font-bold uppercase text-neon"
                >
                  <Trophy size={16} /> Retry
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
