"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, ExternalLink } from "lucide-react";

type TrackInfo = {
  configured: boolean;
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
};

const EMPTY: TrackInfo = { configured: false, isPlaying: false, title: "", artist: "", albumArt: "", songUrl: "" };

const PLAYING_STATUSES = [
  "Currently Playing",
  "Now Streaming",
  "Track Active",
  "Listening",
  "Live",
];

const RECENT_STATUSES = [
  "Last Played",
  "Recent Track",
  "Previously Played",
  "History",
];

const IDLE_STATUSES = [
  "No Track Playing",
  "Waiting...",
  "Idle",
];

function pickStatus(isPlaying: boolean, hasTrack: boolean, seed: string): string {
  const pool = !hasTrack ? IDLE_STATUSES : isPlaying ? PLAYING_STATUSES : RECENT_STATUSES;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) { hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0; }
  return pool[Math.abs(hash) % pool.length];
}

const BAR_COUNT = 16;
const BASE_HEIGHTS = [6, 16, 10, 20, 8, 14, 18, 22, 10, 18, 6, 16, 12, 20, 8, 14];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-7">
      {BASE_HEIGHTS.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2.5px] rounded-full"
          style={{ background: "rgba(34,197,94,0.7)" }}
          animate={active ? {
            height: [
              Math.max(3, h - 6),
              Math.min(28, h + 8),
              Math.max(3, h - 4),
              Math.min(28, h + 4),
              Math.max(3, h - 6),
            ],
            opacity: [0.5, 1, 0.6, 1, 0.5],
          } : {
            height: 3,
            opacity: 0.15,
          }}
          transition={{
            duration: 0.6 + (i % 4) * 0.06,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AudioFeed() {
  const [track, setTrack] = useState<TrackInfo>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [artLoaded, setArtLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify");
        const data = (await res.json()) as TrackInfo;
        if (mounted) {
          setTrack(data);
        }
      } catch {
        if (mounted) setTrack(EMPTY);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  useEffect(() => {
    setArtLoaded(false);
  }, [track.albumArt]);

  const status = track.configured
    ? pickStatus(track.isPlaying, !!track.title, track.title || "idle")
    : "NOT CONFIGURED";

  const showTrack = track.configured && !!track.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="hud-panel overflow-hidden"
    >
      {/* Header */}
      <div className="relative mb-2 flex items-center gap-2 border-b border-neon/15 pb-2 sm:mb-3 sm:pb-3">
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: track.isPlaying ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-2 w-2 shrink-0"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </motion.span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-neon sm:text-[10px]">
          CURRENTLY LISTENING
        </span>
        <span className="h-px flex-1 bg-neon/15" />
      </div>

      {loading ? (
        <div className="space-y-3 py-2 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-10 w-10 animate-pulse border border-neon/10 bg-neon/5 sm:h-12 sm:w-12" />
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <div className="h-2.5 w-4/5 animate-pulse rounded bg-neon/10 sm:h-3" />
              <div className="h-2 w-3/5 animate-pulse rounded bg-neon/5" />
            </div>
          </div>
          <div className="flex gap-[2px]">
            {BASE_HEIGHTS.map((_, i) => (
              <div key={i} className="h-2 w-[2px] animate-pulse bg-neon/10 sm:h-3 sm:w-[2.5px]" />
            ))}
          </div>
        </div>
      ) : !track.configured ? (
        <a
          href="/api/spotify/auth"
          className="group flex items-center gap-3 border border-transparent px-0 py-2 transition-all duration-200 sm:py-3"
        >
          <div className="grid h-10 w-10 place-items-center border border-neon/20 group-hover:border-neon/40 sm:h-12 sm:w-12">
            <Disc3 size={16} className="text-white/20 group-hover:text-neon transition-colors duration-200" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-white/30 group-hover:text-white/50 transition-colors duration-200 sm:text-xs truncate">
              Spotify Disconnected
            </p>
            <p className="font-mono text-[9px] text-white/15 group-hover:text-white/30 transition-colors duration-200 sm:text-[10px] truncate">
              Click to authorize
            </p>
          </div>
        </a>
      ) : !showTrack ? (
        <div className="py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="grid h-10 w-10 place-items-center border border-neon/20 sm:h-12 sm:w-12">
              <Disc3 size={16} className="text-white/20" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-white/30 sm:text-xs truncate">{status}</p>
              <p className="font-mono text-[9px] text-white/15 sm:text-[10px] truncate">No recently played tracks</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Waveform active={false} />
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Status */}
            <div className="mb-2 flex items-center gap-1.5 sm:mb-3 sm:gap-2">
              <motion.span
                animate={track.isPlaying ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={{ duration: 2, repeat: track.isPlaying ? Infinity : 0, ease: "easeInOut" }}
                className="font-mono text-[8px] uppercase tracking-[0.15em] text-neon/70 sm:text-[10px] truncate"
              >
                {status}
              </motion.span>
              {track.isPlaying && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-[8px] text-neon/40 sm:text-[10px] shrink-0"
                >
                  ● LIVE
                </motion.span>
              )}
            </div>

            {/* Album art + Info */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-neon/30 sm:h-14 sm:w-14">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={track.albumArt || "empty"}
                    src={track.albumArt || "/api/placeholder"}
                    alt={track.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onLoad={() => setArtLoaded(true)}
                    onError={() => setArtLoaded(true)}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                {!artLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-neon/10" />
                )}
                <div className="absolute inset-0 border-r-4 border-black/40" style={{ boxShadow: "inset -4px 0 8px rgba(0,0,0,0.5)" }} />
              </div>

              <div className="min-w-0 flex-1">
                <motion.p
                  key={track.title}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate font-mono text-sm font-bold text-white"
                >
                  {track.title}
                </motion.p>
                <motion.p
                  key={`artist-${track.artist}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="mt-0.5 truncate font-mono text-[11px] text-white/50"
                >
                  {track.artist}
                </motion.p>
              </div>
            </div>

            {/* Waveform */}
            <div className="mt-2 sm:mt-3">
              <Waveform active={track.isPlaying} />
            </div>

            {/* Open in Spotify button */}
            {track.songUrl && (
              <motion.a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 flex items-center justify-center gap-2 border border-neon/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] sm:mt-3 sm:px-4 sm:py-2.5 sm:text-[11px]"
              >
                <ExternalLink size={12} />
                Open in Spotify
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
