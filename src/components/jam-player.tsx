"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/playlist";

const VOLUME = 0.6;
const FADE_IN_MS = 1200; // a new clip easing up to volume
const FADE_OUT_MS = 1600; // the tail of a clip easing down before the next
const FADE_STEP_MS = 320; // quicker fade when Prev/Next is pressed
const FADE_PAUSE_MS = 260; // quicker still when pausing

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36Z" />
      {on && <path d="M208,104v48a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v80a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />}
    </svg>
  );
}

/**
 * "My jam": a small player pinned to the bottom-right that plays through
 * Teeblix's Spotify playlist, starting from a random track and rolling on to
 * the next as each clip ends. Playback uses an audio element the page owns,
 * so a tap on our own controls is enough to start it on phones as well as
 * desktop (Spotify's embed can only be started from inside its own frame,
 * which rules it out on mobile).
 *
 * Built to the Framer design: three bg-2 groups, 2px apart, 4px padding,
 * 12px mono labels in fg-2 (Prev/Next go fg-1 on hover) and the Phosphor
 * speaker icon, which gains its waves while playing.
 */
export function JamPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(Math.floor(Math.random() * TRACKS.length));
  const startedRef = useRef(false);
  const fadeRef = useRef(0);
  const switchingRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const audio = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.volume = VOLUME;
      el.preload = "none";
      el.crossOrigin = "anonymous";
      el.src = TRACKS[indexRef.current].preview;
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  /** Ramps the volume to `target` over `ms`, replacing any fade in flight. */
  const fadeTo = useCallback(
    (target: number, ms: number, done?: () => void) => {
      const el = audio();
      cancelAnimationFrame(fadeRef.current);
      const from = el.volume;
      if (ms <= 0 || from === target) {
        el.volume = target;
        done?.();
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / ms, 1);
        el.volume = Math.min(1, Math.max(0, from + (target - from) * p));
        if (p < 1) fadeRef.current = requestAnimationFrame(tick);
        else done?.();
      };
      fadeRef.current = requestAnimationFrame(tick);
    },
    [audio]
  );

  /** Loads a track silently and fades it up. */
  const goTo = useCallback(
    (index: number, play: boolean, fadeMs = FADE_IN_MS) => {
      const el = audio();
      cancelAnimationFrame(fadeRef.current);
      indexRef.current = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
      el.volume = 0;
      el.src = TRACKS[indexRef.current].preview;
      switchingRef.current = false;
      if (!play) {
        el.volume = VOLUME;
        return;
      }
      el.play()
        .then(() => {
          setPlaying(true);
          fadeTo(VOLUME, fadeMs);
        })
        .catch(() => {
          el.volume = VOLUME;
          setPlaying(false);
        });
    },
    [audio, fadeTo]
  );

  /** Fades the current clip down, then moves by `delta`. */
  const fadeToTrack = useCallback(
    (delta: number, outMs: number) => {
      if (switchingRef.current) return;
      switchingRef.current = true;
      const next = indexRef.current + delta;
      if (audio().paused) return goTo(next, true);
      fadeTo(0, outMs, () => goTo(next, true));
    },
    [audio, fadeTo, goTo]
  );

  useEffect(() => {
    const el = audio();
    // Start the hand-over before the clip runs out so one fades down as the
    // next fades up, rather than cutting off.
    const onTimeUpdate = () => {
      if (switchingRef.current || !el.duration || Number.isNaN(el.duration)) return;
      if (el.duration - el.currentTime <= FADE_OUT_MS / 1000) fadeToTrack(1, FADE_OUT_MS);
    };
    const onEnded = () => goTo(indexRef.current + 1, true);
    // A clip whose URL has expired shouldn't stall the playlist.
    const onError = () => goTo(indexRef.current + 1, startedRef.current);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      cancelAnimationFrame(fadeRef.current);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, [audio, fadeToTrack, goTo]);

  // Browsers won't let a page start audio on its own, so the music begins at
  // the visitor's first tap, click or key press instead — as close to
  // automatic as the platform allows.
  useEffect(() => {
    const start = (e: Event) => {
      if (startedRef.current) return;
      // A first tap on the player itself is that button's job, not ours —
      // otherwise the speaker would start and immediately pause the music.
      if (e.target instanceof Element && e.target.closest(".jam-player")) return;
      startedRef.current = true;
      const el = audio();
      el.volume = 0;
      el.play()
        .then(() => fadeTo(VOLUME, FADE_IN_MS))
        .catch(() => {
          el.volume = VOLUME;
          setPlaying(false);
        });
    };
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", start, opts);
    window.addEventListener("touchend", start, opts);
    window.addEventListener("keydown", start, opts);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("touchend", start);
      window.removeEventListener("keydown", start);
    };
  }, [audio, fadeTo]);

  const toggle = () => {
    startedRef.current = true;
    const el = audio();
    if (el.paused) {
      el.volume = 0;
      el.play()
        .then(() => fadeTo(VOLUME, FADE_IN_MS))
        .catch(() => {
          el.volume = VOLUME;
          setPlaying(false);
        });
    } else {
      setPlaying(false);
      fadeTo(0, FADE_PAUSE_MS, () => el.pause());
    }
  };

  const step = (delta: number) => {
    startedRef.current = true;
    fadeToTrack(delta, FADE_STEP_MS);
  };

  const group = "flex items-center p-1";
  const groupStyle = { background: "var(--bg-2)" } as const;
  const label = "text-xs uppercase leading-[1.3] transition-colors duration-200";

  return (
    <div className="jam-player fixed right-5 bottom-5 z-40 flex items-stretch gap-0.5">
      <div className={group} style={groupStyle}>
        <span className={label} style={{ color: "var(--fg-2)" }}>
          My jam
        </span>
      </div>

      <div className={`${group} gap-2`} style={groupStyle}>
        <button type="button" onClick={() => step(-1)} className={`${label} jam-btn cursor-pointer`} aria-label="Previous track">
          Prev
        </button>
        <button type="button" onClick={() => step(1)} className={`${label} jam-btn cursor-pointer`} aria-label="Next track">
          Next
        </button>
      </div>

      <button
        type="button"
        onClick={toggle}
        className={`${group} cursor-pointer transition-colors duration-200`}
        style={{ ...groupStyle, color: playing ? "var(--fg-1)" : "var(--fg-2)" }}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
      >
        <SpeakerIcon on={playing} />
      </button>
    </div>
  );
}
