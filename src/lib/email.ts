import nodemailer from "nodemailer";
import { portfolioConfig } from "@/data/portfolio.config";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactMessage(data: Partial<ContactMessage>) {
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim().toLowerCase();
  const subject = String(data.subject ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (name.length < 2) return { ok: false as const, error: "Name must be at least 2 characters." };
  if (!emailPattern.test(email)) return { ok: false as const, error: "Enter a valid email address." };
  if (subject.length < 3) return { ok: false as const, error: "Subject must be at least 3 characters." };
  if (message.length < 10) return { ok: false as const, error: "Message must be at least 10 characters." };

  return { ok: true as const, data: { name, email, subject, message } };
}

export async function sendContactEmail(message: ContactMessage) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !from) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

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
