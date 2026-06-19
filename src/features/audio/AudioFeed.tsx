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
  "NEURAL STREAM DETECTED",
  "AUDIO FEED ONLINE",
  "CURRENT COGNITIVE INPUT",
  "FOCUS MODE ACTIVE",
  "SIGNAL ACQUIRED",
];

const RECENT_STATUSES = [
  "LAST DETECTED SIGNAL",
  "RECENT AUDIO LOG",
  "SIGNAL MEMORY RECALL",
  "NEURAL ECHO",
];

const IDLE_STATUSES = [
  "AUDIO FEED STANDBY",
  "AWAITING INPUT SIGNAL",
  "NEURAL IDLE",
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
          setArtLoaded(false);
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
      <div className="relative mb-3 flex items-center gap-2 border-b border-neon/15 pb-3">
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: track.isPlaying ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-2 w-2"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </motion.span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neon">
          NEURAL AUDIO FEED
        </span>
        <span className="h-px flex-1 bg-neon/15" />
      </div>

      {loading ? (
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse border border-neon/10 bg-neon/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-4/5 animate-pulse rounded bg-neon/10" />
              <div className="h-2 w-3/5 animate-pulse rounded bg-neon/5" />
            </div>
          </div>
          <div className="flex gap-[2px]">
            {BASE_HEIGHTS.map((_, i) => (
              <div key={i} className="h-3 w-[2.5px] animate-pulse bg-neon/10" />
            ))}
          </div>
        </div>
      ) : !track.configured ? (
        <a
          href="/api/spotify/auth"
          className="group flex items-center gap-3 border border-transparent px-0 py-3 transition-all duration-200"
        >
          <div className="grid h-12 w-12 place-items-center border border-neon/20 group-hover:border-neon/40">
            <Disc3 size={18} className="text-white/20 group-hover:text-neon transition-colors duration-200" />
          </div>
          <div>
            <p className="font-mono text-xs text-white/30 group-hover:text-white/50 transition-colors duration-200">
              Spotify Disconnected
            </p>
            <p className="font-mono text-[10px] text-white/15 group-hover:text-white/30 transition-colors duration-200">
              Click to authorize
            </p>
          </div>
        </a>
      ) : !showTrack ? (
        <div className="py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center border border-neon/20">
              <Disc3 size={18} className="text-white/20" />
            </div>
            <div>
              <p className="font-mono text-xs text-white/30">{status}</p>
              <p className="font-mono text-[10px] text-white/15">No recently played tracks</p>
            </div>
          </div>
          <div className="mt-4">
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
            <div className="mb-3 flex items-center gap-2">
              <motion.span
                animate={track.isPlaying ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={{ duration: 2, repeat: track.isPlaying ? Infinity : 0, ease: "easeInOut" }}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-neon/70"
              >
                {status}
              </motion.span>
              {track.isPlaying && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-[10px] text-neon/40"
                >
                  ● LIVE
                </motion.span>
              )}
            </div>

            {/* Album art + Info */}
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border border-neon/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={track.albumArt || "empty"}
                    src={track.albumArt || "/api/placeholder"}
                    alt={track.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: artLoaded ? 1 : 0, scale: 1 }}
                    onLoad={() => setArtLoaded(true)}
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
            <div className="mt-3">
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
                className="mt-3 flex items-center justify-center gap-2 border border-neon/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-neon transition-all duration-200 hover:border-neon hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              >
                <ExternalLink size={13} />
                Open in Spotify
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
