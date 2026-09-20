"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> {
  src: string;
  /** Load the (small) metadata immediately so the video's size is known before it scrolls into view. */
  eagerMetadata?: boolean;
}

/**
 * A looping, muted, autoplaying video that only starts downloading once it
 * comes within a screen's height of the viewport, and pauses when it leaves.
 */
export function LazyVideo({ src, poster, eagerMetadata = false, ...rest }: Props) {
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

  return <video ref={ref} poster={poster} loop muted playsInline preload={eagerMetadata ? "metadata" : "none"} src={eagerMetadata ? src : undefined} {...rest} />;
}
