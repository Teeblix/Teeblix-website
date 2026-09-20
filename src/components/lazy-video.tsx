"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> {
  src: string;
}

/**
 * A looping, muted, autoplaying video that only starts downloading once it
 * comes within a screen's height of the viewport, and pauses when it leaves.
 */
export function LazyVideo({ src, poster, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src;
          el.play().catch(() => {});
        } else if (el.src) {
          el.pause();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} poster={poster} loop muted playsInline preload="none" {...rest} />;
}
