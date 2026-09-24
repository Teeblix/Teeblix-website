"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/playlist";

/** Minimal shape of the bits of Spotify's iFrame API we use. */
interface EmbedController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  addListener: (event: string, cb: (e: { data: { position: number; duration: number; isPaused: boolean } }) => void) => void;
  destroy: () => void;
}
interface IFrameAPI {
  createController: (el: HTMLElement, opts: { uri: string; width: number; height: number }, cb: (c: EmbedController) => void) => void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

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
 * Teeblix's Spotify playlist. Playback runs in a hidden Spotify embed driven
 * by their iFrame API, so anonymous listeners get Spotify's 30-second
 * previews and anyone signed in to Spotify in the same browser hears the
 * full track. Tracks advance on their own; Prev/Next step through the list.
 *
 * Built to the Framer design: three bg-2 groups, 2px apart, 4px padding,
 * 12px mono labels in fg-2 (Prev/Next go fg-1 on hover) and the Phosphor
 * speaker icon, which gains its waves while playing.
 */
export function JamPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<EmbedController | null>(null);
  const indexRef = useRef(Math.floor(Math.random() * TRACKS.length));
  const advancingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const goTo = useCallback((index: number, play: boolean) => {
    const c = controllerRef.current;
    if (!c) return;
    indexRef.current = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    advancingRef.current = true;
    c.loadUri(TRACKS[indexRef.current].uri);
    if (play) window.setTimeout(() => c.play(), 350);
    window.setTimeout(() => (advancingRef.current = false), 1200);
  }, []);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (api) => {
      const el = hostRef.current;
      if (!el) return;
      api.createController(el, { uri: TRACKS[indexRef.current].uri, width: 300, height: 80 }, (controller) => {
        controllerRef.current = controller;
        setReady(true);
        // The embed reports progress; when a clip reaches its end, roll on.
        controller.addListener("playback_update", (e) => {
          const { position, duration, isPaused } = e.data;
          if (!advancingRef.current && duration > 0 && position >= duration - 400) {
            goTo(indexRef.current + 1, true);
          } else if (!advancingRef.current) {
            setPlaying(!isPaused);
          }
        });
      });
    };
    return () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
      delete window.onSpotifyIframeApiReady;
    };
  }, [goTo]);

  const toggle = () => {
    const c = controllerRef.current;
    if (!c) return;
    if (playing) {
      c.pause();
      setPlaying(false);
    } else {
      c.play();
      setPlaying(true);
    }
  };

  const step = (delta: number) => {
    if (!controllerRef.current) return;
    goTo(indexRef.current + delta, true);
    setPlaying(true);
  };

  const group = "flex items-center p-1";
  const groupStyle = { background: "var(--bg-2)" } as const;
  const label = "text-xs uppercase leading-[1.3] transition-colors duration-200";

  return (
    <>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" strategy="lazyOnload" />
      {/* The embed itself does the playing; it stays out of the layout. */}
      <div aria-hidden="true" className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0" style={{ left: -9999, top: 0 }}>
        <div ref={hostRef} />
      </div>

      <div
        className="fixed right-5 bottom-5 z-40 flex items-stretch gap-0.5"
        style={{ visibility: ready ? "visible" : "hidden" }}
      >
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
          aria-label={playing ? "Mute music" : "Play music"}
          aria-pressed={playing}
        >
          <SpeakerIcon on={playing} />
        </button>
      </div>
    </>
  );
}
