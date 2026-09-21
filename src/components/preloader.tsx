"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const LINES = ["TEEBLIX PORTFOLIO - 2026", "DESIGNER - FRAMER DEVELOPER"];
const SCRAMBLE_MS = 1100; // how long each line takes to resolve
const HOLD_MS = 650; // pause on the resolved line
const TICK_MS = 30;
const EXIT_MS = 400;
const EVENT = "teeblix:preloader";

/** Replays the preloader (used by the name/home link). */
export function runPreloader() {
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Preloader from the Framer home canvas: the page background with one line
 * of 12px mono text centred. The text scrambles into
 * "TEEBLIX PORTFOLIO - 2026", holds, scrambles again into
 * "DESIGNER - FRAMER DEVELOPER", then the whole screen pushes up and the
 * page slides in underneath — the same move as the page transitions.
 *
 * Runs on every page load and whenever `runPreloader()` is called.
 */
export function Preloader() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"run" | "leave" | "done">("run");
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const replay = () => {
      setText("");
      setPhase("run");
      setRunId((n) => n + 1);
    };
    window.addEventListener(EVENT, replay);
    return () => window.removeEventListener(EVENT, replay);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const root = document.documentElement;
    const site = () => document.querySelector(".site-root");
    root.classList.add("preloading");
    site()?.classList.remove("site-enter");

    let timer = 0;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => (timer = window.setTimeout(r, ms)));

    const scrambleTo = (target: string) =>
      new Promise<void>((resolve) => {
        const step = target.length / (SCRAMBLE_MS / TICK_MS);
        let iter = 0;
        const id = window.setInterval(() => {
          if (cancelled) return window.clearInterval(id);
          iter += step;
          setText(
            target
              .split("")
              .map((ch, i) => (ch === " " ? " " : i < iter ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
              .join("")
          );
          if (iter >= target.length) {
            window.clearInterval(id);
            setText(target);
            resolve();
          }
        }, TICK_MS);
      });

    (async () => {
      await wait(150);
      for (const line of LINES) {
        if (cancelled) return;
        await scrambleTo(line);
        await wait(HOLD_MS);
      }
      if (cancelled) return;
      setPhase("leave");
      site()?.classList.add("site-enter");
      await wait(EXIT_MS + 20);
      root.classList.remove("preloading");
      site()?.classList.remove("site-enter");
      setPhase("done");
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      root.classList.remove("preloading");
      site()?.classList.remove("site-enter");
    };
  }, [runId]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader fixed inset-0 z-[100] flex items-center justify-center text-xs uppercase leading-[1.3] ${phase === "leave" ? "preloader-leave" : ""}`}
      style={{ background: "var(--bg-1)", color: "#e63312" }}
      aria-hidden="true"
    >
      <span className="whitespace-pre">{text}</span>
    </div>
  );
}
