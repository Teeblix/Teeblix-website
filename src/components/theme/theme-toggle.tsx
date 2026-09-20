"use client";

import { useTheme, type Theme } from "./theme-provider";

const OPTIONS: { theme: Theme; swatch: string }[] = [
  { theme: "light", swatch: "#ffffff" },
  { theme: "dark", swatch: "#000000" },
  { theme: "red", swatch: "#e63312" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-[6px]">
      {OPTIONS.map((opt) => (
        <button
          key={opt.theme}
          type="button"
          aria-label={`${opt.theme} theme`}
          aria-pressed={theme === opt.theme}
          onClick={() => setTheme(opt.theme)}
          className="h-[14px] w-[14px] shrink-0 border transition-transform duration-200 hover:scale-110"
          style={{ background: opt.swatch, borderColor: "var(--border-1)" }}
        />
      ))}
    </div>
  );
}
