import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Header, Footer } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: 'Aryan Parte — Software Engineer',
    template: '%s | Aryan Parte',
  },
  description: site.description,
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  authors: [{ name: site.name }],
  openGraph: {
    title: 'Aryan Parte — Software Engineer',
    description: site.description,
    type: 'website',
    locale: 'en_US',
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: 'summary',
    title: 'Aryan Parte — Software Engineer',
    description: site.description,
  },
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="page-shell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
