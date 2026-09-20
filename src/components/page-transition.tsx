"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { signalPageRendered } from "@/lib/page-transition";

/**
 * Wrap each page's root in this. Once the page has committed to the DOM it
 * tells the pending push-up transition (see lib/page-transition.ts) that the
 * new state is ready to be captured.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    signalPageRendered();
  }, [pathname]);

  return children;
}
