export function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-normal uppercase" style={{ color: "var(--fg-2)" }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-0.5 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
