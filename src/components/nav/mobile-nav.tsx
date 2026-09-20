"use client";

import { useEffect, useState } from "react";
import { NavItem } from "./nav-item";
import { SiteName } from "./site-name";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CopyEmail } from "@/components/home/copy-email";
import { InfoList } from "@/components/home/info-list";
import { EMAIL, INDUSTRIES, NAV_LINKS, QUOTE, SOCIALS, WHAT_I_DO } from "@/lib/site-content";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {open ? (
        <path d="M8 6h5M8 6V1M8 6l5-5M6 8H1M6 8v5M6 8l-5 5" />
      ) : (
        <path d="M8 1h5M13 1v5M13 1 8 6M6 13H1M1 13V8M1 13l5-5" />
      )}
    </svg>
  );
}

// Tablet / phone navigation: the header stays put and the sidebar content
// lives in a panel that expands underneath it. Mirrors the Framer
// "Navigation bar" Tablet/Mobile variants, including closing on scroll intent
// and (for a mouse) when the pointer leaves the nav.
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });
    return () => {
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchmove", close);
    };
  }, [open]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-30 px-3 pt-2 text-xs uppercase md:px-5 lg:hidden"
      onPointerLeave={(e) => {
        if (open && e.pointerType === "mouse") setOpen(false);
      }}
    >
      <div className="flex flex-col gap-5 p-3 md:grid md:grid-cols-2 md:gap-10" style={{ background: "var(--bg-1)" }}>
        <div>
          <SiteName />
        </div>

        <div className="flex items-stretch justify-between gap-6">
          <nav className="flex flex-col gap-0.5 leading-[1.2]">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.title} href={link.href} title={link.title} className={link.href ? undefined : "cursor-default"} />
            ))}
          </nav>

          <div className="flex flex-col items-end justify-between md:flex-row md:items-start md:gap-5">
            <div className="order-2 md:order-1">
              <ThemeToggle />
            </div>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="order-1 -m-1 p-1 transition-transform duration-200 hover:scale-110 md:order-2"
              style={{ color: "var(--fg-1)", stroke: "currentColor", strokeWidth: 1.2 }}
            >
              <ToggleIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-3 flex flex-col gap-10 p-3" style={{ background: "var(--bg-1)" }}>
            <div className="flex flex-col gap-10 md:flex-row md:gap-10">
              <InfoList title="Industries I've worked for" items={INDUSTRIES} />
              <InfoList title="What I do" items={WHAT_I_DO} />
              <div className="flex flex-col gap-3 md:ml-auto">
                <span style={{ color: "var(--fg-2)" }}>Email me</span>
                <CopyEmail email={EMAIL} />
              </div>
            </div>

            <p className="max-w-[300px]" style={{ color: "var(--fg-1)" }}>
              {QUOTE}
            </p>

            <nav className="flex flex-wrap gap-1.5 leading-[1.2]">
              {SOCIALS.map((s) => (
                <NavItem key={s.title} href={s.href} title={s.title} newTab />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
