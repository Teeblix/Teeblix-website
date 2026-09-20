"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LazyVideo } from "@/components/lazy-video";
import { TransitionLink } from "@/components/transition-link";
import { sized } from "@/lib/media";
import type { Project } from "@/lib/types";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

function scramble(original: string, progress: number): string {
  return original
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i / original.length < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

/**
 * Ported from the Framer `FeaturedProjectCard` code component: cover
 * image/video with a hover zoom, plus a scramble-text reveal on the
 * industry label.
 */
interface Props {
  project: Project;
  /** Crop the cover to this ratio (e.g. 4/3) instead of its natural height. */
  aspect?: number;
  /** Rendered width hint for responsive image selection (CSS `sizes`). */
  sizes?: string;
}

export function FeaturedProjectCard({ project, aspect, sizes = "(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw" }: Props) {
  const [hovered, setHovered] = useState(false);
  const [displayIndustry, setDisplayIndustry] = useState(project.industry);
  const frameRef = useRef<number | undefined>(undefined);
  const startRef = useRef(0);
  const scrambleDuration = 800;

  useEffect(() => setDisplayIndustry(project.industry), [project.industry]);

  useEffect(() => {
    if (hovered) {
      startRef.current = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - startRef.current) / scrambleDuration, 1);
        setDisplayIndustry(scramble(project.industry, p));
        if (p < 1) frameRef.current = requestAnimationFrame(tick);
        else setDisplayIndustry(project.industry);
      };
      frameRef.current = requestAnimationFrame(tick);
    } else {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDisplayIndustry(project.industry);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: String(aspect ?? project.aspect) }}>
        {project.video ? (
          <LazyVideo
            src={project.video}
            poster={sized(project.cover, 1024)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
          />
        ) : (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-2 text-xs uppercase leading-none">
        <span className="shrink-0" style={{ color: "var(--card-fg)" }}>
          {project.title}
        </span>
        <span className="flex-1 truncate text-right" style={{ color: "var(--card-fg)" }}>
          {displayIndustry}
        </span>
      </div>
    </TransitionLink>
  );
}
