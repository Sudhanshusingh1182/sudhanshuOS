"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw } from "lucide-react";

type Asteroid = { id: number; x: number; y: number; size: number; speed: number };

const W = 320;
const H = 480;
const PLAYER_W = 36;
const PLAYER_H = 14;
const PLAYER_Y = H - 40;

type AsteroidDodgeProps = { onClose: () => void };

export function AsteroidDodge({ onClose }: AsteroidDodgeProps) {
  const [playerX, setPlayerX] = useState(W / 2 - PLAYER_W / 2);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const speedRef = useRef(1);
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const idRef = useRef(0);
  const playerXRef = useRef(playerX);
  const aliveRef = useRef(true);

  useEffect(() => { playerXRef.current = playerX; }, [playerX]);

  const start = useCallback(() => {
    setPlayerX(W / 2 - PLAYER_W / 2);
    setAsteroids([]);
    setScore(0);
    setGameOver(false);
    speedRef.current = 1;
    aliveRef.current = true;
    lastSpawnRef.current = 0;
    idRef.current = 0;
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPlayerX((x) => Math.max(0, x - 6));
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPlayerX((x) => Math.min(W - PLAYER_W, x + 6));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let scoreAcc = 0;

    const loop = (now: number) => {
      if (!aliveRef.current) return;
      const dt = Math.min((now - last) / 16, 3);
      last = now;

      speedRef.current += 0.0004 * dt;
      scoreAcc += 1 * dt;

      if (now - lastSpawnRef.current > Math.max(300, 800 - scoreAcc * 2)) {
        lastSpawnRef.current = now;
        idRef.current += 1;
        setAsteroids((prev) => [
          ...prev,
          {
            id: idRef.current,
            x: Math.random() * (W - 24),
            y: -24,
            size: 10 + Math.random() * 14,
            speed: 1.5 + Math.random() * 2,
          },
        ]);
      }

      setAsteroids((prev) => {
        const moved = prev
          .map((a) => ({ ...a, y: a.y + a.speed * speedRef.current * dt }))
          .filter((a) => a.y < H + 20);

        if (aliveRef.current) {
          const px = playerXRef.current;
          const hit = moved.some(
            (a) =>
              a.y + a.size > PLAYER_Y &&
              a.y < PLAYER_Y + PLAYER_H &&
              a.x + a.size > px &&
              a.x < px + PLAYER_W
          );
          if (hit) {
            aliveRef.current = false;
            setPlaying(false);
            setGameOver(true);
          }
        }

        return moved;
      });

      setScore(Math.floor(scoreAcc));
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing]);

  return (
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
        className="hud-panel relative flex flex-col items-center gap-5 p-6"
      >
        <div className="flex w-full items-center justify-between">
          <div>
            <h2 className="font-mono text-lg font-bold uppercase text-neon">Asteroid Dodge</h2>
            <p className="font-mono text-xs text-white/45">Score: {Math.floor(score)}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-neon">
            <X size={20} />
          </button>
        </div>

        <div
          className="relative overflow-hidden border border-neon/30 bg-black/60"
          style={{ width: W, height: H }}
        >
          {asteroids.map((a) => (
            <div
              key={a.id}
              className="absolute rounded-full border border-neon/50 bg-neon/10"
              style={{
                left: a.x,
                top: a.y,
                width: a.size,
                height: a.size,
                boxShadow: "0 0 6px rgba(34,197,94,0.2)",
              }}
            />
          ))}
          <div
            className="absolute bg-neon"
            style={{
              left: playerX,
              top: PLAYER_Y,
              width: PLAYER_W,
              height: PLAYER_H,
              boxShadow: "0 0 8px rgba(34,197,94,0.4)",
              clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)",
            }}
          />
          {!playing && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">[ Press Start ]</span>
            </div>
          )}
        </div>

        {!playing && !gameOver && (
          <button
            onClick={start}
            className="border border-neon/70 px-5 py-3 font-mono text-sm font-bold uppercase text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-glow"
          >
            Start Game
          </button>
        )}

        {gameOver && (
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-lg text-red-400">DESTROYED · Score: {Math.floor(score)}</p>
            <button
              onClick={start}
              className="flex items-center gap-2 border border-neon/70 px-5 py-3 font-mono text-sm font-bold uppercase text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-glow"
            >
              <RotateCcw size={16} /> Retry
            </button>
          </div>
        )}

        {playing && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">← → or A / D to move</p>
        )}
      </motion.div>
    </motion.div>
  );
}
