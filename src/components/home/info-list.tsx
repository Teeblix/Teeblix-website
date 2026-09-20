export function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase" style={{ color: "var(--fg-2)" }}>
        {title}
      </span>
      <ul className="flex flex-col gap-0.5 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
