"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolio.config";

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lineCount, setLineCount] = useState(0);
  const lines = ["BOOTING SUDHANSHU OS...", "Loading Modules...", ...portfolioConfig.bootModules.map((item) => `✓ ${item}`), "SYSTEM ONLINE"];

  useEffect(() => {
    if (lineCount >= lines.length) {
      const done = window.setTimeout(onComplete, 550);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setLineCount((count) => count + 1), 260);
    return () => window.clearTimeout(timer);
  }, [lineCount, lines.length, onComplete]);

  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-void" exit={{ opacity: 0 }}>
      <div className="hud-panel w-[min(92vw,720px)] p-6 font-mono">
        <div className="mb-4 flex items-center justify-between border-b border-neon/30 pb-3">
          <span className="text-neon">SUDHANSHUOS/BOOT</span>
          <span className="text-white/50">v1.0</span>
        </div>
        <div className="min-h-72 space-y-3">
          {lines.slice(0, lineCount).map((line) => (
            <p key={line} className={line === "SYSTEM ONLINE" ? "text-neon neon-text" : "text-white/85"}>
              {line}
            </p>
          ))}
          <span className="inline-block h-5 w-3 animate-pulse bg-neon" />
        </div>
      </div>
    </motion.div>
  );
}
