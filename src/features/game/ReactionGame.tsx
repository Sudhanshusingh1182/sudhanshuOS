"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, X, Trophy } from "lucide-react";

type Phase = "waiting" | "ready" | "go" | "result";

type ReactionGameProps = {
  onClose: () => void;
};

function getBest(): number | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem("reaction-best");
  return v ? Number(v) : null;
}

function setBest(ms: number) {
  if (typeof window === "undefined") return;
  const prev = getBest();
  if (prev === null || ms < prev) localStorage.setItem("reaction-best", String(Math.round(ms)));
}

export function ReactionGame({ onClose }: ReactionGameProps) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [time, setTime] = useState<number | null>(null);
  const [best, setBestState] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const goTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTime = useRef<number>(0);

  useEffect(() => { setBestState(getBest()); }, []);

  const startRound = useCallback(() => {
    setTime(null);
    setPhase("waiting");
    const delay = 1000 + Math.random() * 2500;
    goTimer.current = setTimeout(() => {
      setPhase("go");
      startTime.current = performance.now();
    }, delay);
  }, []);

  function handleClick() {
    if (phase === "waiting") {
      if (goTimer.current) clearTimeout(goTimer.current);
      setPhase("ready");
      return;
    }
    if (phase === "ready") {
      startRound();
      return;
    }
    if (phase === "go") {
      const elapsed = performance.now() - startTime.current;
      setTime(elapsed);
      setAttempts((prev) => [...prev, elapsed]);
      setBest(elapsed);
      setPhase("result");
      return;
    }
    if (phase === "result") {
      startRound();
    }
  }

  const avg = attempts.length > 0 ? attempts.reduce((a, b) => a + b, 0) / attempts.length : null;

  const screenClass =
    phase === "waiting"
      ? "bg-white/5 border-white/20 text-white/50"
      : phase === "ready"
        ? "bg-red-900/30 border-red-400/50 text-red-300"
        : phase === "go"
          ? "bg-neon/10 border-neon text-neon"
          : "bg-white/5 border-white/20 text-white/50";

  const screenLabel =
    phase === "waiting"
      ? "Wait for green..."
      : phase === "ready"
        ? "Too soon! Click to retry"
        : phase === "go"
          ? "CLICK NOW!"
          : "";

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
              <h2 className="font-mono text-lg font-bold uppercase text-neon">Reaction Protocol</h2>
              <p className="font-mono text-xs text-white/45">Test your reflexes</p>
            </div>
            <div className="flex items-center gap-3">
              {best !== null && <span className="font-mono text-xs text-white/35">Best {Math.round(best)}ms</span>}
              <button onClick={onClose} className="text-white/50 hover:text-neon">
                <X size={20} />
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleClick}
            className={`flex h-48 w-full items-center justify-center border-2 transition-colors duration-150 ${screenClass}`}
          >
            {phase === "result" ? (
              <div className="text-center">
                <p className="font-mono text-5xl font-bold text-neon">{time ? Math.round(time) : 0}<span className="text-2xl">ms</span></p>
                <p className="mt-2 font-mono text-xs text-white/45">Click to retry</p>
              </div>
            ) : (
              <p className="font-mono text-lg">{screenLabel}</p>
            )}
          </motion.button>

          {attempts.length > 0 && (
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex gap-4 text-xs font-mono text-white/45">
                <span>Rounds: {attempts.length}</span>
                {avg !== null && <span>Avg: {Math.round(avg)}ms</span>}
                {best !== null && <span>Best: {Math.round(best)}ms</span>}
              </div>
              <button
                onClick={() => { setAttempts([]); setBestState(null); startRound(); }}
                className="font-mono text-xs text-white/35 hover:text-neon"
              >
                Reset
              </button>
            </div>
          )}

          {phase === "waiting" && attempts.length === 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={startRound}
                className="inline-flex items-center gap-2 border border-neon bg-neon px-6 py-3 font-mono text-sm font-bold uppercase text-black shadow-glow"
              >
                <Zap size={16} /> Start Test
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
