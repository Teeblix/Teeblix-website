"use client";

import { usePathname } from "next/navigation";
import { JamPlayer } from "@/components/jam-player";
import { NowModal } from "@/components/now/now-modal";
import { Preloader } from "@/components/preloader";
import { SmoothScroll } from "@/components/smooth-scroll";

/**
 * The site's furniture: preloader, inertial scrolling, the music player and
 * the Now modal. Kept off /studio — Sanity's editor does its own scrolling
 * and would fight them.
 */
export function SiteChrome({ nowCovers }: { nowCovers: Record<string, string> }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <JamPlayer />
      <NowModal covers={nowCovers} />
    </>
  );
}
