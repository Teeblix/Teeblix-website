// Framer: Background 01 fill, Foreground 02 text, 4px 8px padding.
export function FeaturedLabel() {
  return (
    <span
      className="absolute right-5 top-1/2 z-20 -translate-y-1/2 px-2 py-1 text-xs uppercase"
      style={{ background: "var(--bg-1)", color: "var(--fg-2)" }}
    >
      Featured Projects
    </span>
  );
}
