import type { Metadata } from "next";
import { EMAIL, SOCIALS } from "./site-content";

export const SITE_URL = "https://teeblix.com";
export const SITE_NAME = "Teeblix";
export const PERSON_NAME = "Blessing Adewale";
export const ROLE = "Designer & Framer Developer";
/** Search-facing role phrasing (from keyword research): used in titles/descriptions, not the visible tagline. */
export const SEO_ROLE = "Independent Designer, Framer Developer";

/** Stamped at build time; used as dateModified in JSON-LD and lastmod in the sitemap. */
export const LAST_UPDATED = new Date().toISOString();

const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: `${PERSON_NAME} (${SITE_NAME}) — ${ROLE}` };

interface PageMeta {
  title: string;
  description: string;
  /** Route path, e.g. "/projects". */
  path: string;
  image?: string;
}

/** Shared per-page metadata: canonical URL, Open Graph and Twitter card. */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const fullTitle = path === "/" ? `${PERSON_NAME} (${SITE_NAME}) - ${SEO_ROLE}` : `${title} — ${PERSON_NAME} (${SITE_NAME})`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : [OG_IMAGE];
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
      creator: "@teeblix_",
    },
  };
}

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Site-wide JSON-LD: the person behind the site and the site itself. */
export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON_NAME,
      alternateName: SITE_NAME,
      jobTitle: SEO_ROLE,
      description:
        "Freelance website designer and Framer developer based in Nigeria, working with clients worldwide. Custom Framer websites, landing pages, Figma to Framer conversion, WordPress and Webflow to Framer migration, Framer templates and Framer commerce.",
      url: SITE_URL,
      email: `mailto:${EMAIL}`,
      image: `${SITE_URL}/images/about/portrait-desktop-2.jpg`,
      address: { "@type": "PostalAddress", addressCountry: "NG" },
      knowsAbout: [
        "Web design",
        "Website design",
        "UX/UI design",
        "Framer development",
        "Framer websites",
        "Framer templates",
        "Framer portfolio websites",
        "Landing page design",
        "Interaction design",
        "Figma to Framer conversion",
        "WordPress to Framer migration",
        "Webflow to Framer migration",
        "Framer SEO",
        "Framer commerce and ecommerce website design",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Website Designer and Framer Developer",
        occupationLocation: { "@type": "Country", name: "Nigeria" },
        skills: "Framer, Figma, UX/UI design, landing page design, interaction design, web design",
      },
      areaServed: "Worldwide",
      sameAs: SOCIALS.map((s) => s.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
      dateModified: LAST_UPDATED,
    },
  ];
}

/** Per-page JSON-LD WebPage node with freshness signal. */
export function webPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
  extra = {},
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "ProfilePage" | "CollectionPage" | "ContactPage" | "ItemPage";
  extra?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    dateModified: LAST_UPDATED,
    ...extra,
  };
}

/**
 * Meta description for a project page, composed from the structured CMS
 * fields (type, industry, services) rather than the free-text summary, and
 * phrased around the searched terms ("Framer template", "Framer website",
 * "Framer Marketplace"). Kept within 160 characters.
 */
export function projectDescription(p: { title: string; industry: string }, d: { type: string; services: string[] }): string {
  const industry = p.industry.replace(/\b(?!UX|UI|US|DOT)([A-Z])([a-z]+)/g, (_, a, b) => a.toLowerCase() + b);
  const isTemplate = /template/i.test(d.type);
  const services = d.services
    .filter((s) => !/framer template/i.test(s))
    .map((s) => s.replace(/\b(?!UX|UI|CMS|Framer)([A-Z])([a-z]+)/g, (_, a, b) => a.toLowerCase() + b))
    .join(", ");
  const base = isTemplate
    ? `${p.title}: a ${industry} Framer template by Blessing Adewale (Teeblix), available on the Framer Marketplace`
    : `${p.title}: ${industry} website designed and built in Framer by Blessing Adewale (Teeblix)`;
  const full = `${base} — ${services}.`;
  return full.length <= 160 ? full : `${base}.`;
}
