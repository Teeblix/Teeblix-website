"use client";

import { useEffect, useRef } from "react";
import { CAL_LINK } from "@/lib/work-content";

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const CAL_FONT = "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

type CalApi = ((...args: unknown[]) => void) & { ns: Record<string, CalApi>; q?: unknown[]; loaded?: boolean };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

// Cal.com's official loader snippet, verbatim.
function ensureCal(): CalApi {
  if (window.Cal) return window.Cal;
  (function (C: Window, A: string, L: string) {
    const p = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar);
    const d = C.document;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cal: any = function (this: unknown, ...ar: unknown[]) {
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const api: any = function (...args: unknown[]) {
          p(api, args);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
    C.Cal = cal;
  })(window, EMBED_SRC, "init");
  return window.Cal!;
}

const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * Ported from the Framer `CalScheduler` code component: an inline Cal.com
 * booking embed themed with the site's tokens, re-themed whenever the theme
 * changes. Red theme uses Cal's light base, as on the Framer site.
 */
export function CalScheduler() {
  const hostRef = useRef<HTMLDivElement>(null);
  const nsRef = useRef("cs-" + Math.random().toString(36).slice(2, 8));

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ns = nsRef.current;
    const Cal = ensureCal();

    const theme = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

    const applyUi = () => {
      const brand = token("--fg-1");
      const text = token("--fg-1");
      const textMuted = token("--fg-2");
      const bg = token("--bg-2");
      const onBrand = token("--bg-1");
      // Framer instance: border colour fully transparent, strength 18%
      const bd = `color-mix(in srgb, transparent 82%, ${text} 18%)`;
      const bdStrong = `color-mix(in srgb, transparent 67%, ${text} 33%)`;
      const vars = {
        "cal-brand": brand,
        "cal-brand-emphasis": brand,
        "cal-brand-text": onBrand,
        "cal-bg": bg,
        "cal-bg-muted": bg,
        "cal-bg-subtle": bg,
        "cal-bg-emphasis": `color-mix(in srgb, ${text} 9%, ${bg})`,
        "cal-border": bd,
        "cal-border-emphasis": bdStrong,
        "cal-border-subtle": "transparent",
        "cal-border-booker": "transparent",
        "cal-border-booker-width": "0px",
        "cal-text": text,
        "cal-text-emphasis": text,
        "cal-text-muted": textMuted,
        "cal-text-subtle": textMuted,
        "cal-font-cal": CAL_FONT,
        "cal-font-sans": CAL_FONT,
      };
      try {
        Cal.ns[ns]("ui", { theme: theme(), cssVarsPerTheme: { light: vars, dark: vars }, hideEventTypeDetails: false, layout: "month_view" });
      } catch {}
    };

    Cal("init", ns, { origin: "https://app.cal.com" });
    Cal.ns[ns]("inline", { elementOrSelector: el, calLink: CAL_LINK, config: { layout: "month_view", theme: theme() } });
    applyUi();

    const obs = new MutationObserver(applyUi);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      obs.disconnect();
      el.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} className="h-[500px] w-full overflow-auto" style={{ background: "var(--bg-2)" }} />;
}
