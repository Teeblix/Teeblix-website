import type { Metadata } from "next";
import { SubscribeForm } from "@/components/drops/subscribe-form";
import { FloatingNav } from "@/components/nav/floating-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Drops — Blessing Adewale (Teeblix)",
  description: "Drops is coming soon. Subscribe to get the first one in your inbox.",
};

export default function DropsPage() {
  return (
    <PageTransition>
      <main className="relative mx-auto flex min-h-screen w-full max-w-[1920px] flex-col justify-center px-6 pt-[200px] pb-10 md:px-8 md:pt-[150px] lg:py-[200px]">
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
