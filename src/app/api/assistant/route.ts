import { NextResponse } from "next/server";
import { askSudhanshuGPT } from "@/lib/assistant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: unknown };
    const question = String(body.question ?? "").trim();

    if (question.length < 2) {
      return NextResponse.json({ error: "Ask a portfolio-related question." }, { status: 400 });
    }

    const answer = await askSudhanshuGPT(question);
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: "SudhanshuGPT is temporarily offline." }, { status: 500 });
  }
}
