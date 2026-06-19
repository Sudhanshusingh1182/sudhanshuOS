"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, TrendingUp, Users, Star, Activity, Cpu } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

/* ─── Icons ─── */
const P_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Code size={20} />,
  LeetCode: <TrendingUp size={20} />,
  Codeforces: <Users size={20} />,
  CodeChef: <Star size={20} />,
  AtCoder: <Activity size={20} />
};

/* ─── Config ─── */
interface OrbitConfig {
  radiusX: number; radiusY: number; speed: number; angle0: number;
}
const PROFILES = portfolioConfig.codingProfiles;
const ACHIEVEMENTS = portfolioConfig.achievements;
const ORBITS: OrbitConfig[] = [
  { radiusX: 180, radiusY: 130, speed: 0.003, angle0: 0 },
  { radiusX: 240, radiusY: 180, speed: 0.004, angle0: 72 },
  { radiusX: 290, radiusY: 220, speed: 0.002, angle0: 144 },
  { radiusX: 220, radiusY: 165, speed: 0.005, angle0: 216 },
  { radiusX: 310, radiusY: 240, speed: 0.003, angle0: 288 }
];

/* ─── Platform achievements map ─── */
const PLATFORM_ACHIEVEMENTS: Record<string, typeof ACHIEVEMENTS> = {
  GitHub: ACHIEVEMENTS.filter((a) => a.title.includes("Codeforces") || a.title.includes("Specialist")),
  LeetCode: ACHIEVEMENTS.filter((a) => a.title.includes("LeetCode") || a.title.includes("Knight")),
  Codeforces: ACHIEVEMENTS.filter((a) => a.title.includes("Codeforces") || a.title.includes("Pupil")),
  CodeChef: ACHIEVEMENTS.filter((a) => a.title.includes("CodeChef") || a.title.includes("Star")),
  AtCoder: []
};

/* ─── Animated counter ─── */
function AnimatedCount({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) obs.disconnect(); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    let s = 0; const step = Math.max(1, Math.ceil(num / 40));
    const iv = setInterval(() => { s += step; if (s >= num) { setDisplay(value); clearInterval(iv); } else setDisplay(String(s) + suffix); }, 25);
    return () => clearInterval(iv);
  }, [value, suffix]);
  return <span ref={ref}>{display}</span>;
}

/* ─── Platform achievements for focus mode ─── */
function getAchievements(platform: string) {
  const direct = PLATFORM_ACHIEVEMENTS[platform] || [];
  if (direct.length > 0) return direct;
  return ACHIEVEMENTS.filter((a) => platform === "GitHub" || a.title.includes("District") || a.title.includes("NPTEL"));
}

/* ─── Central Core ─── */
function CentralCore() {
  return (
    <div className="absolute" style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
      {/* Outer ring 1 */}
      <motion.div className="absolute rounded-full border border-neon/20"
        style={{ width: 180, height: 180, left: -90, top: -90 }}
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-8 bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      </motion.div>
      {/* Outer ring 2 */}
      <motion.div className="absolute rounded-full border border-dashed border-neon/10"
        style={{ width: 130, height: 130, left: -65, top: -65 }}
        animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-6 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent" />
      </motion.div>
      {/* Inner ring */}
      <motion.div className="absolute rounded-full border border-neon/30"
        style={{ width: 80, height: 80, left: -40, top: -40 }}
        animate={{ rotate: 360, scale: [1, 1.03, 1] }} transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-neon/40" />
      </motion.div>
      {/* Core glow */}
      <motion.div className="w-10 h-10 rounded-full bg-neon/20"
        style={{ boxShadow: "0 0 40px rgba(34,197,94,0.2)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <div className="absolute inset-0 rounded-full bg-neon/10 flex items-center justify-center">
          <Cpu size={18} className="text-neon" style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.6))" }} />
        </div>
      </motion.div>
      {/* Label */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center">
        <p className="font-mono text-xs font-bold text-neon whitespace-nowrap">Sudhanshu Singh</p>
        <p className="font-mono text-[8px] text-white/25 mt-0.5">Intelligence Core</p>
      </div>
    </div>
  );
}

/* ─── Orbiting Platform Node ─── */
function PlatformNode({
  profile, index, angle, active, hovered, onHover, onSelect
}: {
  profile: typeof PROFILES[0]; index: number; angle: number;
  active: boolean; hovered: boolean; onHover: () => void; onSelect: () => void;
}) {
  const orbit = ORBITS[index];
  const cx = 0, cy = 0;
  const px = cx + orbit.radiusX * Math.cos(angle);
  const py = cy + orbit.radiusY * Math.sin(angle);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${px}px - 22px)`,
        top: `calc(45% + ${py}px - 22px)`,
        width: 44, height: 44, zIndex: active ? 30 : 10
      }}
    >
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={onHover}
        onClick={onSelect}
        className={`relative grid w-full h-full place-items-center rounded-full border transition-all duration-300 ${
          active ? "border-neon bg-neon/15 shadow-[0_0_24px_rgba(34,197,94,0.3)]" :
          hovered ? "border-neon/60 bg-neon/8 shadow-[0_0_16px_rgba(34,197,94,0.15)]" :
          "border-white/15 bg-black/60 hover:border-neon/40"
        }`}
      >
        {P_ICONS[profile.platform] || <Star size={18} />}
        {/* Label */}
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/40 whitespace-nowrap">
          {profile.platform}
        </span>
      </motion.button>
    </motion.div>
  );
}

/* ─── Focus Detail Panel ─── */
function FocusPanel({ profile, onClose }: { profile: typeof PROFILES[0]; onClose: () => void }) {
  const achievements = getAchievements(profile.platform);
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[70 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg overflow-hidden mx-2 sm:mx-0"
          onClick={(e) => e.stopPropagation()}
          style={{
            border: "1px solid rgba(34,197,94,0.3)",
            background: "linear-gradient(145deg, rgba(16,20,16,0.98), rgba(5,5,5,0.99))",
            boxShadow: "0 0 60px rgba(34,197,94,0.12)"
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
          <div className="relative z-10 p-5 sm:p-8">
            <button onClick={onClose} className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/10 text-white/40 hover:border-neon hover:text-neon sm:right-4 sm:top-4 sm:h-9 sm:w-9">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center border border-neon/30 bg-neon/8 text-neon sm:h-14 sm:w-14" style={{ boxShadow: "0 0 24px rgba(34,197,94,0.15)" }}>
                {P_ICONS[profile.platform] || <Cpu size={22} />}
              </div>
              <div className="min-w-0">
                <h2 className="font-mono text-xl font-bold uppercase text-neon sm:text-2xl truncate">{profile.platform}</h2>
                <p className="font-mono text-xs text-white/50 mt-0.5 sm:text-sm truncate">{profile.username}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              <div className="border border-white/8 p-2.5 sm:p-3.5">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 sm:text-[9px]">Rating</p>
                <p className="mt-1 font-mono text-xl font-bold text-neon sm:text-2xl">{profile.rating}</p>
              </div>
              <div className="border border-white/8 p-2.5 sm:p-3.5">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 sm:text-[9px]">Rank</p>
                <p className="mt-1 font-mono text-xl font-bold text-white sm:text-2xl">{profile.rank}</p>
              </div>
              <div className="border border-white/8 p-2.5 sm:p-3.5">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 sm:text-[9px]">Status</p>
                <p className="mt-1 font-mono text-sm font-bold text-neon/80 sm:text-lg">Active</p>
              </div>
              <div className="border border-white/8 p-2.5 sm:p-3.5">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 sm:text-[9px]">Activity</p>
                <p className="mt-1 font-mono text-xs text-white/60 sm:text-sm">{profile.stats}</p>
              </div>
            </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mt-4 border-t border-white/5 pt-3 sm:mt-5 sm:pt-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-neon/50 mb-2 sm:text-[9px] sm:mb-3">Achievements</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {achievements.map((a) => (
                  <span key={a.title} className="border border-neon/20 bg-neon/5 px-2 py-0.5 font-mono text-[9px] text-neon/80 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {a.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          <motion.a href={profile.href} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-4 flex items-center justify-center gap-2 border border-neon bg-neon px-4 py-2.5 font-mono text-xs font-bold uppercase text-black transition-all duration-200 hover:shadow-glow sm:mt-6 sm:px-5 sm:py-3 sm:text-sm"
          >
            <ExternalLink size={14} /> Visit Profile
          </motion.a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */

export function CodingCommandCenter() {
  const [selected, setSelected] = useState<typeof PROFILES[0] | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [angles, setAngles] = useState(() => ORBITS.map((o) => o.angle0));
  const [orbitScale, setOrbitScale] = useState(1);

  useEffect(() => {
    if (selected) return;
    let frame: number;
    const tick = () => {
      setAngles((prev) => prev.map((a, i) => (a + ORBITS[i].speed) % (Math.PI * 2)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [selected]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setOrbitScale(mq.matches ? 0.5 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <SectionFrame id="arena" eyebrow="Coding Profiles" title="Intelligence Core">
      <p className="mb-6 font-mono text-[10px] text-white/35 text-center sm:text-xs">
        {hoveredIdx !== null
          ? `Scanning ${PROFILES[hoveredIdx].platform} — tap to inspect`
          : "Orbital intelligence hub · Hover to scan · Tap to inspect"}
      </p>

      <div className="relative w-full overflow-x-auto" style={{ minHeight: orbitScale < 1 ? 300 : 520 }}>
        <div className={`transition-all duration-500 ${selected ? 'opacity-5 pointer-events-none' : 'opacity-100'}`}
          style={{ transform: `scale(${orbitScale})`, transformOrigin: "top center", minHeight: orbitScale < 1 ? 600 : 520 }}>
          {/* Orbital path rings */}
          <svg className="absolute inset-0 w-full pointer-events-none" style={{ height: orbitScale < 1 ? 600 : 520, minHeight: orbitScale < 1 ? 600 : 520 }}>
            {ORBITS.map((o, i) => (
              <ellipse key={i} cx="50%" cy="45%" rx={o.radiusX} ry={o.radiusY}
                fill="none" stroke={hoveredIdx === i ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.06)"}
                strokeWidth={hoveredIdx === i ? 1 : 0.6} />
            ))}
          </svg>

          {/* Central Core */}
          <CentralCore />

          {/* Orbiting Platforms */}
          {PROFILES.map((profile, i) => (
            <PlatformNode
              key={profile.platform}
              profile={profile} index={i} angle={angles[i]}
              active={selected?.platform === profile.platform}
              hovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onSelect={() => { setSelected(profile); setHoveredIdx(null); }}
            />
          ))}

          {/* Floating particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} className="absolute h-0.5 w-0.5 rounded-full bg-neon/20 pointer-events-none"
              style={{ left: `${25 + Math.random() * 50}%`, top: `${20 + Math.random() * 50}%` }}
              animate={{ opacity: [0, 0.5, 0], y: [0, -30 - Math.random() * 40] }}
              transition={{ duration: 3 + Math.random() * 4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* Status footer */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-neon" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
          {hoveredIdx !== null ? `Linked — ${PROFILES[hoveredIdx].platform}` : "5 terminals orbiting · All systems nominal"}
        </span>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="h-1.5 w-1.5 rounded-full bg-neon" />
      </div>

      <AnimatePresence>
        {selected && <FocusPanel profile={selected} onClose={() => { setSelected(null); setHoveredIdx(null); }} />}
      </AnimatePresence>
    </SectionFrame>
  );
}
