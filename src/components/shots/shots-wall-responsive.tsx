"use client";

import { useEffect, useState } from "react";
import { ShotsWall } from "./shots-wall";
import type { Shot } from "@/lib/types";

// Framer breakpoints: desktop/laptop ≥ 1200 (2 columns + scroll strip),
// tablet 810–1199 (2 columns), phone < 810 (1 column).
function useBreakpoint() {
  const [bp, setBp] = useState<"desktop" | "tablet" | "phone">("desktop");
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia("(min-width: 810px)");
    const update = () => setBp(desktop.matches ? "desktop" : tablet.matches ? "tablet" : "phone");
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);
  return bp;
}

export function ShotsWallResponsive({ items }: { items: Shot[] }) {
  const bp = useBreakpoint();
  return <ShotsWall items={items} columns={bp === "phone" ? 1 : 2} scrollText={bp === "desktop"} />;
}
