import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, SITE_URL, webPageJsonLd } from "@/lib/seo";
import { FloatingNav } from "@/components/nav/floating-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";
import { ProjectsBrowser } from "@/components/projects/projects-browser";
import { getAllProjects } from "@/lib/projects";

const DESCRIPTION =
  "Framer website projects, landing pages and Framer Marketplace templates designed and built by Blessing Adewale (Teeblix) for design studios, health & wellness, marketing, non-profits, SaaS and personal portfolios.";

export const metadata: Metadata = pageMetadata({ title: "Projects — Framer Websites & Templates", description: DESCRIPTION, path: "/projects" });

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px]">
        <JsonLd
          data={webPageJsonLd({
            title: "Projects",
            description: DESCRIPTION,
            path: "/projects",
            type: "CollectionPage",
            extra: {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: projects.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: p.title,
                  url: `${SITE_URL}/projects/${p.slug}`,
                })),
              },
            },
          })}
        />
        <h1 className="sr-only">Framer website projects, landing pages and templates designed and built by Blessing Adewale</h1>
        <MobileNav />

        <FloatingNav />

        <div className="px-6 pt-[200px] pb-[60px] md:px-8 md:pt-[150px] lg:pt-[260px] lg:pb-[280px]">
          <ProjectsBrowser projects={projects} />
        </div>
      </main>
    </PageTransition>
  );
}
