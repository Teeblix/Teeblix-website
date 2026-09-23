"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Subtle inertial window scrolling. Deliberately light: a short ease so the
 * page settles rather than glides, native behaviour kept on touch devices,
 * and off entirely under prefers-reduced-motion. Panels that scroll on their
 * own (the Shots wall, the About sidebar, the Cal embed) opt out with
 * `data-lenis-prevent`.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      syncTouch: false, // phones/tablets keep their native scrolling
      anchors: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
