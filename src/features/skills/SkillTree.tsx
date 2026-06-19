"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";
import { Cpu, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

/* ─── Tree node type ─── */

type TreeNode = {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  children: TreeNode[];
  baseAngle: number;
  angularSpan: number;
  px: number;
  py: number;
  detail: string;
  levelValue: number;
  leafCount: number;
  _weight: number;
};

/* ─── Layout constants ─── */

const CX = 600;
const CY = 560;
const RADII = [0, 250, 420, 570];

/* ─── Node sizing ─── */

function nodeSize(n: TreeNode): { w: number; h: number; fs: number } {
  if (n.level === 0) return { w: 60, h: 60, fs: 0 };
  const len = n.name.length;
  if (n.level === 1) return { w: Math.max(72, len * 8 + 20), h: 36, fs: 11 };
  if (n.level === 2) return { w: Math.max(64, len * 7.5 + 18), h: 32, fs: 10 };
  return { w: Math.max(54, len * 7 + 16), h: 28, fs: 9 };
}

/* ─── Angular weight (space needed to avoid overlap) ─── */

function computeWeight(n: TreeNode): number {
  if (n.children.length === 0) {
    const w = nodeSize(n).w;
    return Math.max(1, (w + 28) / RADII[n.level]);
  }
  let total = 0;
  for (const c of n.children) { c._weight = computeWeight(c); total += c._weight; }
  n._weight = total;
  const self = nodeSize(n).w / RADII[n.level];
  return Math.max(total, self);
}

/* ─── Build tree from config ─── */

function buildTree(): TreeNode {
  const categories = portfolioConfig.skills;
  const root: TreeNode = {
    id: "root", name: "Engineering OS", level: 0, parentId: null,
    children: [], baseAngle: 0, angularSpan: Math.PI * 2,
    px: CX, py: CY, detail: "Connected knowledge graph", levelValue: 0, leafCount: 0, _weight: 0
  };
  for (const cat of categories) {
    const catN: TreeNode = {
      id: `c-${cat.title}`, name: cat.title, level: 1, parentId: "root",
      children: [], baseAngle: 0, angularSpan: 0, px: 0, py: 0,
      detail: `${cat.nodes.length} skill clusters`, levelValue: 0, leafCount: 0, _weight: 0
    };
    for (const sk of cat.nodes) {
      const skN: TreeNode = {
        id: `s-${cat.title}-${sk.name}`, name: sk.name, level: 2, parentId: catN.id,
        children: [], baseAngle: 0, angularSpan: 0, px: 0, py: 0,
        detail: sk.detail, levelValue: sk.level, leafCount: 0, _weight: 0
      };
      if (sk.children) {
        for (const sub of sk.children) {
          skN.children.push({
            id: `x-${cat.title}-${sk.name}-${sub.name}`, name: sub.name, level: 3, parentId: skN.id,
            children: [], baseAngle: 0, angularSpan: 0, px: 0, py: 0,
            detail: sub.detail, levelValue: sub.level, leafCount: 1, _weight: 0
          });
        }
      }
      skN.leafCount = Math.max(1, skN.children.length);
      catN.children.push(skN);
    }
    catN.leafCount = catN.children.reduce((s, c) => s + c.leafCount, 0);
    root.children.push(catN);
  }
  root.leafCount = root.children.reduce((s, c) => s + c.leafCount, 0);
  return root;
}

/* ─── Radial layout with overlap-safe weight distribution ─── */

function layoutNode(node: TreeNode, a0: number, a1: number) {
  if (node.level > 0) {
    node.baseAngle = (a0 + a1) / 2;
    node.angularSpan = a1 - a0;
    node.px = CX + RADII[node.level] * Math.cos(node.baseAngle);
    node.py = CY + RADII[node.level] * Math.sin(node.baseAngle);
  }
  if (node.children.length === 0) return;
  const total = node.children.reduce((s, c) => s + (c._weight || computeWeight(c)), 0);
  const available = a1 - a0;
  let cur = a0;
  const spans: number[] = [];
  let sumSpans = 0;
  for (const ch of node.children) {
    const w = nodeSize(ch).w;
    const minArc = (w + 20) / RADII[ch.level];
    const weightSpan = (available * (ch._weight || computeWeight(ch))) / total;
    const s = Math.max(minArc, weightSpan);
    spans.push(s);
    sumSpans += s;
  }
  const scale = available / sumSpans;
  for (let i = 0; i < node.children.length; i++) {
    const ch = node.children[i];
    const span = spans[i] * scale;
    layoutNode(ch, cur, cur + span);
    cur += span;
  }
}

const tree = buildTree();
computeWeight(tree);
layoutNode(tree, -Math.PI / 2, (3 * Math.PI) / 2);

/* ─── Flatten helpers ─── */

function flatten(n: TreeNode): TreeNode[] {
  const r: TreeNode[] = [n];
  for (const c of n.children) r.push(...flatten(c));
  return r;
}

function flatVisible(root: TreeNode, hidden: Set<string>): TreeNode[] {
  const r: TreeNode[] = [];
  function walk(n: TreeNode) {
    r.push(n);
    if (!hidden.has(n.id)) for (const c of n.children) walk(c);
  }
  walk(root);
  return r;
}

function edgesVisible(root: TreeNode, hidden: Set<string>): [TreeNode, TreeNode][] {
  const r: [TreeNode, TreeNode][] = [];
  function walk(n: TreeNode) {
    if (hidden.has(n.id)) return;
    for (const c of n.children) {
      r.push([n, c]);
      walk(c);
    }
  }
  walk(root);
  return r;
}

function subIds(node: TreeNode): Set<string> {
  const s = new Set<string>();
  const walk = (n: TreeNode) => { s.add(n.id); for (const c of n.children) walk(c); };
  walk(node); return s;
}

/* ─── Rotated position ─── */

function rotatePos(n: TreeNode, rot: number): { px: number; py: number } {
  if (n.level === 0) return { px: CX, py: CY };
  const a = n.baseAngle + rot;
  return { px: CX + RADII[n.level] * Math.cos(a), py: CY + RADII[n.level] * Math.sin(a) };
}

/* ─── Edge path from two points ─── */

function edgePath(ax: number, ay: number, bx: number, by: number): string {
  const dx = bx - ax, dy = by - ay;
  const d = Math.sqrt(dx * dx + dy * dy);
  const cp = d * 0.45;
  const a = Math.atan2(dy, dx);
  return `M${ax},${ay} Q${ax + cp * Math.cos(a)},${ay + cp * Math.sin(a)} ${bx},${by}`;
}

/* ─── Component ─── */

export function SkillTree() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [sc, setSc] = useState(1);
  const [drag, setDrag] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const [ready, setReady] = useState(false);
  const dragP = useRef({ x: 0, y: 0 });
  const dragO = useRef({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 200); return () => clearTimeout(t); }, []);

  const all = useMemo(() => flatten(tree), []);

  /* ─── Continuous rotation (pauses during focus) ─── */
  useEffect(() => {
    if (focusedId) return;
    let frame: number;
    const tick = () => {
      rotationRef.current = (rotationRef.current + 0.0008) % (Math.PI * 2);
      setRotation(rotationRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [focusedId]);

  const focusSet = useMemo(() => {
    if (!focusedId) return null;
    const n = all.find((x) => x.id === focusedId);
    return n ? subIds(n) : null;
  }, [focusedId, all]);

  const hidden = collapsed;

  const visibleNodeList = useMemo(() => {
    const v = flatVisible(tree, hidden);
    if (!focusSet) return v;
    return v.filter((n) => focusSet.has(n.id));
  }, [hidden, focusSet]);

  const visibleEdgeList = useMemo(() => {
    const e = edgesVisible(tree, hidden);
    if (!focusSet) return e;
    return e.filter(([s, t]) => focusSet.has(s.id) && focusSet.has(t.id));
  }, [hidden, focusSet]);

  const find = useCallback((id: string) => all.find((x) => x.id === id)!, [all]);
  const hovered = hoveredId && hoveredId !== "root" ? find(hoveredId) : null;

  const toggle = useCallback((id: string) => {
    setCollapsed((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  }, []);

  const doFocus = useCallback((id: string) => {
    if (focusedId === id) { setFocusedId(null); setTx(0); setTy(0); setSc(1); return; }
    const n = find(id); const c = box.current;
    if (c) {
      const pos = rotatePos(n, rotationRef.current);
      const r = c.getBoundingClientRect();
      setTx(r.width / 2 - pos.px * 1.8);
      setTy(r.height / 2 - pos.py * 1.8);
      setSc(1.8);
    }
    setFocusedId(id);
  }, [focusedId, find]);

  const reset = useCallback(() => { setFocusedId(null); setTx(0); setTy(0); setSc(1); }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const d = -e.deltaY * 0.001;
    setSc((s) => Math.max(0.3, Math.min(4, s * (1 + d))));
  }, []);

  const onDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDrag(true); dragP.current = { x: e.clientX, y: e.clientY }; dragO.current = { x: tx, y: ty };
  }, [tx, ty]);

  useEffect(() => {
    if (!drag) return;
    const move = (e: MouseEvent) => { setTx(dragO.current.x + e.clientX - dragP.current.x); setTy(dragO.current.y + e.clientY - dragP.current.y); };
    const up = () => setDrag(false);
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [drag]);

  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsMobile(!mq.matches);
    const h = () => setIsMobile(!mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "relative", minHeight: isMobile ? 400 : 760, width: "100%",
    overflow: "hidden", border: "1px solid rgba(34,197,94,0.15)", background: "rgba(0,0,0,0.4)",
    cursor: drag ? "grabbing" : "grab"
  };
  const innerStyle: React.CSSProperties = {
    position: "absolute", inset: 0,
    transform: `translate(${tx}px, ${ty}px) scale(${sc})`,
    transformOrigin: "0 0"
  };

  return (
    <SectionFrame id="skills" eyebrow="Engineering Workshop" title="Skill Knowledge Graph">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] text-white/40 sm:text-xs">
          {focusedId
            ? "Focus mode active — tap Reset to exit"
            : "Scroll to zoom · Drag to pan · Nodes rotate slowly · Tap to focus · Hover for details"}
        </p>
        <div className="flex gap-1">
          <button onClick={() => setSc((s) => Math.min(4, s * 1.3))} className="grid h-8 w-8 place-items-center border border-white/10 text-white/50 hover:border-neon hover:text-neon">
            <ZoomIn size={14} />
          </button>
          <button onClick={() => setSc((s) => Math.max(0.3, s / 1.3))} className="grid h-8 w-8 place-items-center border border-white/10 text-white/50 hover:border-neon hover:text-neon">
            <ZoomOut size={14} />
          </button>
          <button onClick={reset} className="grid h-8 w-8 place-items-center border border-white/10 text-white/50 hover:border-neon hover:text-neon">
            <Maximize2 size={14} />
          </button>
          {focusedId && (
            <button onClick={reset} className="border border-neon/30 px-2 font-mono text-[10px] text-neon hover:bg-neon hover:text-black sm:px-3 sm:text-[11px]">
              Reset
            </button>
          )}
        </div>
      </div>

      <div ref={box} style={containerStyle} onWheel={onWheel} onMouseDown={onDown}>
        <div style={innerStyle}>
          {/* SVG edges — computed with current rotation */}
          <svg width={1200} height={1120} className="pointer-events-none absolute left-0 top-0" style={{ display: "block" }}>
            {visibleEdgeList.map(([s, t]) => {
              const sp = rotatePos(s, rotation);
              const tp = rotatePos(t, rotation);
              const d = edgePath(sp.px, sp.py, tp.px, tp.py);
              const h = hoveredId === s.id || hoveredId === t.id;
              return (
                <g key={`e-${s.id}-${t.id}`}>
                  <motion.path d={d} fill="none" stroke={h ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.15)"} strokeWidth={h ? 2 : 1} strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={ready ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ delay: 0.02, duration: 0.4, ease: "easeOut" }}
                  />
                  {ready && (
                    <motion.path d={d} fill="none" stroke="rgba(34,197,94,0.35)" strokeWidth={1.2} strokeLinecap="round"
                      strokeDasharray="5 12"
                      animate={{ strokeDashoffset: [0, -34], opacity: h ? [0.7, 1] : [0.15, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {h && (
                    <motion.path d={d} fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth={5} strokeLinecap="round"
                      animate={{ opacity: [0.15, 0.4, 0.15] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes — positioned with current rotation */}
          {visibleNodeList.map((n) => {
            const pos = rotatePos(n, rotation);
            const { w, h, fs } = nodeSize(n);
            const isFocus = focusedId === n.id;
            const inFocus = !focusedId || (focusSet?.has(n.id) ?? true);
            const isHover = hoveredId === n.id;
            const hasKids = n.children.length > 0;
            const isCol = hidden.has(n.id);

            let bg = "border-white/10 bg-black/30";
            if (n.level === 0) bg = "border-neon/70 bg-neon/8";
            else if (n.level === 1) bg = "border-neon/40 bg-black/60";
            else if (n.level === 2) bg = "border-white/20 bg-black/50";
            if (isFocus) bg = "border-neon bg-neon/15 shadow-glow";
            else if (isHover) bg = "border-neon/60 bg-neon/8 shadow-[0_0_20px_rgba(34,197,94,0.15)]";

            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: inFocus ? 1 : 0.15,
                  scale: inFocus ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + n.level * 0.06,
                  type: "spring", damping: 22, stiffness: 200
                }}
                style={{
                  position: "absolute",
                  left: pos.px - w / 2,
                  top: pos.py - h / 2,
                  width: w, height: h,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 9999, border: "1px solid",
                  ...(isFocus ? { zIndex: 20 } : isHover ? { zIndex: 10 } : {}),
                  cursor: hasKids ? "pointer" : "default",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                className={bg}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => { if (hasKids) toggle(n.id); if (n.level > 0) doFocus(n.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); if (n.level > 0) doFocus(n.id); }}
              >
                {n.level === 0 ? (
                  <Cpu size={22} className="text-neon" style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.5))" }} />
                ) : (
                  <span style={{
                    fontFamily: "ui-monospace, monospace", fontWeight: 700,
                    fontSize: fs,
                    lineHeight: 1, color: n.level === 1 ? "rgba(34,197,94,1)" : n.level === 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                    textAlign: "center", padding: "0 4px",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    maxWidth: w - 8
                  }}>
                    {n.name}
                  </span>
                )}
                {hasKids && n.level > 0 && (
                  <div style={{
                    position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)",
                    width: 12, height: 12, borderRadius: "50%",
                    border: `1px solid ${isCol ? "rgba(34,197,94,0.4)" : "rgba(34,197,94,0.2)"}`,
                    background: isCol ? "rgba(34,197,94,0.2)" : "rgba(0,0,0,0.8)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 7, color: "rgba(34,197,94,1)", fontFamily: "monospace"
                  }}>
                    {isCol ? "+" : "\u2212"}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="mt-4 hud-panel p-3 sm:p-4"
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/60">
                  {hovered.level === 1 ? "Category" : hovered.level === 2 ? "Skill" : "Sub-skill"}
                </p>
                <h4 className="mt-1 font-mono text-sm font-bold text-white truncate">{hovered.name}</h4>
                {hovered.level >= 2 && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                    <span className="font-mono text-xs text-neon/70">{hovered.levelValue}%</span>
                  </div>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); doFocus(hovered.id); }}
                className="shrink-0 border border-neon/30 px-2 py-1 font-mono text-[10px] uppercase text-neon hover:bg-neon hover:text-black sm:px-3 sm:py-1.5"
              >
                Focus
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{hovered.detail}</p>
            {hovered.children.length > 0 && (
              <p className="mt-2 text-xs text-white/30">{hovered.children.length} child nodes</p>
            )}
            {hovered.level >= 2 && (
              <div className="mt-3 h-1 w-full border border-neon/15 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${hovered.levelValue}%` }} transition={{ duration: 0.5 }} className="h-full bg-neon/70" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}
