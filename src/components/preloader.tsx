"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const LINES = ["TEEBLIX PORTFOLIO - 2026", "DESIGNER - FRAMER DEVELOPER"];
const SESSION_KEY = "teeblix-preloaded";
const SCRAMBLE_MS = 1100; // how long each line takes to resolve
const HOLD_MS = 650; // pause on the resolved line
const TICK_MS = 30;

/**
 * First-visit preloader (from the Framer home canvas): the page background
 * with one line of 12px mono text centred. The text scrambles into
 * "TEEBLIX PORTFOLIO - 2026", holds, scrambles again into
 * "DESIGNER - FRAMER DEVELOPER", then the whole screen pushes up and the
 * page slides in underneath — the same move as the page transitions.
 *
 * Shown once per browser session; `layout.tsx` hides it before hydration on
 * later loads (see the inline script there).
 */
export function Preloader() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"run" | "leave" | "done">("run");

  useEffect(() => {
    let visited = false;
    try {
      visited = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visited || reduce) {
      setPhase("done");
      return;
    }
    document.documentElement.classList.add("preloading");

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
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setPhase("leave");
      document.querySelector(".site-root")?.classList.add("site-enter");
      await wait(420);
      document.documentElement.classList.remove("preloading");
      document.querySelector(".site-root")?.classList.remove("site-enter");
      setPhase("done");
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.documentElement.classList.remove("preloading");
      document.querySelector(".site-root")?.classList.remove("site-enter");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader fixed inset-0 z-[100] flex items-center justify-center text-xs uppercase leading-[1.3] ${phase === "leave" ? "preloader-leave" : ""}`}
      style={{ background: "var(--bg-1)", color: "var(--fg-1)" }}
      aria-hidden="true"
    >
      <span className="whitespace-pre">{text}</span>
    </div>
  );
}
