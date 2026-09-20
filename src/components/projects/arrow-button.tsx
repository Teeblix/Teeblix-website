"use client";

import { TransitionLink } from "@/components/transition-link";
import { useScramble } from "@/lib/use-scramble";

interface Props {
  href: string;
  label: string;
  external?: boolean;
}

function Arrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 14 14 6M7 6h7v7" />
    </svg>
  );
}

/**
 * The site's text-link button: scramble label (triggered from anywhere on
 * the button, as the Framer `ButtonHoverSync` override does) plus an arrow
 * that rolls over on hover.
 */
export function ArrowButton({ href, label, external = false }: Props) {
  const { display, start, stop } = useScramble(label);
  const className = "group inline-flex items-center gap-[30px] border p-[11px] text-xs uppercase";
  const border = { borderColor: "var(--border-1)" } as const;
  const inner = (
    <>
      <span style={{ color: "var(--fg-2)" }}>{display}</span>
      <span className="relative h-5 w-5 shrink-0 overflow-hidden" style={{ color: "var(--fg-1)" }}>
        <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          <Arrow />
        </span>
        <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <Arrow />
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={border} onMouseEnter={start} onMouseLeave={stop}>
        {inner}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={className} style={border} onMouseEnter={start} onMouseLeave={stop}>
      {inner}
    </TransitionLink>
  );
}
