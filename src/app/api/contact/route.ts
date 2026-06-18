import { NextResponse } from "next/server";
import { sendContactEmail, validateContactMessage } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const validation = validateContactMessage(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await sendContactEmail(validation.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send message.";
    const status = message.includes("SMTP is not configured") ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
