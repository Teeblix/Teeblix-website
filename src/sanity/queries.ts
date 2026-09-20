import { toPlainText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { sanityFetch } from "./client";
import type { Project, ProjectDetail } from "@/lib/types";
import type { Shot } from "@/lib/types";

const IMG = `{ "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }`;

const PROJECT_CARD = `{
  "slug": slug.current, title, industry, year, featured,
  "cover": cover ${IMG},
  "video": video.asset->url
}`;

interface CardRow {
  slug: string; title: string; industry: string; year: string; featured: boolean;
  cover: { url: string; w: number; h: number } | null; video: string | null;
}

const toProject = (r: CardRow): Project => ({
  slug: r.slug,
  title: r.title,
  industry: r.industry,
  year: r.year,
  cover: r.cover?.url ?? "",
  video: r.video ?? null,
  featured: !!r.featured,
  aspect: r.cover && r.cover.h ? r.cover.w / r.cover.h : 4 / 3,
});

const ORDER = `order(coalesce(order, 9999) asc, _createdAt asc)`;

export async function getAllProjects(): Promise<Project[]> {
  const rows = await sanityFetch<CardRow[]>(`*[_type == "project" && defined(slug.current)] | ${ORDER} ${PROJECT_CARD}`, {}, ["project"]);
  return rows.filter((r) => r.cover).map(toProject);
}

export async function getFeaturedProjects(limit = 10): Promise<Project[]> {
  const rows = await sanityFetch<CardRow[]>(
    `*[_type == "project" && featured == true && defined(slug.current)] | ${ORDER} [0...$limit] ${PROJECT_CARD}`,
    { limit },
    ["project"]
  );
  return rows.filter((r) => r.cover).map(toProject);
}

interface DetailRow extends CardRow {
  projectType: string; services: string[] | null; tools: string[] | null;
  website: string | null; marketplace: string | null; contra: string | null;
  shortDescription: string | null; seoDescription: string | null;
  about: PortableTextBlock[] | null; approach: PortableTextBlock[] | null; outcome: PortableTextBlock[] | null;
  large1: string | null; large2: string | null; small1: string | null; small2: string | null; large3: string | null;
}

/** Rich text → one plain string per block, which is how the detail page lays paragraphs out. */
const lines = (blocks: PortableTextBlock[] | null) =>
  (blocks ?? []).filter((b) => b._type === "block").map((b) => toPlainText([b]).trim()).filter(Boolean);

export async function getProject(slug: string): Promise<{ project: Project; detail: ProjectDetail; seoDescription: string | null } | null> {
  const r = await sanityFetch<DetailRow | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      "slug": slug.current, title, industry, year, featured,
      "cover": cover ${IMG}, "video": video.asset->url,
      projectType, services, tools, website, marketplace, contra, shortDescription, seoDescription,
      about, approach, outcome,
      "large1": largeImage1.asset->url, "large2": largeImage2.asset->url,
      "small1": smallImage1.asset->url, "small2": smallImage2.asset->url, "large3": largeImage3.asset->url
    }`,
    { slug },
    ["project", `project:${slug}`]
  );
  if (!r || !r.cover) return null;
  return {
    project: toProject(r),
    detail: {
      type: r.projectType,
      services: r.services ?? [],
      tools: r.tools ?? [],
      website: r.website,
      marketplace: r.marketplace,
      contra: r.contra,
      description: r.shortDescription ?? "",
      about: lines(r.about),
      approach: lines(r.approach),
      outcome: lines(r.outcome),
      large1: r.large1,
      large2: r.large2,
      small1: r.small1,
      small2: r.small2,
      large3: r.large3,
    },
    seoDescription: r.seoDescription,
  };
}

export async function getProjectSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(`*[_type == "project" && defined(slug.current)].slug.current`, {}, ["project"]);
}

interface ShotRow { name: string; year: string; image: { url: string; w: number; h: number } | null; video: string | null }

export async function getShots(): Promise<Shot[]> {
  const rows = await sanityFetch<ShotRow[]>(
    `*[_type == "shot"] | ${ORDER} { name, year, "image": image ${IMG}, "video": video.asset->url }`,
    {},
    ["shot"]
  );
  return rows
    .filter((r) => r.image)
    .map((r) => ({ name: r.name, year: r.year, width: r.image!.w, height: r.image!.h, image: r.image!.url, video: r.video ?? undefined }));
}
