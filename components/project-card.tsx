import Link from 'next/link';
import type { Project } from '@/content/projects';
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      data-reveal
      className={`project-card ${featured ? 'project-card-featured' : ''}`}
    >
      <div className="project-card-head">
        <span className="eyebrow">{project.category}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <div>
        <h3>
          <Link href={`/projects/${project.slug}/`}>{project.shortName}</Link>
        </h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-card-bottom">
        <div className="tags" aria-label="Technologies">
          {project.tags.slice(0, featured ? 4 : 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link className="text-link" href={`/projects/${project.slug}/`}>
          Read case study<span className="sr-only">: {project.name}</span>
        </Link>
      </div>
    </article>
  );
}
