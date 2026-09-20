import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { LAST_UPDATED, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/shots`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about-me`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work-with-me`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/drops`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
  const projects: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...projects];
}
