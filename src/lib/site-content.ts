/** `href` omitted = shown in the menu but not yet a page (Framer shows it the same way). */
export const NAV_LINKS: { title: string; href?: string }[] = [
  { title: "Projects", href: "/projects" },
  { title: "Shots", href: "/shots" },
  { title: "About Me", href: "/about-me" },
  { title: "Drops", href: "/drops" },
  { title: "Work With Me", href: "/work-with-me" },
];

export const EXPERIENCE = [
  "Design & Creative",
  "Health & Wellness",
  "Marketing & Communications",
  "Legal & Professional Services",
  "Technology & Web3",
  "Media & Personal Brands",
  "Lifestyle & Consumer Brands",
];

/** Two groups, separated by a short rule: what I design, then what I build. */
export const WHAT_I_DO: string[][] = [
  ["Digital Product Design", "Web Design & UX/UI", "Mobile Experience Design", "Interaction Design"],
  ["Framer Development", "Figma \u2192 Framer", "Framer SEO", "Webflow/WordPress \u2192 Framer"],
];

/** The same services as one flat list, for schema.org and metadata. */
export const SERVICES = WHAT_I_DO.flat();

export const SOCIALS = [
  { title: "LinkedIn", href: "https://www.linkedin.com/in/teeblix" },
  { title: "Instagram", href: "https://www.instagram.com/teeblix_framer.developer/" },
  { title: "X(Twitter)", href: "https://x.com/teeblix_" },
  { title: "Contra", href: "https://contra.com/blessinghardey_75grhpl2" },
  { title: "Framer", href: "https://www.framer.com/@blessing-adewale/" },
];

export const EMAIL = "hello@teeblix.com";

export const QUOTE = "The details nobody notices are the ones that make everything feel right.";
