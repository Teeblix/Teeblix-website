"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Scroll speed in pixels per second — the duration is derived from the
   * measured content height so it stays consistent regardless of how much
   * content is passed in. */
  speed?: number;
  gap?: number;
  pauseOnHover?: boolean;
  direction?: "up" | "down";
  style?: CSSProperties;
}

/**
 * Ported from the Framer `VerticalMarquee` code component: duplicates its
 * content once and animates a seamless -50% translateY loop.
 */
export function Marquee({
  children,
  speed = 40,
  gap = 0,
  pauseOnHover = true,
  direction = "up",
  style,
}: MarqueeProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);
  const [hovered, setHovered] = useState(false);
  const paused = pauseOnHover && hovered;
  const animName = direction === "up" ? "marquee-up" : "marquee-down";

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setDuration(h / speed);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div
      style={{ ...style, overflow: "hidden", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes marquee-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes marquee-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          animation: `${animName} ${duration}s linear infinite ${paused ? "paused" : "running"}`,
          willChange: "transform",
        }}
      >
        <div ref={contentRef} style={{ paddingBottom: gap, boxSizing: "border-box" }}>
          {children}
        </div>
        <div style={{ paddingBottom: gap, boxSizing: "border-box" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
