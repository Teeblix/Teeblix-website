export interface Project {
  slug: string;
  title: string;
  industry: string;
  year: string;
  cover: string;
  video: string | null;
  featured: boolean;
  /** Cover aspect ratio (width / height), used for masonry layout before load. */
  aspect: number;
}

export interface ProjectDetail {
  type: string;
  services: string[];
  tools: string[];
  website: string | null;
  marketplace: string | null;
  contra: string | null;
  description: string;
  about: string[];
  approach: string[];
  outcome: string[];
  large1: string | null;
  large2: string | null;
  small1: string | null;
  small2: string | null;
  large3: string | null;
}

/** A Shots-wall tile; intrinsic size drives the masonry layout before media loads. */
export interface Shot {
  name: string;
  year: string;
  /** Intrinsic pixel size, used for the masonry layout before media loads. */
  width: number;
  height: number;
  image?: string;
  video?: string;
}
