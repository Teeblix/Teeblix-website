import type { Project } from "../../src/lib/types";

/**
 * TEMPORARY seed data, pulled 1:1 from the Framer CMS (same order) so the
 * site has real content while the Sanity schema/dataset is being set up.
 * Swap these for a Sanity GROQ query once that's wired up — the shape below
 * is what the Sanity `project` document type should match.
 */
const F = "https://framerusercontent.com";

const projects: Project[] = [
  { slug: "designr", title: "Designr", industry: "Design Studio", year: "2025", cover: `${F}/images/SDu1EAe9rNSJANuKID3JLCrLM.png`, video: `${F}/assets/NZvUfwPiI2oJK7cOQ4K0tDo85tM.webm`, featured: true, aspect: 4 / 3 },
  { slug: "animax", title: "AnimaX", industry: "Art and Production Studio", year: "2026", cover: `${F}/images/DR7vi4rV7j7YnsViCz7pEvkR2g.png`, video: null, featured: true, aspect: 4 / 3 },
  { slug: "the-relationship-room", title: "The Relationship Room", industry: "Health & Wellness", year: "2024", cover: `${F}/images/RZxhYwflDGSq7uUvLCgwLTjexO8.png`, video: null, featured: true, aspect: 4 / 3 },
  { slug: "glyph-co", title: "Glyph Co.", industry: "Design Studio", year: "2024", cover: `${F}/images/jyj1JYBfjRA01Klurn3zchmGqBU.png`, video: `${F}/assets/MoFObluEzr9uucnICrG1del6w7k.webm`, featured: true, aspect: 4 / 3 },
  { slug: "the-counselling-room", title: "The Counselling Room", industry: "Health & Wellness", year: "2024", cover: `${F}/images/PMj47iSNiHGZGng3ZnQqLhG8eQc.png`, video: null, featured: false, aspect: 4 / 3 },
  { slug: "velara", title: "Velara", industry: "Dance Artist Portfolio", year: "2026", cover: `${F}/images/kSeT7XxNUZ4PGmglRxEhAhYWJM.png`, video: `${F}/assets/p8Xnby6RQlVa6eQVYix0ALWHgLE.mp4`, featured: true, aspect: 4 / 3 },
  { slug: "the-mediation-room", title: "The Mediation Room", industry: "Health & Wellness", year: "2024", cover: `${F}/images/e7JmrOpankaR6ZgJx580pHxTdu8.png`, video: null, featured: false, aspect: 4 / 3 },
  { slug: "m2z-compliance-solutions", title: "M2Z Compliance Solutions", industry: "Legal & Compliance", year: "2023", cover: `${F}/images/b25B9l0VORAhoZ5iXnjbNndJ4.png`, video: null, featured: false, aspect: 1.5329 },
  { slug: "midian-solutionz", title: "Midian Solutionz", industry: "Diaspora & Concierge Services", year: "2023", cover: `${F}/images/VtqU9RxUvA2rX2teemBrjBUN4.png`, video: null, featured: true, aspect: 4 / 3 },
  { slug: "kindra", title: "Kindra", industry: "Health & Wellness", year: "2024", cover: `${F}/images/7BbZVYQ8WLJlAxy18nWvy8UqOoE.png`, video: `${F}/assets/XGawsFqi8SCsWcsUoUnyd3yElU4.webm`, featured: true, aspect: 1.8 },
  { slug: "willow-grace", title: "Willow Grace", industry: "Health & Wellness", year: "2024", cover: `${F}/images/Aol2uUXsKNhwYVIt06evwjG3m0.png`, video: null, featured: false, aspect: 1.5015 },
  { slug: "sabrina-co-nz", title: "Sabrina", industry: "Personal Portfolio", year: "2024", cover: `${F}/images/FZ0AObLcJojfzMxKY6VYohFcFU.png`, video: null, featured: true, aspect: 4 / 3 },
  { slug: "vooks", title: "Vooks", industry: "Finance & Accounting", year: "2025", cover: `${F}/images/jeKIPPhEOscRcFNGVNbiiNIuw.png`, video: `${F}/assets/iNBN592Nmre8ElNDdZNDLjTb4.webm`, featured: true, aspect: 4 / 3 },
  { slug: "convrt", title: "Convrt", industry: "Marketing & Sales", year: "2025", cover: `${F}/images/1gowpQaqWl9Kntt2Si23NYkFoc.png`, video: null, featured: false, aspect: 4 / 3 },
  { slug: "patina", title: "Patina", industry: "Real Estate & Auctions", year: "2025", cover: `${F}/images/9CEklTVaOdipKQC740pEFZsQHg.png`, video: `${F}/assets/uwRssBQMJbDmDPISET28U0bTuw.mp4`, featured: true, aspect: 1.4927 },
  { slug: "gamme", title: "Gamme", industry: "Personal Branding Agency", year: "Aug - Sep. 2025", cover: `${F}/images/RywxqAjsEqBPtxsUcgb9P0ABRU.png`, video: null, featured: false, aspect: 4 / 3 },
  { slug: "the-moss", title: "The Moss", industry: "Arts & Culture", year: "2023", cover: `${F}/images/MxmyJsEZjeLpGnsl62YpT73lm4.jpeg`, video: null, featured: false, aspect: 1.5015 },
  { slug: "dayo-venn", title: "Dayo Venn", industry: "Design Studio", year: "2023", cover: `${F}/images/2Rf6ErDONfXzMnNk5F83VnvLjMo.jpg`, video: null, featured: false, aspect: 4 / 3 },
  { slug: "suikido", title: "Suikido", industry: "Health & Wellness", year: "2023", cover: `${F}/images/EsKUzGth0yvbV4yg4NW8xs5VLxA.jpg`, video: `${F}/assets/kYLQy9cu5lHzZqlSuBGccEf67Vw.webm`, featured: true, aspect: 1.7778 },
];

export function getFeaturedProjects(limit = 10): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function getAllProjects(): Project[] {
  return projects;
}
