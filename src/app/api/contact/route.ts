import { NextResponse } from "next/server";
import { sendContactEmail, validateContactMessage } from "@/lib/email";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_SIZE = 10000;

const rateLimits = new Map<string, { count: number; resetAt: number; warned: boolean }>();

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();

  if (rateLimits.size > 1000) {
    for (const [key, entry] of rateLimits) {
      if (now > entry.resetAt) rateLimits.delete(key);
    }
  }

  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW, warned: false });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count);

  if (entry.count > RATE_LIMIT_MAX) {
    if (!entry.warned) {
      console.warn(`Rate limit exceeded for IP ${ip}`);
      entry.warned = true;
    }
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
    }

    const ip = getClientIp(request);
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before sending another message." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW / 1000)),
            "X-RateLimit-Remaining": "0"
          }
        }
      );
    }

    const rawHoneypot = request.headers.get("x-honeypot") ?? "";
    if (rawHoneypot) {
      console.warn(`Honeypot triggered from IP ${ip}`);
      return NextResponse.json({ ok: true });
    }

    const text = await request.text();
    if (text.length > MAX_BODY_SIZE) {
      return NextResponse.json({ error: "Request body too large." }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (body._hp && String(body._hp).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const validation = validateContactMessage(body);

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }

    await sendContactEmail(validation.data);

    return NextResponse.json(
      { ok: true },
      { headers: { "X-RateLimit-Remaining": String(Math.max(0, remaining - 1)) } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("SMTP is not configured")) {
      console.error("Contact form: SMTP is not configured.");
      return NextResponse.json(
        { error: "Message service is not available right now." },
        { status: 500 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again later." },
      { status: 502 }
    );
  }
}
