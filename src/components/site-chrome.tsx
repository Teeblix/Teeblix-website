"use client";

import { usePathname } from "next/navigation";
import { JamPlayer } from "@/components/jam-player";
import { Preloader } from "@/components/preloader";
import { SmoothScroll } from "@/components/smooth-scroll";

/**
 * The site's furniture: preloader, inertial scrolling and the music player.
 * Kept off /studio — Sanity's editor does its own scrolling and would fight
 * all three.
 */
export function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <JamPlayer />
    </>
  );
}
