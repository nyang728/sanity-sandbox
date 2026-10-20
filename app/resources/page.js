import { sanityFetch } from '@/lib/sanity';
import { PAGE_QUERY, RESOURCES_QUERY } from '@/lib/queries';
import { fallbackPages, fallbackResources } from '@/lib/fallback';

export const metadata = { title: 'Resources — OneTrust Sandbox Inc' };

function formatSize(bytes) {
  if (!bytes) return null;
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

// Sanity CDN forces a download when ?dl=<filename> is appended
function downloadUrl(r) {
  if (r.fileUrl?.startsWith('https://cdn.sanity.io')) {
    return `${r.fileUrl}?dl=${encodeURIComponent(r.fileName || '')}`;
  }
  return r.fileUrl;
}

export default async function ResourcesPage() {
  const [page, fetched] = await Promise.all([
    sanityFetch(PAGE_QUERY, { slug: 'resources' }, fallbackPages.resources),
    sanityFetch(RESOURCES_QUERY, {}, fallbackResources),
  ]);
  const resources = fetched?.length ? fetched : fallbackResources;

  return (
    <>
      <header className="page-head">
        <h1>{page.heading || page.title}</h1>
        <p className="lead">{page.intro}</p>
      </header>

      <div className="stack">
        {resources.map((r) => (
          <div key={r._id} className="card resource">
            <div>
              <h3>{r.title}</h3>
              {r.description && <p>{r.description}</p>}
              <div className="resource-meta">
                {r.category && <span className="tag" style={{ textTransform: "capitalize" }}>{r.category}</span>}
                PDF
                {formatSize(r.fileSize) && ` · ${formatSize(r.fileSize)}`}
                {r.publishedAt && ` · ${new Date(r.publishedAt).toLocaleDateString('en-US', { dateStyle: 'medium', timeZone: 'UTC' })}`}
              </div>
            </div>
            {r.fileUrl ? (
              <a className="btn btn-primary" href={downloadUrl(r)} download={r.fileName || true}>
                Download PDF
              </a>
            ) : (
              <span className="resource-meta">No file attached</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
