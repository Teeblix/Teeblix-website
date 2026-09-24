import { NavBar } from "./nav-bar";

/**
 * Desktop header for pages where the nav sits over content (project index and
 * detail pages): Framer's "Navigation bar / Desktop" variant — an 8/20/0/20
 * outer bar holding a 35%-wide, bg-1-filled, 12px-padded nav container, with
 * the location badges on the same row.
 */
export function FloatingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 mx-auto hidden max-w-[1920px] items-start gap-10 px-5 pt-2 lg:flex">
      <div className="w-[35%] shrink-0 p-3" style={{ background: "var(--bg-1)" }}>
        <NavBar />
      </div>
      <span className="mt-3 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        Based in Nigeria
      </span>
      <span className="mt-3 ml-auto text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        Open to the world
      </span>
    </header>
  );
}
