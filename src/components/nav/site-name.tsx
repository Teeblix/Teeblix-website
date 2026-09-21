"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { runPreloader } from "@/components/preloader";

/** Name + tagline; clicking it replays the preloader and lands on the home page. */
export function SiteName() {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    runPreloader();
    if (window.location.pathname !== "/") router.push("/");
    else window.scrollTo(0, 0);
  };

  return (
    <Link href="/" onClick={handleClick} className="flex flex-col gap-0.5">
      <span style={{ color: "var(--fg-1)" }}>Blessing Adewale (Teeblix)</span>
      <span style={{ color: "var(--fg-2)" }}>Designer &amp; Framer Developer</span>
    </Link>
  );
}
