"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionFrame } from "@/components/SectionFrame";
import { portfolioConfig } from "@/data/portfolio.config";

/* ─── Types ─── */
type Line = { type: "system" | "input" | "output" | "prompt" | "boot" | "success" | "error"; text: string };
type Step = "idle" | "ask_name" | "ask_email" | "ask_subject" | "ask_message" | "confirm" | "sending" | "done";

const CMD_BOOT = [
  { type: "boot" as const, text: "[  OK  ] Initializing SudhanshuOS terminal v2.1.4" },
  { type: "boot" as const, text: "[  OK  ] Loading kernel modules..." },
  { type: "boot" as const, text: "[  OK  ] Establishing secure channel" },
  { type: "boot" as const, text: "[  OK  ] Terminal ready." },
  { type: "system" as const, text: "" },
  { type: "system" as const, text: "Type `help` for commands or `contact` to reach Sudhanshu." }
];

const HELP = [
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "  Available commands:" },
  { type: "output" as const, text: "    help      — Show this message" },
  { type: "output" as const, text: "    clear     — Clear terminal" },
  { type: "output" as const, text: "    resume    — Open resume (new tab)" },
  { type: "output" as const, text: "    linkedin  — Open LinkedIn (new tab)" },
  { type: "output" as const, text: "    github    — Open GitHub (new tab)" },
  { type: "output" as const, text: "    contact   — Start contact conversation" },
  { type: "output" as const, text: "    whoami    — Display identity" },
  { type: "output" as const, text: "" }
];

/* ─── Component ─── */
export function ContactTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [bootDone, setBootDone] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", subject: "", message: "" });
  const [suggestions, setSuggestions] = useState<string[]>(["help", "contact"]);
  const [errorMsg, setErrorMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootIdx = useRef(0);

  const addLines = (newLines: Line[]) => setLines((p) => [...p, ...newLines]);
  const autoScroll = useRef(false);
  const bootStarted = useRef(false);

  /* ─── Boot sequence ─── */
  useEffect(() => {
    if (bootDone || bootStarted.current) return;
    bootStarted.current = true;
    let idx = 0;
    const iv = setInterval(() => {
      if (idx < CMD_BOOT.length) {
        setLines((p) => [...p, CMD_BOOT[idx]]);
        idx++;
      } else {
        clearInterval(iv);
        setBootDone(true);
      }
    }, 180);
    return () => clearInterval(iv);
  }, [bootDone]);

  /* ─── Auto-scroll (only after first user action) ─── */
  useEffect(() => {
    if (autoScroll.current) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* ─── Focus input when boot done ─── */
  useEffect(() => { if (bootDone) inputRef.current?.focus({ preventScroll: true }); }, [bootDone]);

  /* ─── Handle commands ─── */
  const processCommand = (cmd: string) => {
    autoScroll.current = true;
    const t = cmd.trim().toLowerCase();
    if (t === "clear") {
      setLines([]);
      setSuggestions(["help", "contact"]);
      setStep("idle");
      setContactData({ name: "", email: "", subject: "", message: "" });
      setErrorMsg("");
      return;
    }

    addLines([{ type: "input", text: `$ ${cmd}` }]);
    if (t === "help") { addLines(HELP); return; }
    if (t === "whoami") {
      addLines([{ type: "output", text: "  Sudhanshu Singh · Software Engineer & Competitive Programmer" }]);
      return;
    }
    if (t === "resume") { window.open(portfolioConfig.profile.resume.url, "_blank"); addLines([{ type: "output", text: "  Opening resume..." }]); return; }
    if (t === "linkedin") { window.open("https://www.linkedin.com/in/sudhanshusingh3", "_blank"); addLines([{ type: "output", text: "  Opening LinkedIn..." }]); return; }
    if (t === "github") { window.open("https://github.com/Sudhanshusingh1182", "_blank"); addLines([{ type: "output", text: "  Opening GitHub..." }]); return; }
    if (t === "contact") {
      setStep("ask_name");
      setContactData({ name: "", email: "", subject: "", message: "" });
      setSuggestions([]);
      addLines([{ type: "output", text: "" }, { type: "output", text: "  ── Contact Initiated ──" }, { type: "system", text: "  What's your name?" }]);
      return;
    }
    addLines([{ type: "error", text: `  Unknown command: ${t}. Type 'help' for available commands.` }]);
  };

  /* ─── Submit contact to API ─── */
  const submitContact = async () => {
    setStep("sending");
    addLines([{ type: "system", text: "  Sending message..." }]);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Honeypot": "" },
        body: JSON.stringify(contactData)
      });
      if (!r.ok) {
        const errBody = await r.json().catch(() => ({}));
        throw new Error(errBody?.error || `Server error ${r.status}`);
      }
      setStep("done");
      addLines([
        { type: "success", text: "  ✓ Message delivered successfully." },
        { type: "system", text: "  Sudhanshu will get back to you soon." },
        { type: "system", text: "" },
        { type: "system", text: "  Type `help` for commands." }
      ]);
      setSuggestions(["help"]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      const hint = msg || "Transmission failed. Please try again.";
      setErrorMsg(hint);
      setStep("ask_name");
      addLines([{ type: "error", text: `  ✗ ${hint}` }]);
      addLines([{ type: "system", text: "  What's your name?" }]);
    }
  };

  /* ─── Handle submit ─── */
  const handleSubmit = () => {
    if (step === "sending") return;
    if (step !== "idle") autoScroll.current = true;
    const val = input.trim();
    if (!val) return;
    setInput("");

    if (step === "idle" || step === "done") {
      processCommand(val);
      return;
    }

    if (step === "ask_name") {
      setContactData((p) => ({ ...p, name: val }));
      setStep("ask_email");
      addLines([{ type: "input", text: `  > ${val}` }, { type: "system", text: "  What's your email?" }]);
      return;
    }
    if (step === "ask_email") {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        addLines([{ type: "error", text: "  Invalid email format. Try again." }]);
        return;
      }
      setContactData((p) => ({ ...p, email: val }));
      setStep("ask_subject");
      addLines([{ type: "input", text: `  > ${val}` }, { type: "system", text: "  Subject?" }]);
      return;
    }
    if (step === "ask_subject") {
      setContactData((p) => ({ ...p, subject: val }));
      setStep("ask_message");
      addLines([{ type: "input", text: `  > ${val}` }, { type: "system", text: "  Your message?" }]);
      return;
    }
    if (step === "ask_message") {
      setContactData((p) => ({ ...p, message: val }));
      setStep("confirm");
      addLines([{ type: "input", text: `  > ${val}` }, { type: "system", text: "  Confirm? (yes/no)" }]);
      return;
    }
    if (step === "confirm") {
      if (val.toLowerCase() === "yes" || val.toLowerCase() === "y") {
        addLines([{ type: "input", text: `  > ${val}` }]);
        submitContact();
      } else {
        setStep("idle");
        setContactData({ name: "", email: "", subject: "", message: "" });
        setSuggestions(["help", "contact"]);
        addLines([{ type: "input", text: `  > ${val}` }, { type: "system", text: "  Contact aborted. Type `help` for commands." }]);
      }
      return;
    }
  };

  /* ─── Handle key ─── */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (step === "sending") return;
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <SectionFrame id="contact" eyebrow="Get In Touch" title="Terminal">
      <div className="w-full"
        style={{
          border: "1px solid rgba(34,197,94,0.2)",
          background: "rgba(5,5,5,0.85)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)"
        }}
      >
        {/* Terminal bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5"
          style={{ background: "rgba(34,197,94,0.03)" }}>
          <div className="border border-red-500/30 w-2.5 h-2.5 rounded-full bg-red-500/10" />
          <div className="border border-yellow-500/30 w-2.5 h-2.5 rounded-full bg-yellow-500/10" />
          <div className="border border-neon/30 w-2.5 h-2.5 rounded-full bg-neon/10" />
          <span className="ml-2 font-mono text-[9px] tracking-widest text-white/20 uppercase">contact.sh</span>
        </div>

        {/* Terminal body */}
        <div className="relative min-h-[220px] overflow-y-auto p-3 font-mono text-[10px] leading-relaxed sm:min-h-[280px] sm:p-4 sm:text-xs"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(34,197,94,0.2) transparent" }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => {
            let cls = "text-white/80";
            if (l.type === "boot") cls = "text-neon/60";
            if (l.type === "system") cls = "text-white/40";
            if (l.type === "input") cls = "text-neon font-bold";
            if (l.type === "output") cls = "text-white/60";
            if (l.type === "error") cls = "text-red-400";
            if (l.type === "success") cls = "text-neon";
            if (l.type === "prompt") cls = "text-neon";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }} className={cls}>
                {l.text}
              </motion.div>
            );
          })}

          {/* Input area */}
          {bootDone && (
            <div className="mt-1 flex items-center">
              {step === "sending" ? (
                <span className="text-neon mr-2">
                  <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>⟐</motion.span>
                </span>
              ) : (
                <span className="text-neon mr-2">$</span>
              )}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setErrorMsg(""); }}
                onKeyDown={onKeyDown}
                disabled={step === "sending"}
                className="flex-1 bg-transparent outline-none border-none text-white/90 font-mono text-xs caret-neon disabled:cursor-not-allowed"
                placeholder={step === "idle" ? "Type a command..." : step === "sending" ? "" : "Type your response..."}
                autoComplete="off"
                spellCheck={false}
                readOnly={step === "sending"}
              />
            </div>
          )}

          {/* Error message */}
          {errorMsg && (
            <div className="mt-2 text-red-400/70 text-[10px]">{errorMsg}</div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="mt-3 text-center font-mono text-[10px] text-white/20">
        Secure channel · End-to-end encrypted
      </div>
    </SectionFrame>
  );
}
