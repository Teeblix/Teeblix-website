// Light and dark both use the light-mode look (off-white fill, dark text);
// red mode inverts to a red fill with the page background as text.
// Colours live in globals.css under `.featured-label`.
export function FeaturedLabel() {
  return (
    <span className="featured-label absolute right-3 top-1/2 z-20 -translate-y-1/2 px-2 py-1 text-xs uppercase md:right-5">
      Featured Projects
    </span>
  );
}
