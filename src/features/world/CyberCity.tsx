"use client";

import { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

const R = 180;
const CX = 220;
const CY = 220;
const SVG_SIZE = 440;
const NODE_R = 22;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function CyberCity() {
  const [active, setActive] = useState(portfolioConfig.world.buildings[0]);
  const [angle, setAngle] = useState(0);
  const frameRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setScale(mq.matches ? 0.55 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      setAngle((a) => (a + ((now - last) * 0.04) % 360) % 360);
      last = now;
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const buildings = portfolioConfig.world.buildings;
  const segAngle = 360 / buildings.length;

  return (
    <SectionFrame id="world" eyebrow="Interactive Cyberpunk City" title="System Map">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] items-center">
        <div className="relative border border-neon/25 bg-black/40 overflow-hidden max-w-full"
          style={{ width: SVG_SIZE * scale, height: SVG_SIZE * scale }}>
          <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="absolute inset-0 w-full h-full">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth={1} />
            <circle cx={CX} cy={CY} r={R * 0.66} fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth={1} />
            <circle cx={CX} cy={CY} r={R * 0.33} fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth={1} />
            {buildings.map((_, i) => {
              const p = polar(CX, CY, R, i * segAngle);
              const p2 = polar(CX, CY, R * 0.85, i * segAngle);
              return (
                <line key={i} x1={p2.x} y1={p2.y} x2={p.x} y2={p.y} stroke="rgba(34,197,94,0.08)" strokeWidth={1} />
              );
            })}
            <line
              x1={CX} y1={CY}
              x2={polar(CX, CY, R + 20, angle).x}
              y2={polar(CX, CY, R + 20, angle).y}
              stroke="rgba(34,197,94,0.35)"
              strokeWidth={1.5}
            />
          </svg>

          <div className="absolute inset-0" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {buildings.map((b, i) => {
              const Icon = (Icons[b.icon] ?? Icons.Building2) as Icons.LucideIcon;
              const pos = polar(CX, CY, R, i * segAngle);
              const isActive = active.id === b.id;
              return (
                <motion.button
                  key={b.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, type: "spring", damping: 18, stiffness: 260 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActive(b)}
                  className="absolute z-10 grid place-items-center rounded-full border transition-all duration-300"
                  style={{
                    left: pos.x - NODE_R,
                    top: pos.y - NODE_R,
                    width: NODE_R * 2,
                    height: NODE_R * 2,
                    borderColor: isActive ? "rgba(34,197,94,0.8)" : "rgba(34,197,94,0.25)",
                    background: isActive ? "rgba(34,197,94,0.15)" : "rgba(0,0,0,0.6)",
                    boxShadow: isActive ? "0 0 20px rgba(34,197,94,0.25)" : "none",
                  }}
                >
                  <Icon size={18} className={isActive ? "text-neon" : "text-white/40"} />
                </motion.button>
              );
            })}

            <div
              className="absolute rounded-full border border-neon/20"
              style={{
                left: CX - 6, top: CY - 6, width: 12, height: 12,
                background: "rgba(34,197,94,0.15)",
                boxShadow: "0 0 12px rgba(34,197,94,0.2)",
              }}
            />
          </div>
        </div>

        <aside className="hud-panel p-4 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon">Sector Selected</p>
          <h3 className="mt-3 text-3xl font-black">{active.name}</h3>
          <p className="mt-2 text-neon">{active.section}</p>
          <p className="mt-5 text-white/68">{active.description}</p>
          <a
            className="mt-8 inline-block border border-neon bg-neon px-4 py-3 font-mono text-sm font-bold uppercase text-black"
            href={`#${active.id === "ai" ? "projects" : active.id}`}
          >
            Enter Sector
          </a>
        </aside>
      </div>
    </SectionFrame>
  );
}
