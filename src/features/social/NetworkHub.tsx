"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const LINKS = [
  { id: "linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/sudhanshusingh3" },
  { id: "x", icon: Twitter, href: "https://x.com/SudhanshuS1182" },
];

export function NetworkHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-24 left-6 z-30 hidden items-center lg:flex"
    >
      <div className="flex items-center gap-0">
        {LINKS.map((link, i) => (
          <>
            <motion.div
              key={link.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.15, type: "spring", damping: 16, stiffness: 260 }}
            >
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-neon/30 bg-black/80 text-neon transition-all duration-300 hover:border-neon/70 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)]"
              >
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-neon shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <link.icon size={16} />
              </motion.a>
            </motion.div>
            {i < LINKS.length - 1 && (
              <svg key={`line-${i}`} width={20} height={2} className="mx-0">
                <motion.line
                  x1={0} y1={1} x2={20} y2={1}
                  stroke="rgba(34,197,94,0.25)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
                />
              </svg>
            )}
          </>
        ))}
      </div>
    </motion.div>
  );
}
