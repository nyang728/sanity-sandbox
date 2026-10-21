import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { runSearch } from '@/lib/search';

// Renders a `searchBlock` from a Sanity page builder. The form submits back
// to the current page (`pagePath`) so results appear inside the block.
export default async function SearchBlock({ block, pagePath, query }) {
  const limit = block.limit || 10;
  const results = await runSearch(query, { types: block.contentTypes, limit });

  return (
    <section className="block search-block">
      {block.heading && <h2>{block.heading}</h2>}
      {block.intro && <p className="lead">{block.intro}</p>}
      <SearchForm action={pagePath} defaultValue={query} placeholder={block.placeholder} />
      <SearchResults query={query} results={results} limit={limit} />
    </section>
  );
}
