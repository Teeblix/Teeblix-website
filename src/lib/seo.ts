import type { Metadata } from "next";
import { EMAIL, SOCIALS } from "./site-content";

export const SITE_URL = "https://teeblix.com";
export const SITE_NAME = "Teeblix";
export const PERSON_NAME = "Blessing Adewale";
export const ROLE = "Designer & Framer Developer";

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
  const fullTitle = path === "/" ? `${PERSON_NAME} (${SITE_NAME}) — ${ROLE}` : `${title} — ${PERSON_NAME} (${SITE_NAME})`;
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
      jobTitle: ROLE,
      description:
        "Independent UX/UI designer and Framer developer based in Nigeria, building websites, digital experiences and visual systems for clients worldwide.",
      url: SITE_URL,
      email: `mailto:${EMAIL}`,
      image: `${SITE_URL}/images/about/portrait-desktop.jpg`,
      address: { "@type": "PostalAddress", addressCountry: "NG" },
      knowsAbout: ["Web design", "UX/UI design", "Framer development", "Interaction design", "Figma to Framer", "Framer SEO"],
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
