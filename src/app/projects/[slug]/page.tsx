import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { FloatingNav } from "@/components/nav/floating-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { PageTransition } from "@/components/page-transition";
import { ArrowButton } from "@/components/projects/arrow-button";
import { ParallaxCover } from "@/components/projects/parallax-cover";
import { getAllProjects, getProject, getProjectSlugs } from "@/sanity/queries";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, PERSON_ID, projectDescription, SITE_URL, webPageJsonLd } from "@/lib/seo";
import { sized } from "@/lib/media";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return {};
  const { project, detail, seoDescription } = data;
  return pageMetadata({
    title: project.title,
    description: seoDescription?.trim() || projectDescription(project, detail),
    path: `/projects/${slug}`,
    image: sized(project.cover, 1200),
  });
}

function Label({ children }: { children: string }) {
  return (
    <span className="text-[10px] font-light uppercase leading-[13px]" style={{ color: "var(--fg-2)" }}>
      {children}
    </span>
  );
}

function Meta({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>
      <div className="flex flex-col text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function TextBlock({ title, lines }: { title: string; lines: string[] }) {
  if (!lines.length) return null;
  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-xs font-normal uppercase" style={{ color: "var(--fg-2)" }}>
        {title}
      </h2>
      <div className="flex max-w-[600px] flex-col gap-4 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {lines.map((l) => (
          <p key={l.slice(0, 40)}>{l}</p>
        ))}
      </div>
    </div>
  );
}

function Banner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1200px) 1880px, 100vw" className="object-cover" />
    </div>
  );
}

/** A two-column row of the body: left column (meta) and right column (text). */
function Row({ left, right, first = false }: { left?: React.ReactNode; right?: React.ReactNode; first?: boolean }) {
  return (
    <div className={`grid grid-cols-1 gap-y-[60px] md:grid-cols-2 md:gap-5 lg:gap-3 ${first ? "pb-10" : "py-10"}`}>
      {left && <div>{left}</div>}
      <div className={left ? undefined : "md:col-start-2"}>{right}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [data, all] = await Promise.all([getProject(slug), getAllProjects()]);
  if (!data) notFound();
  const { project, detail } = data;

  const more = all.filter((p) => p.slug !== slug).slice(0, 4);
  const smalls = [detail.small1, detail.small2].filter((s): s is string => !!s);

  const viewAll = <ArrowButton href="/projects" label="View all projects" />;

  return (
    <PageTransition>
      <main className="relative mx-auto w-full max-w-[1920px]">
        <MobileNav />

        <FloatingNav />
        <JsonLd
          data={webPageJsonLd({
            title: project.title,
            description: detail.description,
            path: `/projects/${slug}`,
            type: "ItemPage",
            extra: {
              mainEntity: {
                "@type": "CreativeWork",
                name: project.title,
                description: detail.description,
                genre: project.industry,
                dateCreated: String(project.year),
                image: sized(project.cover, 1200),
                creator: { "@id": PERSON_ID },
                keywords: [detail.type, ...detail.services, ...detail.tools].join(", "),
                ...(detail.website ? { sameAs: detail.website } : {}),
                url: `${SITE_URL}/projects/${slug}`,
              },
            },
          })}
        />

        {/* Hero: full-screen parallax cover with the title bar along the bottom */}
        <section className="relative h-screen w-full">
          <div className="absolute inset-0">
            <ParallaxCover image={project.cover} video={project.video} alt={project.title} />
          </div>
          <div
            className="absolute inset-x-3 bottom-[30px] flex items-center gap-[15px] p-1 uppercase md:inset-x-8"
            style={{ background: "var(--bg-1)" }}
          >
            <h1 className="shrink-0 text-[13px] font-medium leading-[1.3]" style={{ color: "var(--fg-1)" }}>
              {project.title}
            </h1>
            <span className="flex flex-1 justify-end gap-[30px] text-xs" style={{ color: "var(--fg-2)" }}>
              <span className="truncate">{project.industry}</span>
              <span className="shrink-0">{project.year}</span>
            </span>
          </div>
        </section>

        {/* Body */}
        <section className="flex flex-col gap-3 px-3 py-[60px] md:px-5">
          <Row
            first
            left={
              <div className="grid grid-cols-2 gap-10">
                <Meta label="Project type" lines={[detail.type]} />
                <Meta label="Services" lines={detail.services} />
                <Meta label="Tools" lines={detail.tools} />
                <div className="col-span-2 flex flex-col gap-3">
                  <Label>Links</Label>
                  <div className="flex flex-wrap gap-3">
                    {detail.website && <ArrowButton href={detail.website} label="Live website" external />}
                    {detail.marketplace && <ArrowButton href={detail.marketplace} label="Marketplace link" external />}
                    {detail.contra && <ArrowButton href={detail.contra} label="Contra case" external />}
                  </div>
                </div>
              </div>
            }
            right={<TextBlock title="About project" lines={detail.about} />}
          />

          {detail.large1 && <Banner src={detail.large1} alt={project.title} />}

          {detail.approach.length > 0 && <Row right={<TextBlock title="The approach" lines={detail.approach} />} />}

          {detail.large2 && <Banner src={detail.large2} alt={project.title} />}

          {smalls.length > 0 && (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {smalls.map((s) => (
                <Banner key={s} src={s} alt={project.title} />
              ))}
            </div>
          )}

          {detail.outcome.length > 0 && <Row right={<TextBlock title="The outcome" lines={detail.outcome} />} />}

          {detail.large3 && <Banner src={detail.large3} alt={project.title} />}
        </section>

        {/* More projects */}
        <section className="flex flex-col gap-10 px-3 pt-20 pb-[60px] md:px-8">
          <div className="flex items-start justify-between">
            <h2 className="pt-3 text-base font-medium uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
              More projects
            </h2>
            <div className="hidden md:block">{viewAll}</div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {more.map((p) => (
              <FeaturedProjectCard key={p.slug} project={p} aspect={4 / 3} sizes="(min-width: 810px) 50vw, 100vw" />
            ))}
          </div>
          <div className="md:hidden">{viewAll}</div>
        </section>
      </main>
    </PageTransition>
  );
}
