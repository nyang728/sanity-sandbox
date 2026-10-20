import { sanityFetch } from '@/lib/sanity';
import { PAGE_QUERY } from '@/lib/queries';
import { fallbackPages } from '@/lib/fallback';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contact — OneTrust Sandbox Inc' };

export default async function ContactPage() {
  const page = await sanityFetch(PAGE_QUERY, { slug: 'contact' }, fallbackPages.contact);

  return (
    <>
      <header className="page-head">
        <h1>{page.heading || page.title}</h1>
        <p className="lead">{page.intro}</p>
      </header>
      <ContactForm />
    </>
  );
}
