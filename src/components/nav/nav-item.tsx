"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import { useScramble } from "@/lib/use-scramble";

interface NavItemProps {
  title: string;
  /** Renders a link; omit (and pass onClick) to render a button instead. */
  href?: string;
  onClick?: () => void;
  /** Overrides the "current page" check that marks the active item. */
  active?: boolean;
  newTab?: boolean;
  speed?: number;
  className?: string;
}

/** Nav / CTA text link with the scramble hover; the active item gets the chevron marker. */
export function NavItem({ title, href, onClick, active, newTab = false, speed = 40, className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = active ?? (!!href && !newTab && pathname === href);
  const { display, start, stop } = useScramble(title, speed);

  const content = (
    <>
      {display}
      {isActive && (
        <svg
          className="absolute left-full top-1/2 ml-0.5 -translate-y-1/2"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 0 7 5l5 5M5 0 0 5l5 5" transform="translate(6 7)" />
        </svg>
      )}
    </>
  );
  const classes = `relative inline-flex items-center whitespace-nowrap ${className ?? ""}`;
  const style = { color: "var(--fg-1)", transition: "color 0.2s ease" } as const;

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        onMouseEnter={start}
        onMouseLeave={stop}
        className={`${classes} uppercase ${onClick ? "cursor-pointer" : ""}`}
        style={style}
      >
        {content}
      </button>
    );
  }

  return (
    <TransitionLink
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={start}
      onMouseLeave={stop}
      className={classes}
      style={style}
    >
      {content}
    </TransitionLink>
  );
}
