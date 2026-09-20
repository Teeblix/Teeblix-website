import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, PERSON_ID, webPageJsonLd } from "@/lib/seo";
import Image from "next/image";
import { AboutSections } from "@/components/about/about-sections";
import { AboutSidebar } from "@/components/about/about-sidebar";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";

const DESCRIPTION =
  "Blessing Adewale (Teeblix): freelance UX/UI designer and Framer developer based in Nigeria, building Framer websites and landing pages for clients worldwide.";

export const metadata: Metadata = pageMetadata({ title: "About Me — UX/UI Designer & Framer Developer", description: DESCRIPTION, path: "/about-me" });

function Badges() {
  return (
    <>
      <div className="absolute left-5 top-5 text-xs uppercase text-white">
        Based in Nigeria
      </div>
      <div className="absolute right-5 top-5 text-xs uppercase text-white">
        Open to the world
      </div>
    </>
  );
}

export default function AboutMePage() {
  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px] lg:flex lg:h-screen lg:overflow-hidden">
        <JsonLd
          data={webPageJsonLd({
            title: "About Me",
            description: DESCRIPTION,
            path: "/about-me",
            type: "ProfilePage",
            extra: { mainEntity: { "@id": PERSON_ID } },
          })}
        />
        <h1 className="sr-only">About Blessing Adewale: freelance UX/UI designer and Framer developer based in Nigeria, open to the world</h1>
        <MobileNav />

        <div className="hidden lg:block lg:w-[37%]">
          <AboutSidebar>
            <AboutSections variant="sidebar" />
          </AboutSidebar>
        </div>

        <div className="relative hidden lg:block lg:h-screen lg:w-[63%]">
          <Image
            src="/images/about/portrait-desktop.jpg"
            alt="Blessing Adewale"
            fill
            priority
            sizes="63vw"
            className="object-cover"
          />
          <Badges />
        </div>

        {/* Tablet / phone: the portrait and nav stay fixed while the content
          box, which starts 75% down the screen, scrolls up over the photo. */}
        <div className="fixed inset-0 lg:hidden">
          <Image
            src="/images/about/portrait-mobile.jpg"
            alt="Blessing Adewale"
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />
          <Image
            src="/images/about/portrait-desktop.jpg"
            alt="Blessing Adewale"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
          />
        </div>

        <div className="h-[75svh] lg:hidden" aria-hidden="true" />

        <section className="relative z-10 p-3 md:p-5 lg:hidden">
          <div className="p-3" style={{ background: "var(--bg-1)" }}>
            <AboutSections variant="page" />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
