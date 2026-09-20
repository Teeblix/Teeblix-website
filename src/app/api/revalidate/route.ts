import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Called by the Sanity webhook on every publish/unpublish. Marks the cached
// queries for that content type stale so the affected pages rebuild on the
// next request — no redeploy needed.
type Payload = { _type: string; slug?: string | null };

const PATHS: Record<string, string[]> = {
  project: ["/", "/projects", "/sitemap.xml"],
  shot: ["/shots"],
  drop: ["/drops", "/sitemap.xml"],
};
const DETAIL: Record<string, string> = { project: "/projects", drop: "/drops" };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<Payload>(req, process.env.SANITY_WEBHOOK_SECRET);
    if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });
    if (!body?._type) return new NextResponse("Bad request", { status: 400 });

    const tags = [body._type];
    if (body.slug) tags.push(`${body._type}:${body.slug}`);
    for (const tag of tags) revalidateTag(tag, { expire: 0 });

    // Belt and braces: also purge the routes that render this type.
    const paths = PATHS[body._type] ?? [];
    if (body.slug && body._type in DETAIL) paths.push(`${DETAIL[body._type]}/${body.slug}`);
    for (const path of paths) revalidatePath(path);

    return NextResponse.json({ revalidated: true, tags, paths, now: Date.now() });
  } catch (err) {
    console.error("[revalidate]", err);
    return new NextResponse("Error", { status: 500 });
  }
}
