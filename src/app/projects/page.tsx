import type { Metadata } from "next";
import { FloatingNav } from "@/components/nav/floating-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";
import { ProjectsBrowser } from "@/components/projects/projects-browser";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Blessing Adewale (Teeblix)",
  description: "Client projects and Framer Marketplace templates.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px]">
        <MobileNav />

        <FloatingNav />

        <div className="px-6 pt-[200px] pb-[60px] md:px-8 md:pt-[150px] lg:pt-[260px] lg:pb-[280px]">
          <ProjectsBrowser projects={projects} />
        </div>
      </main>
    </PageTransition>
  );
}
