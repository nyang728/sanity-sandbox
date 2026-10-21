import { notFound, redirect } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import { PAGE_QUERY } from '@/lib/queries';
import { fallbackPages } from '@/lib/fallback';
import { readQuery } from '@/lib/search';
import PageBuilder from '@/components/PageBuilder';
import RichText from '@/components/RichText';

// Any Sanity `page` document is served at /<slug> and its page-builder
// blocks are rendered in order. Fixed routes (/about, /search…) win over this.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await sanityFetch(PAGE_QUERY, { slug }, fallbackPages[slug] || null);
  return { title: page ? `${page.title} — OneTrust Sandbox Inc` : 'Not found' };
}

export default async function SanityPage({ params, searchParams }) {
  const { slug } = await params;
  if (slug === 'home') redirect('/');

  const page = await sanityFetch(PAGE_QUERY, { slug }, fallbackPages[slug] || null);
  if (!page) notFound();

  const query = readQuery((await searchParams).q);

  return (
    <article>
      <header className="page-head">
        <h1>{page.heading || page.title}</h1>
        {page.intro && <p className="lead">{page.intro}</p>}
      </header>
      {page.body && (
        <div className="prose">
          <RichText value={page.body} />
        </div>
      )}
      <PageBuilder blocks={page.pageBuilder} pagePath={`/${slug}`} query={query} />
    </article>
  );
}
