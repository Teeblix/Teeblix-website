import { Sidebar } from "@/components/home/sidebar";
import { MobileNav } from "@/components/nav/mobile-nav";
import { HeroVideo } from "@/components/home/hero-video";
import { FeaturedLabel } from "@/components/home/featured-label";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { Marquee } from "@/components/home/marquee";
import { PageTransition } from "@/components/page-transition";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featured = getFeaturedProjects(8);

  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px] lg:flex lg:h-screen lg:items-stretch lg:overflow-hidden">
        <MobileNav />

        <div className="hidden lg:block lg:w-[37%]">
          <Sidebar />
        </div>

        <div className="relative h-screen w-full overflow-hidden lg:w-[63%]">
          <HeroVideo />
          <FeaturedLabel />

          <div className="over-video absolute inset-0 z-10">
            <Marquee
              speed={90}
              gap={20}
              pauseOnHover={false}
              style={{ height: "100%", width: "100%" }}
            >
              <div className="grid grid-cols-1 gap-5 px-3 md:grid-cols-2 md:px-5">
                {featured.map((project) => (
                  <FeaturedProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
