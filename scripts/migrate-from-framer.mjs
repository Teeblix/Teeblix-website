// One-off: seeds the Sanity dataset from the Framer CMS export that currently
// lives in scripts/framer-export. Already run once (Sept 2026); kept for reference.
// Uploads every image/video into Sanity and creates the documents in the same
// order as Framer. Safe to re-run: documents are keyed by slug/name.
//
//   SANITY_API_WRITE_TOKEN=... node scripts/migrate-from-framer.mjs
import { createClient } from "@sanity/client";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN missing");

const client = createClient({ projectId: "qbwbmjtq", dataset: "production", apiVersion: "2026-09-01", token, useCdn: false });

// Load the TS seed modules via a tiny transpile (they're plain data files).
async function loadTs(path) {
  const ts = require("typescript");
  const src = readFileSync(path, "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const url = pathToFileURL(resolve(path)).href + "?t=" + Date.now();
  const dataUrl = "data:text/javascript;base64," + Buffer.from(js.replace(/from "[^"]*types"/g, 'from "data:text/javascript,"')).toString("base64");
  void url;
  return import(dataUrl);
}

const projectsMod = await loadTs("scripts/framer-export/projects.ts");
const detailsMod = await loadTs("scripts/framer-export/project-details.ts");
const shotsMod = await loadTs("scripts/framer-export/shots-content.ts");
const projects = projectsMod.getAllProjects();
const details = detailsMod.PROJECT_DETAILS;
const shots = shotsMod.SHOTS;

const assetCache = new Map();
async function uploadFromUrl(kind, url, filename) {
  if (!url) return null;
  const key = `${kind}:${url}`;
  if (assetCache.has(key)) return assetCache.get(key);
  const isLocal = url.startsWith("/") || url.startsWith("./") || url.startsWith("/private");
  let body;
  if (isLocal) body = readFileSync(url.startsWith("/videos") || url.startsWith("/images") ? `public${url}` : url);
  else {
    const res = await fetch(url.split("?")[0]);
    if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
    body = Buffer.from(await res.arrayBuffer());
  }
  const name = filename || basename(url.split("?")[0]);
  process.stdout.write(`  ↑ ${kind} ${name} (${(body.length / 1024).toFixed(0)} KB)\n`);
  const asset = await client.assets.upload(kind, body, { filename: name });
  const ref = { _type: kind, asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(key, ref);
  return ref;
}

const block = (text) => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2, 10),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
});
const richText = (lines) => (lines?.length ? lines.map(block) : undefined);

console.log(`Migrating ${projects.length} projects…`);
let order = 0;
for (const p of projects) {
  const d = details[p.slug];
  order += 10;
  console.log(`• ${p.title}`);
  const doc = {
    _id: `project-${p.slug}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    cover: await uploadFromUrl("image", p.cover, `${p.slug}-cover${p.cover.match(/\.\w+$/)?.[0] ?? ".png"}`),
    video: p.video ? { ...(await uploadFromUrl("file", p.video, `${p.slug}${p.video.match(/\.\w+$/)?.[0] ?? ".mp4"}`)) } : undefined,
    projectType: d?.type ?? "Client project",
    year: p.year,
    industry: p.industry,
    services: d?.services ?? [],
    tools: d?.tools ?? [],
    website: d?.website ?? undefined,
    contra: d?.contra ?? undefined,
    marketplace: d?.marketplace ?? undefined,
    featured: !!p.featured,
    order,
    shortDescription: d?.description ?? "",
    about: richText(d?.about),
    largeImage1: await uploadFromUrl("image", d?.large1, `${p.slug}-large-1.png`),
    approach: richText(d?.approach),
    largeImage2: await uploadFromUrl("image", d?.large2, `${p.slug}-large-2.png`),
    smallImage1: await uploadFromUrl("image", d?.small1, `${p.slug}-small-1.png`),
    smallImage2: await uploadFromUrl("image", d?.small2, `${p.slug}-small-2.png`),
    outcome: richText(d?.outcome),
    largeImage3: await uploadFromUrl("image", d?.large3, `${p.slug}-large-3.png`),
  };
  for (const k of Object.keys(doc)) if (doc[k] === undefined || doc[k] === null) delete doc[k];
  await client.createOrReplace(doc);
}

console.log(`Migrating ${shots.length} shots…`);
const posterDir = process.env.POSTER_DIR;
order = 0;
for (const s of shots) {
  order += 10;
  const id = `shot-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${order}`;
  console.log(`• ${s.name}`);
  let image = s.image;
  if (s.video) {
    // Poster generated from the video itself so the tile keeps the video's proportions.
    const stem = basename(s.video).replace(/\.\w+$/, "");
    image = `${posterDir}/${stem}.jpg`;
  }
  const doc = {
    _id: id,
    _type: "shot",
    name: s.name,
    year: s.year,
    image: await uploadFromUrl("image", image, `${basename(image)}`),
    video: s.video ? await uploadFromUrl("file", s.video, basename(s.video)) : undefined,
    order,
  };
  if (!doc.video) delete doc.video;
  await client.createOrReplace(doc);
}
console.log("Done.");
