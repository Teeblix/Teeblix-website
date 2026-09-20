import { NavItem } from "./nav-item";
import { SiteName } from "./site-name";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NAV_LINKS } from "@/lib/site-content";

// Same 2-column grid as the Industries / What I Do block below it, so the
// nav column's left edge lines up exactly with "What I Do".
export function NavBar() {
  return (
    <div className="grid grid-cols-2 items-start gap-10 text-xs uppercase">
      <div>
        <SiteName />
      </div>

      <div className="flex items-start justify-between">
        <nav className="flex flex-col gap-0.5 leading-[1.2]">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.title} href={link.href} title={link.title} className={link.href ? undefined : "cursor-default"} />
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  );
}
