"use client";

import { useRef, type ReactNode } from "react";
import { NavBar } from "@/components/nav/nav-bar";
import { NavItem } from "@/components/nav/nav-item";
import { SOCIALS } from "@/lib/site-content";
import { ScrollProgressText } from "./scroll-progress-text";
import { ScrollHint } from "./scroll-hint";

const EDGE_FADE = "linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)";

export function AboutSidebar({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="relative flex h-screen flex-col pt-5 pb-5">
      <div className="px-8">
        <NavBar />
      </div>

      <div className="relative mt-[38px] min-h-0 flex-1">
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="scrollbar-none h-full overflow-y-auto"
          style={{ padding: "30px 32px 0", maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
        >
          {children}
        </div>
        <ScrollProgressText scrollRef={scrollRef} />
      </div>

      <div className="h-5" />

      <nav className="flex flex-wrap gap-1.5 pl-8 text-xs uppercase leading-[1.2]">
        {SOCIALS.map((s) => (
          <NavItem key={s.title} href={s.href} title={s.title} newTab />
        ))}
      </nav>

      <ScrollHint scrollRef={scrollRef} className="absolute right-[25px] bottom-[50px]" />
    </aside>
  );
}
