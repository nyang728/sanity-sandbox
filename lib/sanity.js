import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id');

// Read-only client used by pages (public, CDN-cached content)
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

// Write client used only on the server (API route) for contact submissions
export const writeClient =
  isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null;

/**
 * Fetch from Sanity, falling back to local sample data when Sanity is not
 * configured, the query fails, or the document doesn't exist yet.
 */
export async function sanityFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;
  try {
    const data = await client.fetch(query, params, { next: { revalidate: 60 } });
    return data ?? fallback;
  } catch (err) {
    console.error('[sanity] fetch failed, using fallback:', err.message);
    return fallback;
  }
}
