import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, projectBySlug } from '@/content/projects';
import { site } from '@/content/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projectBySlug[(await params).slug];
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name,
    description: project.summary,
    ...(site.url
      ? { alternates: { canonical: `${site.url}/projects/${project.slug}/` } }
      : {}),
    openGraph: {
      title: `${project.name} | Aryan Parte`,
      description: project.summary,
      type: 'article',
      ...(site.url ? { url: `${site.url}/projects/${project.slug}/` } : {}),
    },
    twitter: {
      card: 'summary',
      title: `${project.name} | Aryan Parte`,
      description: project.summary,
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const project = projectBySlug[(await params).slug];
  if (!project) notFound();
  const next =
    projects[
      (projects.findIndex((item) => item.slug === project.slug) + 1) %
        projects.length
    ];
  return (
    <main id="main" className="case-page">
      <div className="breadcrumb">
        <Link href="/#work">Selected work</Link>
        <span aria-hidden="true">/</span>
        <span>{project.shortName}</span>
      </div>
      <header className="case-hero">
        <div className="case-kicker">
          <span className="eyebrow">
            {project.category.toUpperCase()} / {project.year}
          </span>
          <span className="status">{project.status}</span>
        </div>
        <h1>{project.name}</h1>
        <p className="case-deck">{project.summary}</p>
        <div className="case-actions">
          <a
            className="button primary"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository
          </a>
          <Link className="text-link" href="/#work">
            All selected work
          </Link>
        </div>
      </header>
      <div className="case-layout">
        <aside className="case-aside">
          <div className="aside-block">
            <span className="eyebrow">AT A GLANCE</span>
            <p>{project.audience}</p>
          </div>
          <div className="aside-block">
            <span className="eyebrow">STACK</span>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="aside-block">
            <span className="eyebrow">STATUS</span>
            <p>{project.status}</p>
          </div>
        </aside>
        <div className="case-content">
          <section className="case-section">
            <div className="case-label">01 / THE PROBLEM</div>
            <h2>Make the work useful.</h2>
            <p>{project.intro}</p>
          </section>
          <section className="case-section">
            <div className="case-label">02 / DATA & PROVENANCE</div>
            <h2>Know what went in.</h2>
            <p>{project.data}</p>
          </section>
          <section className="case-section">
            <div className="case-label">03 / ARCHITECTURE</div>
            <h2>From input to outcome.</h2>
            <ol className="case-flow">
              {project.flow.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section className="case-section">
            <div className="case-label">04 / ENGINEERING DECISIONS</div>
            <h2>Choices that shaped it.</h2>
            <div className="decision-list">
              {project.decisions.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="case-section">
            <div className="case-label">05 / VALIDATION</div>
            <h2>What was checked.</h2>
            <ul className="prose-list">
              {project.validation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="case-section">
            <div className="case-label">06 / RESULTS</div>
            <h2>What exists today.</h2>
            <ul className="prose-list">
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="case-section limitation-section">
            <div className="case-label">07 / LIMITATIONS</div>
            <h2>Where the evidence ends.</h2>
            <ul className="prose-list">
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="case-section source-section">
            <div className="case-label">08 / SOURCE</div>
            <h2>Inspect the work.</h2>
            <div className="source-links">
              {project.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="next-project">
        <span className="eyebrow">NEXT CASE STUDY</span>
        <Link href={`/projects/${next.slug}/`}>
          {next.shortName}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
