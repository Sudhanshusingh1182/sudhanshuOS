"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";

export function ContactTerminal() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setStatusMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Message could not be sent.");
      }

      setState("sent");
      setStatusMessage("Transmission complete. Your message was sent to Sudhanshu.");
      formElement.reset();
    } catch (error) {
      setState("error");
      setStatusMessage(error instanceof Error ? error.message : "Message could not be sent.");
    }
  }

  return (
    <SectionFrame id="contact" eyebrow="Communication Hub" title="Contact Terminal">
      <form onSubmit={submit} className="hud-panel mx-auto grid max-w-3xl gap-4 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input required name="name" minLength={2} placeholder="Name" className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon" />
          <input required name="email" type="email" placeholder="Email" className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon" />
        </div>
        <input required name="subject" placeholder="Subject" className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon" />
        <textarea required name="message" minLength={10} rows={6} placeholder="Message" className="resize-none border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon" />
        <button className="inline-flex items-center justify-center gap-2 border border-neon bg-neon px-5 py-3 font-mono text-sm font-bold uppercase text-black disabled:opacity-70" disabled={state === "sending"}>
          <Send size={17} />
          {state === "sending" ? "Sending..." : "Transmit Message"}
        </button>
        {statusMessage && (
          <p className={state === "error" ? "border border-red-400/40 p-3 text-sm text-red-200" : "border border-neon/40 p-3 text-sm text-neon"}>
            {statusMessage}
          </p>
        )}
      </form>
    </SectionFrame>
  );
}
