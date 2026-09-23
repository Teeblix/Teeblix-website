import { CopyEmail } from "./copy-email";
import { InfoList } from "./info-list";
import { LineLens } from "./line-lens";
import { NavItem } from "@/components/nav/nav-item";
import { NavBar } from "@/components/nav/nav-bar";
import { EMAIL, INDUSTRIES, QUOTE, SOCIALS, WHAT_I_DO } from "@/lib/site-content";

export function Sidebar() {
  return (
    <aside data-lenis-prevent className="flex w-full flex-col justify-between gap-10 p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="flex flex-col gap-10">
        <NavBar />

        <div style={{ height: 91 }}>
          <LineLens />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <InfoList title="Industries I've worked for" items={INDUSTRIES} />
          <InfoList title="What I do" items={WHAT_I_DO} />
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase" style={{ color: "var(--fg-2)" }}>
              Email me
            </span>
            <CopyEmail email={EMAIL} />
          </div>
        </div>
      </div>

      <p className="max-w-[268px] text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {QUOTE}
      </p>

      <nav className="flex flex-wrap gap-1.5 text-xs uppercase leading-[1.2]">
        {SOCIALS.map((s) => (
          <NavItem key={s.title} href={s.href} title={s.title} newTab />
        ))}
      </nav>
    </aside>
  );
}
