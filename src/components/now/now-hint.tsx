"use client";

import { NavItem } from "@/components/nav/nav-item";
import { openNowModal } from "./now-modal";

/**
 * "Press N for Now" — sits at the far right of the home sidebar's social row
 * on desktop, telling visitors about the shortcut. Clicking it opens the
 * modal too.
 */
export function NowHint() {
  return <NavItem title="Press N for Now" onClick={openNowModal} />;
}
