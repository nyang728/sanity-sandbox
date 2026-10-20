import { fallbackPages, fallbackResources } from './fallback';

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
  if (r._type === 'page' && PAGE_ROUTES[r.slug]) return PAGE_ROUTES[r.slug];
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
