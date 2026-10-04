import Link from 'next/link';
import { site } from '@/content/site';
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="identity" aria-label="Aryan Parte home">
        <span className="monogram" aria-hidden="true">
          ap<span>.</span>
        </span>
        <span>Aryan Parte</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#sports">Sports & data</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="nav-contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Aryan Parte</span>
      <a href={site.github}>GitHub</a>
    </footer>
  );
}
