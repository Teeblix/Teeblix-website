"use client";

import { useEffect, useRef, type RefObject } from "react";

const EDGE_THRESHOLD = 8;

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Ported from the Framer `ScrollHintArrow` override: a bouncing chevron that
 * points down until the bottom is reached, then flips to point up until the
 * top is reached again — it doesn't flip back mid-scroll.
 */
export function ScrollHint({ scrollRef, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let direction: "down" | "up" = "down";
    let applied: "down" | "up" | null = null;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const top = el.scrollTop;
      const view = el.clientHeight;
      const full = el.scrollHeight;
      if (full > view + 4) {
        if (top + view >= full - EDGE_THRESHOLD) direction = "up";
        else if (top <= EDGE_THRESHOLD) direction = "down";
      }
      if (direction !== applied) {
        applied = direction;
        if (wrapRef.current) {
          wrapRef.current.style.transform = direction === "up" ? "rotate(180deg)" : "rotate(0deg)";
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollRef]);

  return (
    <div
      className={`flex items-center gap-0.5 text-[10px] font-light uppercase leading-[13px] ${className ?? ""}`}
      style={{ color: "var(--fg-1)" }}
    >
      <span>Scroll</span>
      <div
        ref={wrapRef}
        className="inline-flex will-change-transform"
        style={{ transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ animation: "scroll-hint-bounce 1.4s ease-in-out infinite" }}
        >
          <path d="M10 0 5 5 0 0m10 7-5 5-5-5" transform="translate(7 6)" />
        </svg>
      </div>
    </div>
  );
}
