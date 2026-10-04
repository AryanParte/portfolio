import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <div className="eyebrow">404 / PAGE NOT FOUND</div>
      <h1>Nothing here yet.</h1>
      <p>That page may have moved. You can return to the selected work.</p>
      <Link className="button primary" href="/#work">
        Back to work
      </Link>
    </main>
  );
}
