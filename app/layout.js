import Link from 'next/link';
import Nav from '@/components/Nav';
import { isSanityConfigured, projectId, dataset } from '@/lib/sanity';
import './globals.css';

export const metadata = {
  title: 'OneTrust Sandbox Inc',
  description: 'Demo Next.js site connected to a Sanity sandbox',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden="true" />
              OneTrust Sandbox Inc
            </Link>
            <Nav />
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="container">
            <span>© 2026 OneTrust Sandbox Inc — a fake site for testing.</span>
            <span className="status">
              <span className={`dot ${isSanityConfigured ? 'on' : ''}`} />
              {isSanityConfigured
                ? `Connected to Sanity: ${projectId} / ${dataset}`
                : 'Sanity not configured — showing sample content'}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
