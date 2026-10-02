import { sanityFetch } from "@/sanity/client";
import { PERSON_NAME, SITE_NAME, SITE_URL, projectDescription } from "@/lib/seo";

export const dynamic = "force-static";

interface Row {
  slug: string;
  title: string;
  industry: string;
  year: string;
  projectType: string;
  services: string[] | null;
  shortDescription: string | null;
  seoDescription: string | null;
  cover: string | null;
  createdAt: string;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

/** One tidy paragraph: whitespace collapsed, cut at a word boundary. */
function summarise(text: string, max = 300) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max))}…`;
}

/** RSS 2.0 feed of the published projects, newest addition first. */
export async function GET() {
  const rows = await sanityFetch<Row[]>(
    `*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
      "slug": slug.current, title, industry, year, projectType, services,
      shortDescription, seoDescription,
      "cover": cover.asset->url, "createdAt": _createdAt
    }`,
    {},
    ["project"]
  );

  const items = rows
    .map((r) => {
      const url = `${SITE_URL}/projects/${r.slug}`;
      const description = summarise(
        r.seoDescription?.trim() ||
          r.shortDescription?.trim() ||
          projectDescription(r, { type: r.projectType, services: r.services ?? [] })
      );
      const base = r.cover?.split("?")[0] ?? null;
      const cover = base ? `${base}?w=1200&auto=format&q=80` : null;
      const coverType = base?.endsWith(".png") ? "image/png" : "image/jpeg";
      return [
        "    <item>",
        `      <title>${escape(r.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(r.createdAt).toUTCString()}</pubDate>`,
        `      <category>${escape(r.industry)}</category>`,
        `      <description>${escape(description)}</description>`,
        cover ? `      <enclosure url="${escape(cover)}" type="${coverType}" length="0"/>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${PERSON_NAME} (${SITE_NAME}) — Projects`)}</title>
    <link>${SITE_URL}/projects</link>
    <description>Framer websites, landing pages and templates designed and built by ${escape(PERSON_NAME)}.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
