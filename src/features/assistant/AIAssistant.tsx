"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio.config";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIAssistantProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AIAssistant({ open, onOpenChange }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: portfolioConfig.assistant.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed })
      });
      const result = (await response.json()) as { answer?: string; error?: string };

      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.ok ? result.answer ?? "I couldn't find an answer to that." : result.error ?? "Assistant is offline." }
      ]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Connection failed. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(input);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="fixed bottom-24 right-4 z-50 flex h-[min(680px,76vh)] w-[min(420px,calc(100vw-2rem))] flex-col hud-panel"
          aria-label="AI Assistant"
        >
          <header className="flex items-center justify-between border-b border-neon/25 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border border-neon bg-neon text-black">
                <Bot size={20} />
              </span>
              <div>
                <h2 className="font-mono text-sm font-bold uppercase text-neon">SudhanshuGPT</h2>
                <p className="text-xs text-white/55">AI Portfolio Assistant</p>
              </div>
            </div>
            <button onClick={() => onOpenChange(false)} aria-label="Close assistant" className="text-white/70 hover:text-neon">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={message.role === "user" ? "ml-auto max-w-[88%] border border-neon/50 bg-neon/12 p-3 text-sm" : "max-w-[92%] border border-white/10 bg-white/[0.04] p-3 text-sm text-white/82"}
              >
                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-[92%] border border-white/10 bg-white/[0.04] p-3 text-sm text-neon"
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Thinking...
                </motion.span>
              </motion.div>
            )}
          </div>

          <div className="border-t border-neon/25 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {portfolioConfig.assistant.suggestedQuestions.map((question) => (
                <button key={question} onClick={() => submit(question)} disabled={loading} className="border border-neon/30 px-2 py-1 text-left text-xs text-neon hover:bg-neon hover:text-black disabled:opacity-60">
                  {question}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 border border-white/15 bg-black px-3 py-3 text-sm outline-none focus:border-neon"
                placeholder="Ask about projects, skills, contact..."
                aria-label="Ask SudhanshuGPT"
              />
              <button className="grid w-12 place-items-center border border-neon bg-neon text-black disabled:opacity-60" aria-label="Send message" disabled={loading}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
