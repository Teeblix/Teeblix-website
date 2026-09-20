import { FeaturedProjectCard } from "./featured-project-card";
import { Marquee } from "./marquee";
import type { Project } from "@/lib/types";

// Masonry version of the homepage feed: cards keep their natural aspect and
// are dealt round-robin into columns. Each column is its own marquee so every
// column loops seamlessly on its own height while all scroll at the same
// px/s speed.
function Columns({ projects, columns }: { projects: Project[]; columns: number }) {
  const cols = Array.from({ length: columns }, (_, c) => projects.filter((_, i) => i % columns === c));
  return (
    <>
      {cols.map((col, c) => (
        <Marquee key={c} speed={90} gap={20} pauseOnHover={false} style={{ height: "100%", flex: 1, minWidth: 0 }}>
          <div className="flex flex-col gap-5">
            {col.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Marquee>
      ))}
    </>
  );
}

export function FeaturedMasonry({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="over-video absolute inset-0 z-10 flex gap-5 px-3 md:hidden">
        <Columns projects={projects} columns={1} />
      </div>
      <div className="over-video absolute inset-0 z-10 hidden gap-5 px-5 md:flex">
        <Columns projects={projects} columns={2} />
      </div>
    </>
  );
}
