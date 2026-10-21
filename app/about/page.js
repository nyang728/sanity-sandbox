import { sanityFetch } from '@/lib/sanity';
import { PAGE_QUERY } from '@/lib/queries';
import { fallbackPages } from '@/lib/fallback';
import RichText from '@/components/RichText';
import PageBuilder from '@/components/PageBuilder';
import { readQuery } from '@/lib/search';

export const metadata = { title: 'About Us — OneTrust Sandbox Inc' };

export default async function AboutPage({ searchParams }) {
  const page = await sanityFetch(PAGE_QUERY, { slug: 'about' }, fallbackPages.about);

  return (
    <article>
      <header className="page-head">
        <h1>{page.heading || page.title}</h1>
        {page.intro && <p className="lead">{page.intro}</p>}
      </header>
      {page.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`${page.imageUrl}?w=1040&fit=max`} alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 24 }} />
      )}
      <div className="prose">
        <RichText value={page.body} />
      </div>
      <PageBuilder blocks={page.pageBuilder} pagePath="/about" query={readQuery((await searchParams).q)} />
    </article>
  );
}
