"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = { x: number; y: number };

const GRID = 20;
const CELL = 16;
const TICK = 140;

const INITIAL_SNAKE: Cell[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Cell = { x: 15, y: 10 };

function randomFood(snake: Cell[]): Cell {
  let f: Cell;
  do {
    f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
}

type NeonSnakeProps = { onClose: () => void };

export function NeonSnake({ onClose }: NeonSnakeProps) {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Cell>(INITIAL_FOOD);
  const [dir, setDir] = useState<Direction>("RIGHT");
  const [nextDir, setNextDir] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const dirRef = useRef(dir);
  const nextDirRef = useRef(nextDir);

  useEffect(() => { dirRef.current = dir; }, [dir]);
  useEffect(() => { nextDirRef.current = nextDir; }, [nextDir]);

  const start = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDir("RIGHT");
    setNextDir("RIGHT");
    setScore(0);
    setGameOver(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    gameRef.current = setInterval(() => {
      setSnake((prev) => {
        const d = nextDirRef.current;
        dirRef.current = d;
        setDir(d);
        const head = prev[prev.length - 1];
        const next: Cell = { x: head.x, y: head.y };
        if (d === "UP") next.y -= 1;
        if (d === "DOWN") next.y += 1;
        if (d === "LEFT") next.x -= 1;
        if (d === "RIGHT") next.x += 1;
        if (next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID) {
          setPlaying(false);
          setGameOver(true);
          return prev;
        }
        if (prev.some((s) => s.x === next.x && s.y === next.y)) {
          setPlaying(false);
          setGameOver(true);
          return prev;
        }
        const ate = next.x === food.x && next.y === food.y;
        const nsnake = [...prev, next];
        if (!ate) nsnake.shift();
        if (ate) {
          setFood(randomFood(nsnake));
          setScore((s) => s + 1);
        }
        return nsnake;
      });
    }, TICK);
    return () => clearInterval(gameRef.current);
  }, [playing, food]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!playing) return;
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d !== "DOWN") setNextDir("UP");
      if (e.key === "ArrowDown" && d !== "UP") setNextDir("DOWN");
      if (e.key === "ArrowLeft" && d !== "RIGHT") setNextDir("LEFT");
      if (e.key === "ArrowRight" && d !== "LEFT") setNextDir("RIGHT");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
            <h2 className="font-mono text-lg font-bold uppercase text-neon">Neon Snake</h2>
            <p className="font-mono text-xs text-white/45">Score: {score}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-neon">
            <X size={20} />
          </button>
        </div>

        <div
          className="relative border border-neon/30"
          style={{ width: GRID * CELL, height: GRID * CELL }}
        >
          {snake.map((s, i) => (
            <div
              key={`${s.x}-${s.y}-${i}`}
              className="absolute bg-neon"
              style={{
                left: s.x * CELL,
                top: s.y * CELL,
                width: CELL - 1,
                height: CELL - 1,
                opacity: i === snake.length - 1 ? 1 : 0.5 + (i / snake.length) * 0.5,
                boxShadow: i === snake.length - 1 ? "0 0 6px rgba(34,197,94,0.6)" : "none",
              }}
            />
          ))}
          <div
            className="absolute bg-neon/30"
            style={{
              left: food.x * CELL,
              top: food.y * CELL,
              width: CELL - 1,
              height: CELL - 1,
              boxShadow: "0 0 8px rgba(34,197,94,0.3)",
            }}
          />
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
            <p className="font-mono text-lg text-red-400">GAME OVER · Score: {score}</p>
            <button
              onClick={start}
              className="flex items-center gap-2 border border-neon/70 px-5 py-3 font-mono text-sm font-bold uppercase text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-glow"
            >
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        )}

        {playing && (
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">Arrow Keys</p>
            <div className="flex items-center gap-1">
              <div className="grid h-6 w-6 place-items-center border border-white/10 text-white/30"><ArrowUp size={12} /></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="grid h-6 w-6 place-items-center border border-white/10 text-white/30"><ArrowLeft size={12} /></div>
              <div className="grid h-6 w-6 place-items-center border border-white/10 text-white/30"><ArrowDown size={12} /></div>
              <div className="grid h-6 w-6 place-items-center border border-white/10 text-white/30"><ArrowRight size={12} /></div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
