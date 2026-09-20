import { CopyEmail } from "@/components/home/copy-email";
import { InfoList } from "@/components/home/info-list";
import { TestimonialCard } from "./testimonial-card";
import { STORY, TESTIMONIALS, TOOLS } from "@/lib/about-content";
import { EMAIL, WHAT_I_DO } from "@/lib/site-content";

function Heading({ children }: { children: string }) {
  return (
    <span className="text-xs uppercase" style={{ color: "var(--fg-2)" }}>
      {children}
    </span>
  );
}

interface Props {
  /** "sidebar" is the desktop scroll column; "page" stacks on phone and
   * becomes a 2-column grid on tablet. */
  variant: "sidebar" | "page";
}

export function AboutSections({ variant }: Props) {
  const page = variant === "page";

  return (
    <div className={page ? "flex flex-col gap-10 md:grid md:grid-cols-2" : "flex flex-col gap-10"}>
      <section className="flex flex-col gap-[11px]">
        <Heading>The story</Heading>
        <div className="flex max-w-[614px] flex-col gap-5 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
          {STORY.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <InfoList title="What I do" items={WHAT_I_DO} />

      <section className="flex flex-col gap-3">
        <Heading>Tools I work with</Heading>
        <p className="text-xs uppercase" style={{ color: "var(--fg-1)" }}>
          {TOOLS}
        </p>
      </section>

      <section className={`flex flex-col gap-3 ${page ? "md:col-span-2" : ""}`}>
        <Heading>What people say</Heading>
        <div className={page ? "flex flex-col gap-[30px] md:grid md:grid-cols-2" : "flex flex-col gap-[30px]"}>
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <section className={`flex flex-col gap-3 ${page ? "" : "pb-[30px]"}`}>
        <Heading>Email me</Heading>
        <CopyEmail email={EMAIL} />
      </section>
    </div>
  );
}
