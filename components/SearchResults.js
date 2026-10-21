import { TYPE_LABELS, resultHref } from '@/lib/search';

function truncate(text, max = 180) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default function SearchResults({ query, results, limit = 25 }) {
  if (!query) return null;

  return (
    <>
      <p className="search-count">
        {results.length === 0
          ? `No results for “${query}”.`
          : `${results.length}${results.length === limit ? '+' : ''} result${results.length === 1 ? '' : 's'} for “${query}”`}
      </p>

      <div className="stack">
        {results.map((r) => {
          const href = resultHref(r);
          const isFile = Boolean(r.fileUrl);
          return (
            <div key={r._id} className="card search-result">
              <span className="tag">{TYPE_LABELS[r._type] || r._type}</span>
              {isFile && <span className="tag">PDF</span>}
              <h3>
                {href ? (
                  <a href={href} {...(isFile ? { download: r.fileName || true } : {})}>
                    {r.title}
                  </a>
                ) : (
                  r.title
                )}
              </h3>
              {r.summary && <p>{truncate(r.summary)}</p>}
              {!href && r.slug && <div className="resource-meta">Slug: /{r.slug} (no route on this site yet)</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
