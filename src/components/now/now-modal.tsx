"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/transition-link";
import { PRELOADER_DONE } from "@/components/preloader";
import { NOW_ITEMS, NOW_MONTH } from "@/lib/now";

const OPEN_EVENT = "teeblix:now";
const AUTO_DELAY_MS = 2500; // after the page is actually on screen
const EXIT_MS = 220;

/** Opens the Now modal from anywhere on the page. */
export function openNowModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * It greets a visitor once per load, not once per page view — so browsing the
 * site doesn't keep re-opening it.
 */
let greeted = false;

/**
 * "NOW": what's just out and what's in progress, in a centred modal over a
 * dimmed page. Built to the Framer "Now" frame — a 311px bg-1 panel with the
 * NOW / month pills, a new release with its cover and a View project button,
 * then the in-progress list.
 *
 * Opens by itself 2.5s after the home page appears (once a load), on the N
 * key anywhere on desktop, from the "Press N for Now" hint in the home
 * sidebar, and from the bottom-left tab on tablet and phone. Closes on a
 * click outside, on Escape, or on N again.
 */
export function NowModal({ covers }: { covers: Record<string, string> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const exitRef = useRef(0);
  const returnFocus = useRef<Element | null>(null);

  const show = useCallback(() => {
    window.clearTimeout(exitRef.current);
    setLeaving(false);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setLeaving(true);
    exitRef.current = window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
    }, EXIT_MS);
  }, []);

  // Opened from the sidebar hint or the mobile tab.
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, [show]);

  // The one automatic appearance: 2.5s after the home page is visible. The
  // preloader covers the first few seconds, so the wait starts once it's gone.
  useEffect(() => {
    if (greeted || pathname !== "/") return;
    let timer = 0;
    const start = () => {
      if (greeted) return;
      greeted = true;
      timer = window.setTimeout(show, AUTO_DELAY_MS);
    };
    if (document.documentElement.classList.contains("preloading")) {
      window.addEventListener(PRELOADER_DONE, start, { once: true });
    } else {
      start();
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(PRELOADER_DONE, start);
    };
  }, [pathname, show]);

  // N toggles it, Escape closes it — unless the visitor is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) return hide();
      if (e.key !== "n" && e.key !== "N") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable='true']")) return;
      open ? hide() : show();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide, show]);

  // Hold the page still behind it, and move focus into (then back out of) the panel.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("now-open");
    returnFocus.current = document.activeElement;
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      root.classList.remove("now-open");
      const back = returnFocus.current;
      if (back instanceof HTMLElement && document.contains(back)) back.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(exitRef.current), []);

  const tab = (
    <button
      type="button"
      onClick={show}
      className="jam-btn fixed bottom-5 left-5 z-40 flex cursor-pointer items-center p-1 text-xs uppercase leading-[1.3] lg:hidden"
      style={{ background: "var(--bg-2)" }}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      Now
    </button>
  );

  const pill = "px-1.5 py-0.5 text-xs uppercase leading-[1.3]";
  const line = "text-xs uppercase leading-[1.3]";
  const fg2 = { color: "var(--fg-2)" } as const;

  return (
    <>
      {tab}
      {open && (
        <div
          className={`now-scrim fixed inset-0 z-[60] flex items-center justify-center p-5 ${leaving ? "now-leaving" : ""}`}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) hide();
          }}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Now — ${NOW_MONTH}`}
            className="now-panel flex max-h-[calc(100dvh-40px)] w-[311px] max-w-full flex-col gap-5 p-3 outline-none"
            style={{ background: "var(--bg-1)" }}
          >
            {/* The two chips sit 2px apart, like the music player's groups. */}
            <div className="flex flex-wrap items-start gap-0.5">
              <span className={pill} style={{ ...fg2, background: "var(--bg-2)" }}>
                Now
              </span>
              <span className={pill} style={{ ...fg2, background: "var(--bg-2)" }}>
                {NOW_MONTH}
              </span>
            </div>

            <div data-lenis-prevent className="scrollbar-none flex min-h-0 flex-col gap-5 overflow-y-auto">
              {NOW_ITEMS.map((item) => {
                const cover = item.project ? covers[item.project] : undefined;
                return (
                  <section key={`${item.label}-${item.title}`} className="flex flex-col gap-3">
                    <h2 className="text-[10px] font-light uppercase leading-[1.3]" style={fg2}>
                      {item.label}
                    </h2>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-0.5">
                        <p className={line} style={fg2}>
                          {item.title}
                        </p>
                        <p className={line} style={fg2}>
                          {item.meta}
                        </p>
                      </div>

                      {cover && (
                        <div className="relative h-[189px] w-full overflow-hidden">
                          <Image src={cover} alt={item.title} fill sizes="311px" quality={90} className="object-cover" />
                        </div>
                      )}

                      {item.project && (
                        <TransitionLink
                          href={`/projects/${item.project}`}
                          onClick={hide}
                          className="submit-btn flex h-10 items-center justify-center text-[13px] font-medium uppercase"
                        >
                          View project
                        </TransitionLink>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
