import nodemailer from "nodemailer";
import { portfolioConfig } from "@/data/portfolio.config";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const MAX_LINKS_IN_MESSAGE = 3;

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  return cachedTransporter;
}

function containsExcessiveLinks(text: string): boolean {
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const matches = text.match(urlRegex);
  return (matches?.length ?? 0) > MAX_LINKS_IN_MESSAGE;
}

export function validateContactMessage(data: Record<string, unknown>) {
  const rawName = String(data.name ?? "");
  const rawEmail = String(data.email ?? "").toLowerCase();
  const rawSubject = String(data.subject ?? "");
  const rawMessage = String(data.message ?? "");

  if (rawName.length > MAX_NAME * 2) return { ok: false as const, error: "Name is too long." };
  if (rawEmail.length > MAX_EMAIL * 2) return { ok: false as const, error: "Email is too long." };
  if (rawSubject.length > MAX_SUBJECT * 2) return { ok: false as const, error: "Subject is too long." };
  if (rawMessage.length > MAX_MESSAGE * 2) return { ok: false as const, error: "Message is too long." };

  const name = rawName.trim().slice(0, MAX_NAME);
  const email = rawEmail.trim().slice(0, MAX_EMAIL);
  const subject = rawSubject.trim().slice(0, MAX_SUBJECT);
  const message = rawMessage.trim().slice(0, MAX_MESSAGE);

  if (name.length < 2) return { ok: false as const, error: "Name must be at least 2 characters." };
  if (!emailPattern.test(email)) return { ok: false as const, error: "Enter a valid email address." };
  if (subject.length < 3) return { ok: false as const, error: "Subject must be at least 3 characters." };
  if (message.length < 10) return { ok: false as const, error: "Message must be at least 10 characters." };
  if (containsExcessiveLinks(message)) return { ok: false as const, error: "Message contains too many URLs. Please remove some links." };

  return { ok: true as const, data: { name, email, subject, message } as ContactMessage };
}

export async function sendContactEmail(message: ContactMessage) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: portfolioConfig.profile.email,
    replyTo: message.email,
    subject: `[SudhanshuOS] ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>New SudhanshuOS contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(message.subject)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message.message)}</p>
      </div>
    `
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
