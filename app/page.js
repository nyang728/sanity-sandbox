import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import { PAGE_QUERY } from '@/lib/queries';
import { fallbackPages } from '@/lib/fallback';

export default async function HomePage() {
  const page = await sanityFetch(PAGE_QUERY, { slug: 'home' }, fallbackPages.home);

  return (
    <>
      <section className="hero">
        <h1>{page.heading || page.title}</h1>
        <p className="lead">{page.intro}</p>
        <div className="actions">
          <Link href="/resources" className="btn btn-primary">Browse resources</Link>
          <Link href="/contact" className="btn btn-secondary">Contact us</Link>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <Link href="/about" className="card-link">
            <h3>About Us →</h3>
            <p>Who we are, pulled from a Sanity “page” document.</p>
          </Link>
        </div>
        <div className="card">
          <Link href="/resources" className="card-link">
            <h3>Resources →</h3>
            <p>Download PDFs uploaded as Sanity file assets.</p>
          </Link>
        </div>
        <div className="card">
          <Link href="/contact" className="card-link">
            <h3>Contact →</h3>
            <p>A form that writes submissions back into Sanity.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
