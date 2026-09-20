"use client";

import { useState } from "react";
import { LazyVideo } from "@/components/lazy-video";
import { TransitionLink } from "@/components/transition-link";
import { sized } from "@/lib/media";
import type { Project } from "@/lib/types";

const EASE = "cubic-bezier(0.44,0,0.56,1)";

/**
 * The Projects page list view, matching the Framer site: a two-column text
 * list where the active row fills from the bottom with the foreground colour,
 * inverts its text and floats the cover at the right edge. The first row is
 * active by default (a hint that the rows can be hovered); from there the
 * highlight follows the pointer, and the other rows dim only while a row is
 * actually being hovered.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={`plh-list relative w-full ${hovering ? "is-hovering" : ""}`}
      onMouseLeave={() => {
        setHovering(false);
        setActive(0);
      }}
    >
      <style>{`
        .plh-list { display: flex; flex-direction: column; gap: 12px; }
        .plh-list.is-hovering .plh-row:not(.is-active) { opacity: 0.5; }
        .plh-row { position: relative; display: flex; align-items: center; padding: 0; opacity: 1; transition: opacity 0.4s ${EASE}, padding 0.4s ${EASE}; }
        .plh-row.is-active { padding: 0 4px; }
        /* The fill grows 4px beyond the row on top and bottom so the row's own
           height never changes and the rows below stay put. */
        .plh-bg { position: absolute; left: 0; right: 0; bottom: -4px; height: 0; background: var(--fg-1); border-radius: 4px; z-index: 0; transition: height 0.44s ${EASE}; }
        .plh-row.is-active .plh-bg { height: calc(100% + 8px); }
        .plh-content { position: relative; z-index: 1; display: flex; gap: 40px; flex: 1; min-width: 0; }
        .plh-title, .plh-ind { font-size: 13px; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.4s ease; }
        .plh-title { color: var(--fg-1); flex: 0 0 35%; }
        .plh-ind { color: var(--fg-2); flex: 1; min-width: 0; }
        .plh-row.is-active .plh-title { color: var(--bg-1); }
        .plh-row.is-active .plh-ind { color: var(--bg-2); }
        .plh-media { position: absolute; right: 80px; top: 50%; width: 280px; height: 185px; z-index: 2; pointer-events: none; overflow: hidden; opacity: 0; transform: translateY(-50%) scale(0.96); transition: opacity 0.4s ${EASE}, transform 0.55s ${EASE}; }
        .plh-row.is-active .plh-media { opacity: 1; transform: translateY(-50%) scale(1); }
        .plh-media img, .plh-media video { display: block; width: 100%; height: 100%; object-fit: cover; }
      `}</style>
      {projects.map((p, i) => (
        <TransitionLink
          key={p.slug}
          href={`/projects/${p.slug}`}
          className={`plh-row ${i === active ? "is-active" : ""}`}
          onMouseEnter={() => {
            setHovering(true);
            setActive(i);
          }}
        >
          <div className="plh-bg" />
          <div className="plh-content">
            <span className="plh-title">{p.title}</span>
            <span className="plh-ind">{p.industry}</span>
          </div>
          <div className="plh-media">
            {p.video ? (
              <LazyVideo src={p.video} poster={sized(p.cover, 512)} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sized(p.cover, 512)} alt="" draggable={false} loading="lazy" />
            )}
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
