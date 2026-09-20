"use client";

import { useState } from "react";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { NavItem } from "@/components/nav/nav-item";
import { ProjectList } from "./project-list";
import type { Project } from "@/lib/types";

type View = "masonry" | "grid" | "list";
const VIEWS: { id: View; label: string }[] = [
  { id: "masonry", label: "Masonry" },
  { id: "grid", label: "Grid" },
  { id: "list", label: "List" },
];

/**
 * Cards dealt round-robin into columns, as the Framer masonry does. Each
 * card reserves its cover's ratio (natural, or a fixed crop) so nothing
 * jumps as media loads.
 */
function Columns({ projects, columns, aspect }: { projects: Project[]; columns: number; aspect?: number }) {
  const cols = Array.from({ length: columns }, (_, c) => projects.filter((_, i) => i % columns === c));
  return (
    <div className="flex gap-5">
      {cols.map((col, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-5">
          {col.map((p) => (
            <FeaturedProjectCard key={p.slug} project={p} aspect={aspect ?? p.aspect} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("masonry");

  return (
    <>
      {/* Desktop / laptop: switchable views */}
      <div className="hidden flex-col gap-10 lg:flex">
        <div className="flex items-start gap-5">
          <span className="text-[10px] font-light uppercase leading-[13px]" style={{ color: "var(--fg-2)" }}>
            View
          </span>
          <div className="flex flex-col gap-0.5 text-xs leading-[1.2]">
            {VIEWS.map((v) => (
              <NavItem key={v.id} title={v.label} active={view === v.id} onClick={() => setView(v.id)} />
            ))}
          </div>
        </div>

        {view === "masonry" && <Columns projects={projects} columns={3} />}
        {view === "grid" && (
          <div className="grid grid-cols-3 items-start gap-5">
            {projects.map((p) => (
              <FeaturedProjectCard key={p.slug} project={p} aspect={p.aspect} />
            ))}
          </div>
        )}
        {view === "list" && <ProjectList projects={projects} />}
      </div>

      {/* Tablet / phone: grid only, covers at their natural height */}
      <div className="hidden md:block lg:hidden">
        <Columns projects={projects} columns={2} />
      </div>
      <div className="md:hidden">
        <Columns projects={projects} columns={1} />
      </div>
    </>
  );
}
