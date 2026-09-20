"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
  text?: string;
  separator?: string;
  stripWidth?: number;
  markerSize?: number;
  dimAmount?: number;
  markerAmount?: number;
  /** CSS colour the strip is mixed from. */
  color?: string;
  fontFamily?: string;
  letterSpacing?: string;
  /** Percentages where the top/bottom fade ends and begins. */
  fade?: [number, number];
}

/**
 * Ported from the Framer `ScrollProgressText` code component: a vertical
 * strip of repeated text along the scroll area's edge, with a bright
 * "marker" window that tracks the scroll position — a custom scrollbar.
 */
export function ScrollProgressText({
  scrollRef,
  text = "TEEBLIX PORTFOLIO - 2026 - DESIGNER - FRAMER DEVELOPER",
  separator = "  /  ",
  stripWidth = 22,
  markerSize = 140,
  dimAmount = 32,
  markerAmount = 100,
  color = "var(--fg-2)",
  fontFamily = "var(--font-fragment-mono), monospace",
  letterSpacing = "0.04em",
  fade = [6, 94],
}: Props) {
  const dimRef = useRef<HTMLDivElement>(null);
  const brightRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(600);
  const [repeat, setRepeat] = useState(10);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = c.scrollHeight - c.clientHeight;
      const progress = max > 0 ? c.scrollTop / max : 0;
      const H = c.clientHeight;
      setContainerH((prev) => (Math.abs(H - prev) > 1 ? H : prev));

      const win = Math.min(markerSize, H);
      const top = Math.max(0, Math.min(H - win, progress * H - win / 2));
      const bottom = Math.max(0, H - top - win);
      if (brightRef.current) {
        brightRef.current.style.clipPath = `inset(${top.toFixed(1)}px 0 ${bottom.toFixed(1)}px 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    c.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(c);
    return () => {
      c.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollRef, markerSize]);

  // Repeat the text until it's at least as tall as the strip.
  useLayoutEffect(() => {
    const el = dimRef.current;
    if (!el) return;
    if (el.scrollHeight < containerH + 40 && repeat < 140) {
      setRepeat((r) => Math.ceil(r * (containerH / Math.max(el.scrollHeight, 1))) + 2);
    }
  }, [containerH, repeat]);

  const line = (text + separator).repeat(repeat);

  const textStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    writingMode: "vertical-rl",
    whiteSpace: "nowrap",
    userSelect: "none",
    pointerEvents: "none",
    textTransform: "uppercase",
    fontFamily,
    fontSize: 10,
    lineHeight: "1.4em",
    letterSpacing,
  };

  const mask = `linear-gradient(to bottom, transparent 0%, #000 ${fade[0]}%, #000 ${fade[1]}%, transparent 100%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 z-10 h-full overflow-hidden"
      style={{ width: stripWidth, maskImage: mask, WebkitMaskImage: mask }}
    >
      <div ref={dimRef} style={{ ...textStyle, color: `color-mix(in srgb, ${color} ${dimAmount}%, transparent)` }}>
        {line}
      </div>
      <div
        ref={brightRef}
        style={{
          ...textStyle,
          color: `color-mix(in srgb, ${color} ${markerAmount}%, transparent)`,
          clipPath: "inset(40% 0 40% 0)",
          transition: "clip-path 0.12s linear",
        }}
      >
        {line}
      </div>
    </div>
  );
}
