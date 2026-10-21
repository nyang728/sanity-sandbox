import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { readQuery, runSearch } from '@/lib/search';

export const metadata = { title: 'Search — OneTrust Sandbox Inc' };

export default async function SearchPage({ searchParams }) {
  const q = readQuery((await searchParams).q);
  const results = await runSearch(q);

  return (
    <>
      <header className="page-head">
        <h1>Search</h1>
        <p className="lead">Find pages, downloads and reports from the Sanity sandbox.</p>
      </header>
      <SearchForm defaultValue={q} autoFocus />
      <SearchResults query={q} results={results} />
    </>
  );
}
