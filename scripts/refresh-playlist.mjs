// Re-reads the public Spotify embed page for the playlist and rewrites
// src/lib/playlist.ts. Run after adding songs on Spotify:
//   node scripts/refresh-playlist.mjs
import { writeFileSync } from "node:fs";

const URL_ = "https://open.spotify.com/playlist/73ZmBB4LZ3vrUz0g95rR4R";
const id = URL_.split("/playlist/")[1].split("?")[0];
const res = await fetch(`https://open.spotify.com/embed/playlist/${id}`, {
  headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/129.0 Safari/537.36" },
});
const html = await res.text();
const data = JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)[1]);
const entity = data.props.pageProps.state.data.entity;
const tracks = entity.trackList.map((t) => ({ uri: t.uri, title: t.title, artist: t.subtitle }));

writeFileSync(
  "src/lib/playlist.ts",
  `// Tracks in "${entity.name}" (${URL_}).
// Snapshot of the playlist; refresh with scripts/refresh-playlist.mjs.
export const PLAYLIST_NAME = ${JSON.stringify(entity.name)};
export const PLAYLIST_URL = ${JSON.stringify(URL_)};

export interface Track {
  uri: string;
  title: string;
  artist: string;
}

export const TRACKS: Track[] = ${JSON.stringify(tracks, null, 2)};
`
);
console.log(`Wrote ${tracks.length} tracks from "${entity.name}".`);
