"use client";

import { FormEvent, useRef, useState } from "react";
import { Send } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";

export function ContactTerminal() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;

    setState("sending");
    setStatusMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      _hp: String(form.get("_hp") ?? "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Honeypot": payload._hp },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          _hp: payload._hp
        })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Message could not be sent.");
      }

      setState("sent");
      setStatusMessage("Transmission complete. Sudhanshu will receive your message.");
      formElement.reset();
    } catch (error) {
      setState("error");
      setStatusMessage(error instanceof Error ? error.message : "Message could not be sent. Try again shortly.");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <SectionFrame id="contact" eyebrow="Communication Hub" title="Contact Terminal">
      <form onSubmit={submit} className="hud-panel mx-auto grid max-w-3xl gap-4 p-5">
        <input
          name="_hp"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            name="name"
            minLength={2}
            maxLength={100}
            placeholder="Name"
            className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon"
          />
          <input
            required
            name="email"
            type="email"
            maxLength={200}
            placeholder="Email"
            className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon"
          />
        </div>
        <input
          required
          name="subject"
          minLength={3}
          maxLength={200}
          placeholder="Subject"
          className="border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon"
        />
        <textarea
          required
          name="message"
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Message"
          className="resize-none border border-white/15 bg-black px-4 py-3 outline-none focus:border-neon"
        />
        <button
          className="inline-flex items-center justify-center gap-2 border border-neon bg-neon px-5 py-3 font-mono text-sm font-bold uppercase text-black disabled:opacity-60"
          disabled={state === "sending"}
        >
          <Send size={17} />
          {state === "sending" ? "Sending..." : "Transmit Message"}
        </button>
        {statusMessage && (
          <p
            className={
              state === "error"
                ? "border border-red-400/40 p-3 text-sm text-red-200"
                : state === "sent"
                  ? "border border-neon/40 p-3 text-sm text-neon"
                  : "border border-yellow-400/40 p-3 text-sm text-yellow-200"
            }
          >
            {statusMessage}
          </p>
        )}
      </form>
    </SectionFrame>
  );
}
