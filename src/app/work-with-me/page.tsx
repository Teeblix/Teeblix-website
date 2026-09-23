import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, PERSON_ID, webPageJsonLd } from "@/lib/seo";
import { WHAT_I_DO } from "@/lib/site-content";
import { Sidebar } from "@/components/home/sidebar";
import { LocationBadges } from "@/components/location-badges";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";
import { CalScheduler } from "@/components/work/cal-scheduler";
import { ContactForm } from "@/components/work/contact-form";
import { PREFER_TO_TALK, WORK_LEAD } from "@/lib/work-content";

const DESCRIPTION =
  "Hire a freelance Framer developer and website designer for custom Framer sites, landing pages and migrations. Start a project or book a free discovery call.";

export const metadata: Metadata = pageMetadata({
  title: "Work With Me — Hire a Framer Developer & Website Designer",
  description: DESCRIPTION,
  path: "/work-with-me",
});

const EDGE_FADE = "linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)";

function TalkSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-w-[300px] flex-col gap-1">
        <h2 className="text-[13px] font-medium uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          {PREFER_TO_TALK.title}
        </h2>
        <p className="text-[10px] font-light uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          {PREFER_TO_TALK.description}
        </p>
      </div>
      <CalScheduler />
    </div>
  );
}

export default function WorkWithMePage() {
  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px] lg:flex lg:h-screen lg:overflow-hidden">
        <JsonLd
          data={webPageJsonLd({
            title: "Work With Me",
            description: DESCRIPTION,
            path: "/work-with-me",
            type: "ContactPage",
            extra: {
              mainEntity: {
                "@type": "Service",
                name: "Website design and Framer development",
                serviceType: "Web design, UX/UI design and Framer development",
                provider: { "@id": PERSON_ID },
                areaServed: "Worldwide",
                availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://teeblix.com/work-with-me" },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Services",
                  itemListElement: WHAT_I_DO.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
                },
              },
            },
          })}
        />
        <h1 className="sr-only">Hire a freelance Framer developer and website designer: start a project or book a free discovery call</h1>
        <MobileNav />

        <div className="hidden lg:block lg:w-[37%]">
          <Sidebar />
        </div>

        {/* Desktop / laptop: the column scrolls on its own, under a fixed lead */}
        <div className="relative hidden h-screen lg:block lg:w-[63%]">
          <LocationBadges layout="corners" inset={20} color="theme" />
          <p className="absolute top-20 left-5 max-w-[300px] text-xs uppercase" style={{ color: "var(--fg-1)" }}>
            {WORK_LEAD}
          </p>
          <div
            data-lenis-prevent
            className="scrollbar-none absolute inset-x-5 top-[182px] bottom-0 flex flex-col gap-10 overflow-y-auto py-10"
            style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
          >
            <div className="ml-[35%]">
              <ContactForm />
            </div>
            <TalkSection />
          </div>
        </div>

        {/* Tablet / phone: the page itself scrolls */}
        <div className="relative flex flex-col gap-10 px-6 pt-[212px] pb-[52px] md:px-5 md:pt-[150px] md:pb-10 lg:hidden">
          <p className="max-w-[300px] text-xs uppercase" style={{ color: "var(--fg-1)" }}>
            {WORK_LEAD}
          </p>
          <div className="md:ml-[35%]">
            <ContactForm />
          </div>
          <TalkSection />
          <div className="contents md:hidden">
            <LocationBadges layout="stack" inset={12} color="theme" />
          </div>
          <div className="hidden md:contents">
            <LocationBadges layout="stack" inset={20} color="theme" />
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
