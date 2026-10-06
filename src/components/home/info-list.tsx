export function InfoList({ title, items }: { title: string; items: string[] | string[][] }) {
  // A nested list draws its groups apart, divided by a short rule (Framer).
  const groups: string[][] = Array.isArray(items[0]) ? (items as string[][]) : [items as string[]];

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-normal uppercase" style={{ color: "var(--fg-2)" }}>
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {groups.map((group, i) => (
          <div key={group[0] ?? i} className="flex flex-col gap-2">
            {i > 0 && <div style={{ width: 18, height: 1, background: "var(--border-1)" }} aria-hidden="true" />}
            <ul className="flex flex-col gap-0.5 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
              {group.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
