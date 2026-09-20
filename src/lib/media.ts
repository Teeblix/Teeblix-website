/**
 * A resized variant of a CDN-hosted image: Sanity (`w` + auto format) or the
 * old Framer host; other URLs are returned as-is.
 */
export function sized(url: string, width: number): string {
  if (url.includes("cdn.sanity.io")) {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("auto", "format");
    u.searchParams.set("q", "80");
    return u.toString();
  }
  if (url.includes("framerusercontent.com")) return `${url.split("?")[0]}?scale-down-to=${width}`;
  return url;
}
