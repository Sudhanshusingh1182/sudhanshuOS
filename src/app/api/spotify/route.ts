import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
    album: {
      name: string;
      images: { url: string; width: number; height: number }[];
    };
    duration_ms: number;
    progress_ms: number;
  } | null;
};

type RecentlyPlayedResponse = {
  items: {
    track: {
      name: string;
      artists: { name: string }[];
      external_urls: { spotify: string };
      album: {
        name: string;
        images: { url: string; width: number; height: number }[];
      };
    };
    played_at: string;
  }[];
};

type TrackData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: params,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Spotify token refresh failed (${res.status}): ${text}`);
    return null;
  }

  const data = (await res.json()) as SpotifyTokenResponse;

  // Cache the access token with a 1-minute safety buffer before the 1-hour expiry
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

async function getCurrentlyPlaying(token: string): Promise<TrackData | null> {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track",
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    }
  );

  if (res.status === 204 || res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("Spotify currently-playing failed:", res.status);
    return null;
  }

  const data = (await res.json()) as CurrentlyPlayingResponse;

  if (!data.item) return null;

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a) => a.name).join(", "),
    albumArt: data.item.album.images[0]?.url ?? "",
    songUrl: data.item.external_urls.spotify,
  };
}

async function getRecentlyPlayed(token: string): Promise<TrackData | null> {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) return null;

  const data = (await res.json()) as RecentlyPlayedResponse;
  const item = data.items[0]?.track;
  if (!item) return null;

  return {
    isPlaying: false,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    albumArt: item.album.images[0]?.url ?? "",
    songUrl: item.external_urls.spotify,
  };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    if (!token) {
      return NextResponse.json({ configured: false });
    }

    // Try currently playing first
    const current = await getCurrentlyPlaying(token);
    if (current) {
      return NextResponse.json({ configured: true, ...current });
    }

    // Fall back to recently played
    const recent = await getRecentlyPlayed(token);
    if (recent) {
      return NextResponse.json({ configured: true, ...recent });
    }

    // Connected but no track data
    return NextResponse.json({
      configured: true,
      isPlaying: false,
      title: "",
      artist: "",
      albumArt: "",
      songUrl: "",
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ configured: false });
  }
}
