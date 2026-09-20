import { TransitionLink } from "@/components/transition-link";

export function SiteName() {
  return (
    <TransitionLink href="/" className="flex flex-col gap-0.5">
      <span style={{ color: "var(--fg-1)" }}>Blessing Adewale (Teeblix)</span>
      <span style={{ color: "var(--fg-2)" }}>Designer &amp; Framer Developer</span>
    </TransitionLink>
  );
}
