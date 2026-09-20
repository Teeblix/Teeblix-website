export interface Shot {
  name: string;
  year: string;
  /** Intrinsic pixel size, used for the masonry layout before media loads. */
  width: number;
  height: number;
  image?: string;
  video?: string;
}

// Same order as the ShotsWall instance on the Framer site.
export const SHOTS: Shot[] = [
  { name: "Nicolai Sorensen", year: "2025", width: 4800, height: 3600, image: "/images/shots/nicolai-sorensen.jpg" },
  { name: "Vooks", year: "2026", width: 1440, height: 1080, video: "/videos/shots/vooks.webm" },
  { name: "Velara", year: "2025", width: 3200, height: 2400, image: "/images/shots/velara.jpg" },
  { name: "Discovery call button", year: "2025", width: 3200, height: 2400, image: "/images/shots/discovery-call-button.jpg" },
  { name: "GAMME AGENCY", year: "2025", width: 3200, height: 2400, image: "/images/shots/gamme-agency.jpg" },
  { name: "Aurora", year: "2024", width: 3084, height: 2024, image: "/images/shots/aurora.jpg" },
  { name: "The moss", year: "2026", width: 3200, height: 2400, image: "/images/shots/the-moss.jpg" },
  {
    name: "Willow Grace",
    year: "2025",
    width: 1788,
    height: 1080,
    video: "/videos/shots/willow-grace.mp4",
    image: "/images/shots/willow-grace-poster.jpg",
  },
  { name: "Patina", year: "2026", width: 3200, height: 2400, image: "/images/shots/patina.jpg" },
  { name: "Glyph Co.", year: "2026", width: 3200, height: 2400, image: "/images/shots/glyph-co.jpg" },
  { name: "Convrt", year: "2026", width: 3200, height: 2400, image: "/images/shots/convrt.jpg" },
  { name: "Zara Okafor", year: "2026", width: 2160, height: 2700, image: "/images/shots/zara-okafor.jpg" },
  { name: "Patina", year: "2026", width: 3200, height: 2400, image: "/images/shots/patina-2.jpg" },
  {
    name: "Vooks",
    year: "2026",
    width: 1440,
    height: 1080,
    video: "/videos/shots/vooks-2.mp4",
    image: "/images/shots/vooks-2-poster.jpg",
  },
];
