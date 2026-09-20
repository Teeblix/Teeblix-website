/** A resized variant of a Framer-hosted image; other hosts are returned as-is. */
export function sized(url: string, width: number): string {
  if (!url.includes("framerusercontent.com")) return url;
  return `${url.split("?")[0]}?scale-down-to=${width}`;
}
