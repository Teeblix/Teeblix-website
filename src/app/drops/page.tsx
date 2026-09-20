import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SubscribeForm } from "@/components/drops/subscribe-form";
import { FloatingNav } from "@/components/nav/floating-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";

const DESCRIPTION =
  "Drops is the newsletter from Blessing Adewale (Teeblix): the work and the thinking behind it, straight to your inbox. Subscribe to get the first one.";

export const metadata: Metadata = pageMetadata({ title: "Drops", description: DESCRIPTION, path: "/drops" });

export default function DropsPage() {
  return (
    <PageTransition>
      <main className="relative mx-auto flex min-h-screen w-full max-w-[1920px] flex-col justify-center px-6 pt-[200px] pb-10 md:px-8 md:pt-[150px] lg:py-[200px]">
        <JsonLd data={webPageJsonLd({ title: "Drops", description: DESCRIPTION, path: "/drops" })} />
        <MobileNav />
        <FloatingNav />

        {/* Framer draft: 550px stack, title block (gap 12) + form (gap 20), 20px apart. */}
        <div className="mx-auto flex w-full max-w-[550px] flex-col gap-5">
          <div className="flex flex-col gap-3 uppercase leading-[1.3]">
            <h1 className="text-[13px] font-medium" style={{ color: "var(--fg-1)" }}>
              Drops coming soon
            </h1>
            <p className="text-xs" style={{ color: "var(--fg-2)" }}>
              Subscribe to my drops and get each new one straight to your inbox. No spam, just the work and the
              thinking behind it.
            </p>
          </div>

          <SubscribeForm />
        </div>
      </main>
    </PageTransition>
  );
}
