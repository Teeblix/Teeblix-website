import { Sidebar } from "@/components/home/sidebar";
import { MobileNav } from "@/components/nav/mobile-nav";
import { HeroVideo } from "@/components/home/hero-video";
import { FeaturedLabel } from "@/components/home/featured-label";
import { FeaturedMasonry } from "@/components/home/featured-masonry";
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

          <FeaturedMasonry projects={featured} />
        </div>
      </main>
    </PageTransition>
  );
}
