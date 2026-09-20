interface Props {
  /** "corners": top-left / top-right. "stack": both stacked bottom-left. */
  layout: "corners" | "stack";
  inset?: number;
  /** White when sitting over media; pass "theme" over the page background. */
  color?: "white" | "theme";
}

export function LocationBadges({ layout, inset = 20, color = "white" }: Props) {
  const style = { color: color === "theme" ? "var(--fg-1)" : "#fff" };
  if (layout === "stack") {
    return (
      <div
        className="pointer-events-none absolute z-20 flex flex-col gap-[3px] text-xs uppercase"
        style={{ ...style, left: inset, bottom: 20 }}
      >
        <span>Based in Nigeria</span>
        <span>Open to the world</span>
      </div>
    );
  }
  return (
    <>
      <div className="pointer-events-none absolute z-20 text-xs uppercase" style={{ ...style, left: inset, top: inset }}>
        Based in Nigeria
      </div>
      <div className="pointer-events-none absolute z-20 text-xs uppercase" style={{ ...style, right: inset, top: inset }}>
        Open to the world
      </div>
    </>
  );
}
