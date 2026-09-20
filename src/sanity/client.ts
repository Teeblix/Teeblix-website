import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Next caches every query itself (tagged, see below), so read straight from the
// API rather than Sanity's CDN — otherwise a publish can serve stale data for a minute.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

/**
 * Fetch with Next's data cache, tagged so the Sanity webhook can revalidate
 * exactly the pages that use each content type (see /api/revalidate).
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags, revalidate: false } });
}
