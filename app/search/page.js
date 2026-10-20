import { client, sanityFetch } from '@/lib/sanity';
import { SEARCH_QUERY } from '@/lib/queries';
import { TYPE_LABELS, resultHref, searchFallback, toSearchTerm } from '@/lib/search';

export const metadata = { title: 'Search — OneTrust Sandbox Inc' };

function truncate(text, max = 180) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default async function SearchPage({ searchParams }) {
  const { q: rawQ } = await searchParams;
  const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ || '').trim().slice(0, 100);
  const term = toSearchTerm(q);

  let results = [];
  if (term) {
    results = client ? await sanityFetch(SEARCH_QUERY, { term }, []) : searchFallback(q);
  }

  return (
    <>
      <header className="page-head">
        <h1>Search</h1>
        <p className="lead">Find pages, downloads and reports from the Sanity sandbox.</p>
      </header>

      <form className="search-form" action="/search" method="get" role="search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search e.g. privacy, AI, report"
          aria-label="Search the site"
          maxLength={100}
          autoFocus
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      {q && (
        <p className="search-count">
          {results.length === 0
            ? `No results for “${q}”.`
            : `${results.length}${results.length === 25 ? '+' : ''} result${results.length === 1 ? '' : 's'} for “${q}”`}
        </p>
      )}

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
