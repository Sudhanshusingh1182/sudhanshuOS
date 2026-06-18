import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        panel: "#101010",
        neon: "#22C55E"
      },
      boxShadow: {
        glow: "0 0 28px rgba(34, 197, 94, 0.28)",
        insetGlow: "inset 0 0 24px rgba(34, 197, 94, 0.12)"
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Cascadia Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "Segoe UI", "sans-serif"]
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(34,197,94,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
