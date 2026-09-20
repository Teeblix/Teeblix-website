"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LazyVideo } from "@/components/lazy-video";
import { sized } from "@/lib/media";

interface Props {
  image: string;
  video?: string | null;
  alt: string;
  /** Max vertical travel in px, from -amount at the top to +amount when scrolled past. */
  amount?: number;
}

/**
 * Ported from the Framer `ImageParallax` code component: the media is
 * oversized by `amount` on top and bottom and drifts with scroll while its
 * container is on screen.
 */
export function ParallaxCover({ image, video, alt, amount = 30 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const layer = layerRef.current;
    if (!el || !layer) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the container's top enters from below, 1 when its bottom leaves at the top
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      layer.style.transform = `translate3d(0, ${(-amount + progress * 2 * amount).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div ref={layerRef} className="absolute inset-x-0 will-change-transform" style={{ top: -amount, bottom: -amount }}>
        {video ? (
          <LazyVideo src={video} poster={sized(image, 2048)} className="h-full w-full object-cover" />
        ) : (
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        )}
      </div>
    </div>
  );
}
