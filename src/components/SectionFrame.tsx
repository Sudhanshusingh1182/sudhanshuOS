"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function SectionFrame({ id, eyebrow, title, children }: SectionFrameProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8 flex flex-col gap-3 border-b border-neon/25 pb-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{eyebrow}</p>
            <h2 className="mt-2 font-mono text-3xl font-black uppercase sm:text-4xl">{title}</h2>
          </div>
          <div className="h-px w-full bg-neon/50 sm:w-48" />
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
}
