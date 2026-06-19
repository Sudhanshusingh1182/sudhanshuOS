import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SCOPES = "user-read-currently-playing user-read-recently-played";

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Set SPOTIFY_CLIENT_ID in .env first." },
      { status: 400 }
    );
  }

  const { origin } = new URL(request.url);
  const redirectUri = `${origin}/api/spotify/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}
