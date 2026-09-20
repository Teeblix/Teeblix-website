import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

/**
 * Fetch with Next's data cache, tagged so the Sanity webhook can revalidate
 * exactly the pages that use each content type (see /api/revalidate).
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags, revalidate: false } });
}
