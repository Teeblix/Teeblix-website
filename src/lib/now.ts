/**
 * Content for the "NOW" modal — what's just out and what's on the bench.
 * Matches the "Now" frame on the Framer canvas. Update the month whenever the
 * items change; an item with a `project` slug gets that project's cover image
 * from Sanity and a "View project" button pointing at its page.
 */
export interface NowItem {
  /** Section label above the item: "New release", "In progress"… */
  label: string;
  title: string;
  /** The line under the title — what it is, in a few words. */
  meta: string;
  /** Slug of a project on the site. */
  project?: string;
}

export const NOW_MONTH = "November 2026";

export const NOW_ITEMS: NowItem[] = [
  { label: "New release", title: "Zara", meta: "Portfolio template, 2026", project: "zara-okafor" },
  { label: "In progress", title: "ATC Lab and Training", meta: "Client website, workplace safety" },
  { label: "In progress", title: "QuillCove", meta: "Framer template, reading spaces" },
  { label: "In progress", title: "WMPP Enterprises", meta: "Client website, notary and documents" },
];

/** Slugs the modal needs cover images for. */
export const NOW_PROJECT_SLUGS = NOW_ITEMS.flatMap((i) => (i.project ? [i.project] : []));
