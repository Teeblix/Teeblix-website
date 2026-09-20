import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import Image from "next/image";
import { Sidebar } from "@/components/home/sidebar";
import { LocationBadges } from "@/components/location-badges";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";
import { ShotsWallResponsive } from "@/components/shots/shots-wall-responsive";
import { SHOTS } from "@/lib/shots-content";

const DESCRIPTION =
  "A wall of shots: selected screens, details and motion from recent website and Framer projects by Blessing Adewale (Teeblix).";

export const metadata: Metadata = pageMetadata({ title: "Shots", description: DESCRIPTION, path: "/shots" });

export default function ShotsPage() {
  return (
    <PageTransition>
      <main className="relative mx-auto h-screen w-full max-w-[1920px] overflow-hidden lg:flex">
        <JsonLd data={webPageJsonLd({ title: "Shots", description: DESCRIPTION, path: "/shots", type: "CollectionPage" })} />
        <h1 className="sr-only">Shots: selected screens, details and motion from recent design and Framer work</h1>
        <MobileNav />

        <div className="hidden lg:block lg:w-[37%]">
          <Sidebar />
        </div>

        {/* Desktop / laptop */}
        <div className="relative hidden h-screen lg:block lg:w-[63%]">
          <Image src="/images/shots/hero-desktop.jpg" alt="" fill priority sizes="63vw" className="object-cover" />
          <LocationBadges layout="corners" inset={20} />
          <div className="absolute inset-y-0 right-5 left-5">
            <ShotsWallResponsive items={SHOTS} />
          </div>
        </div>

        {/* Tablet / phone */}
        <div className="relative h-screen w-full lg:hidden">
          <Image src="/images/shots/hero-mobile.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-y-0 right-3 left-3 md:right-5 md:left-5">
            <ShotsWallResponsive items={SHOTS} />
          </div>
          <div className="md:hidden">
            <LocationBadges layout="stack" inset={12} />
          </div>
          <div className="hidden md:block">
            <LocationBadges layout="stack" inset={20} />
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
