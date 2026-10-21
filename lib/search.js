import { fallbackPages, fallbackResources } from './fallback';
import { client, sanityFetch } from './sanity';
import { SEARCH_QUERY } from './queries';

// Routes this site actually has, keyed by Sanity page slug
const PAGE_ROUTES = { home: '/', about: '/about', contact: '/contact', resources: '/resources' };

export const TYPE_LABELS = {
  page: 'Page',
  resource: 'Resource',
  download: 'Download',
  report: 'Report',
  post: 'Article',
  product: 'Product',
  solution: 'Solution',
  industry: 'Industry',
  glossaryTerm: 'Glossary',
  faq: 'FAQ',
  customerStory: 'Customer story',
};

export const DEFAULT_SEARCH_TYPES = Object.keys(TYPE_LABELS);
const MAX_RESULTS = 25;

// Reads the `q` search param into a trimmed, length-limited string.
export function readQuery(rawQ) {
  return (Array.isArray(rawQ) ? rawQ[0] : rawQ || '').trim().slice(0, 100);
}

/**
 * Runs a search against Sanity (or the local sample content when Sanity
 * isn't configured). `types` limits which document types are searched.
 */
export async function runSearch(q, { types, limit = MAX_RESULTS } = {}) {
  const term = toSearchTerm(q);
  if (!term) return [];
  const searchTypes = types?.length ? types : DEFAULT_SEARCH_TYPES;
  const max = Math.min(Math.max(1, limit || MAX_RESULTS), MAX_RESULTS);
  const results = client
    ? await sanityFetch(SEARCH_QUERY, { term, types: searchTypes }, [])
    : searchFallback(q).filter((r) => searchTypes.includes(r._type));
  return results.slice(0, max);
}

// Turns a raw search box value into a safe GROQ match term.
export function toSearchTerm(q) {
  const cleaned = q.replace(/[^\p{L}\p{N}\s-]/gu, ' ').trim().replace(/\s+/g, ' ');
  return cleaned ? `${cleaned}*` : '';
}

// Where a result should link to on this site, if anywhere.
export function resultHref(r) {
  if (r.fileUrl) {
    return r.fileUrl.startsWith('https://cdn.sanity.io')
      ? `${r.fileUrl}?dl=${encodeURIComponent(r.fileName || '')}`
      : r.fileUrl;
  }
  if (r._type === 'page' && r.slug) return PAGE_ROUTES[r.slug] || `/${r.slug}`;
  return null;
}

// Simple local search used when Sanity isn't configured.
export function searchFallback(q) {
  const needle = q.toLowerCase();
  const pages = Object.entries(fallbackPages).map(([slug, p]) => ({
    _id: `page-${slug}`,
    _type: 'page',
    slug,
    title: p.heading || p.title,
    summary: [p.intro, ...(p.body || [])].join(' '),
  }));
  const resources = fallbackResources.map((r) => ({ ...r, _type: 'resource', summary: r.description }));
  return [...pages, ...resources].filter((r) =>
    `${r.title} ${r.summary}`.toLowerCase().includes(needle)
  );
}
