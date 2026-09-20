import type { ReactNode } from "react";

// The Studio brings its own chrome; keep it out of the site's theme/selection rules.
export default function StudioLayout({ children }: { children: ReactNode }) {
  return <div className="studio-root">{children}</div>;
}
