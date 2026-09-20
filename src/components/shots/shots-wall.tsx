"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { LazyVideo } from "@/components/lazy-video";
import { ScrollProgressText } from "@/components/about/scroll-progress-text";
import type { Shot } from "@/lib/types";

interface Props {
  items: Shot[];
  columns: number;
  /** Show the scroll-progress text strip along the right edge. */
  scrollText?: boolean;
  gap?: number;
  /** How far down the viewport the grid starts on load, in %. */
  revealOffset?: number;
  hoverZoom?: number;
}

const STRIP_WIDTH = 22;
const mod = (n: number, m: number) => ((n % m) + m) % m;

function layoutMasonry(items: Shot[], W: number, cols: number, gap: number) {
  const colW = (W - (cols - 1) * gap) / cols;
  const colH = new Array<number>(cols).fill(0);
  const pos = items.map((it) => {
    const h = colW / (it.width / it.height);
    let c = 0;
    for (let k = 1; k < cols; k++) if (colH[k] < colH[c] - 0.5) c = k;
    const p = { x: c * (colW + gap), y: colH[c], w: colW, h };
    colH[c] += h + gap;
    return p;
  });
  return { pos, contentH: Math.max(0, ...colH) };
}

/**
 * Ported from the Framer `ShotsWall` code component: a masonry wall that
 * scrolls inside its own container, starting most of the way down the
 * viewport so the backdrop shows first; hover zooms the media and reveals
 * the year; click opens a lightbox.
 */
export function ShotsWall({
  items,
  columns,
  scrollText = false,
  gap = 6,
  revealOffset = 82,
  hoverZoom = 1.025,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 900, h: 700 });

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth || 900, h: el.clientHeight || 700 });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Video shots without a poster arrive with a provisional size; once their
  // metadata loads we swap in the real dimensions and re-flow the wall.
  const [measured, setMeasured] = useState<Record<number, { width: number; height: number }>>({});
  const sizedItems = useMemo(() => items.map((it, i) => (measured[i] ? { ...it, ...measured[i] } : it)), [items, measured]);

  const gridW = Math.max(120, size.w - (scrollText ? STRIP_WIDTH + gap : 0));
  const layout = useMemo(() => layoutMasonry(sizedItems, gridW, columns, gap), [sizedItems, gridW, columns, gap]);

  // ---- lightbox ----
  const [lb, setLb] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const open = useCallback((i: number) => {
    setLb(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);
  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(() => setLb(null), 320);
  }, []);
  const step = useCallback(
    (d: number) => setLb((c) => (c == null ? c : mod(c + d, items.length))),
    [items.length]
  );
  useEffect(() => {
    if (lb == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, close, step]);

  const cur = lb != null ? items[lb] : null;

  const tileSizes = columns === 1 ? "100vw" : scrollText ? "32vw" : "50vw";

  const media = (it: Shot, inLightbox: boolean, index = -1) => {
    if (inLightbox) {
      const style: CSSProperties = { display: "block", width: "auto", height: "auto", maxWidth: "80vw", maxHeight: "82vh", objectFit: "contain" };
      return it.video ? (
        <video src={it.video} poster={it.image} autoPlay loop muted playsInline controls style={style} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={it.image} alt={it.name} draggable={false} style={style} />
      );
    }
    if (it.video) {
      const needsMeasure = !it.image && index >= 0 && !measured[index];
      return (
        <LazyVideo
          src={it.video}
          poster={it.image}
          eagerMetadata={!it.image}
          onLoadedMetadata={
            needsMeasure
              ? (e) => {
                  const v = e.currentTarget;
                  if (v.videoWidth && v.videoHeight) setMeasured((m) => ({ ...m, [index]: { width: v.videoWidth, height: v.videoHeight } }));
                }
              : undefined
          }
          className="pointer-events-none block h-full w-full object-cover"
        />
      );
    }
    return <Image src={it.image!} alt={it.name} fill sizes={tileSizes} className="pointer-events-none object-cover" />;
  };

  return (
    <div className="relative h-full w-full">
      <style>{`
        .shot-c:hover .shot-m > * { transform: scale(${hoverZoom}); }
        .shot-c:hover .shot-y { opacity: 0.62 !important; transform: translateX(0) !important; }
        /* No hover on tablet / phone, so the year is always shown there. */
        @media (max-width: 1199px) { .shot-y { opacity: 0.62 !important; transform: none !important; } }
      `}</style>

      <div ref={scrollRef} className="scrollbar-none absolute inset-0 overflow-x-hidden overflow-y-auto">
        <div style={{ height: Math.round((size.h * revealOffset) / 100) }} aria-hidden="true" />
        <div className="relative w-full" style={{ height: Math.max(Math.ceil(layout.contentH), size.h) }}>
          {items.map((it, i) => {
            const p = layout.pos[i];
            return (
              <div
                key={`${it.name}-${i}`}
                className="shot-c absolute cursor-pointer overflow-hidden"
                style={{ left: p.x, top: p.y, width: p.w, height: p.h, background: "#111" }}
                onClick={() => open(i)}
              >
                <div className="shot-m absolute inset-0">
                  <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
                    {media(it, false, i)}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}
                />
                <div
                  className="pointer-events-none absolute right-2 bottom-2 left-2 z-[2] flex items-end justify-between gap-2.5 uppercase"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.04em",
                    color: "rgb(250, 250, 250)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.7)",
                  }}
                >
                  <span className="truncate">{it.name}</span>
                  <span
                    className="shot-y whitespace-nowrap"
                    style={{
                      opacity: 0,
                      transform: "translateX(6px)",
                      transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {it.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {scrollText && (
        <ScrollProgressText
          scrollRef={scrollRef}
          text="TEEBLIX-PORTFOLIO-2026-SHOTS"
          markerSize={130}
          dimAmount={28}
          markerAmount={95}
          color="var(--shots-strip)"
          fontFamily="var(--font-geist-mono), monospace"
          letterSpacing="0.1em"
          fade={[7, 93]}
        />
      )}

      {cur &&
        createPortal(
          <div
            onClick={close}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3.5 p-6"
            style={{
              background: shown ? "color-mix(in srgb, var(--bg-1) 90%, transparent)" : "transparent",
              backdropFilter: shown ? "blur(10px)" : "blur(0)",
              WebkitBackdropFilter: shown ? "blur(10px)" : "blur(0)",
              transition: "background 0.3s ease, backdrop-filter 0.3s ease",
            }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="lightbox-btn fixed z-[2] h-10 w-10"
              style={{ top: "clamp(12px, 3vw, 28px)", right: "clamp(12px, 3vw, 28px)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative inline-flex"
              style={{
                maxWidth: "80vw",
                maxHeight: "82vh",
                transform: shown ? "scale(1)" : "scale(0.4)",
                opacity: shown ? 1 : 0,
                transition: "transform 0.5s cubic-bezier(0.34,1.4,0.5,1), opacity 0.28s ease",
              }}
            >
              {media(cur, true)}
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-3 text-[11px] uppercase"
              style={{ letterSpacing: "0.05em", color: "var(--fg-1)", opacity: shown ? 1 : 0, transition: "opacity 0.4s ease 0.1s" }}
            >
              <span>{cur.name}</span>
              <span style={{ opacity: 0.5 }}>{cur.year}</span>
            </div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="lightbox-btn fixed top-1/2 h-[42px] w-[42px] -translate-y-1/2"
                  style={{ left: "clamp(10px, 3vw, 34px)" }}
                >
                  <Chevron flip />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="lightbox-btn fixed top-1/2 h-[42px] w-[42px] -translate-y-1/2"
                  style={{ right: "clamp(10px, 3vw, 34px)" }}
                >
                  <Chevron />
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
