// Plain GET form, so search works without client-side JavaScript.
// `action` is the page the results show on (defaults to /search).
export default function SearchForm({ action = '/search', defaultValue = '', placeholder, autoFocus = false }) {
  return (
    <form className="search-form" action={action} method="get" role="search">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder || 'Search e.g. privacy, AI, report'}
        aria-label="Search the site"
        maxLength={100}
        autoFocus={autoFocus}
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}
