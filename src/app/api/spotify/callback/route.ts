import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");

  if (errorParam) {
    return new Response(
      htmlError(`Spotify returned: <strong>${errorParam}</strong>`, "/api/spotify/auth"),
      { status: 400, headers: htmlHeaders }
    );
  }

  if (!code) {
    return new Response(
      htmlError("Missing authorization code.", "/api/spotify/auth"),
      { status: 400, headers: htmlHeaders }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(
      htmlError("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env first."),
      { status: 500, headers: htmlHeaders }
    );
  }

  const redirectUri = `${origin}/api/spotify/callback`;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Spotify token exchange failed:", res.status, text);
    return new Response(
      htmlError(`Token exchange failed (HTTP ${res.status}).`, null, text),
      { status: 500, headers: htmlHeaders }
    );
  }

  const data = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    scope: string;
  };

  if (!data.refresh_token) {
    return new Response(
      `<!DOCTYPE html>
<html><body style="background:#0a0a0a;color:#22c55e;font-family:monospace;padding:40px">
<h1>No Refresh Token</h1>
<p>Spotify didn't return a refresh token (this happens when re-authorizing with the same app).</p>
<ol style="color:#aaa;line-height:2">
<li>Go to <a href="https://www.spotify.com/account/apps/" target="_blank" style="color:#22c55e">spotify.com/account/apps</a></li>
<li>Click <strong>Remove Access</strong> beside your app</li>
<li><a href="/api/spotify/auth" style="color:#22c55e">Re-authorize here</a></li>
</ol>
</body></html>`,
      { status: 200, headers: htmlHeaders }
    );
  }

  return new Response(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0a0a0a;color:#22c55e;font-family:monospace;padding:40px;max-width:700px">
<h1>✓ Spotify Connected</h1>
<p style="color:#aaa">Copy this line into your <code style="background:#1a1a1a;padding:2px 6px;color:#22c55e">.env</code> file:</p>
<pre style="background:#111;border:1px solid #22c55e30;padding:16px;overflow-x:auto;font-size:13px;user-select:all">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
<p style="color:#aaa;font-size:13px">Then restart the dev server. The Spotify widget will appear automatically.</p>
<p style="margin-top:32px"><a href="/" style="color:#22c55e;border:1px solid #22c55e;padding:8px 20px;text-decoration:none">← Back to SudhanshuOS</a></p>
</body></html>`,
    { status: 200, headers: htmlHeaders }
  );
}

const htmlHeaders: HeadersInit = { "Content-Type": "text/html;charset=utf-8" };

function htmlError(message: string, retryUrl?: string | null, detail?: string | null): string {
  return `<!DOCTYPE html>
<html><body style="background:#0a0a0a;color:#22c55e;font-family:monospace;padding:40px">
<h1>Authorization Error</h1>
<p>${message}</p>
${detail ? `<pre style="color:#aaa;font-size:12px">${detail}</pre>` : ""}
${retryUrl ? `<p><a href="${retryUrl}" style="color:#22c55e">Try again</a></p>` : ""}
</body></html>`;
}
