import type { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function SectionFrame({ id, eyebrow, title, children }: SectionFrameProps) {
  return (
    <section id={id} className="relative px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 border-b border-neon/25 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{eyebrow}</p>
            <h2 className="mt-2 font-mono text-3xl font-black uppercase sm:text-4xl">{title}</h2>
          </div>
          <div className="h-px w-full bg-neon/50 sm:w-48" />
        </div>
        {children}
      </div>
    </section>
  );
}
