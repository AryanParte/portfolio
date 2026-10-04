import Link from 'next/link';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { ProjectCard } from '@/components/project-card';

const nfl = projects[0];
export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="intro-title">
        <div className="eyebrow">
          <span className="small-line" />
          SOFTWARE ENGINEERING / APPLIED AI / DATA
        </div>
        <h1 id="intro-title">
          Building intelligent,
          <br />
          <span>data-driven systems.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I’m <strong>Aryan Parte</strong>. I build software that turns
            complex data into useful products—from reliable backend systems to a
            growing body of work in football and basketball.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="#work">
              Explore my work
            </Link>
            <a
              className="text-link"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-context">
          <span>
            Currently <strong>Software Engineer</strong>
          </span>
          <span>
            Ally Financial <span className="muted">through Cognizant</span>
          </span>
        </div>
      </section>

      <section id="work" className="section" aria-labelledby="work-title">
        <div className="section-heading">
          <div className="eyebrow">01 / SELECTED WORK</div>
          <h2 id="work-title">Engineering, in practice.</h2>
          <p>
            Systems with a clear problem, a tested path through the data, and
            honest boundaries.
          </p>
        </div>
        <article className="flagship">
          <div className="flagship-copy">
            <div className="card-top">
              <span className="eyebrow">SPORTS ENGINEERING</span>
              <span className="status">In development</span>
            </div>
            <h3>{nfl.name}</h3>
            <p>{nfl.summary}</p>
            <div className="tags">
              <span>Python</span>
              <span>nflverse</span>
              <span>Data provenance</span>
            </div>
            <Link className="text-link" href={`/projects/${nfl.slug}/`}>
              Explore the case study
            </Link>
          </div>
          <div
            className="pipeline-panel"
            aria-label="Implemented NFL reporting flow"
          >
            <div className="eyebrow">FROM SOURCE TO REPORT</div>
            <ol className="pipeline">
              <li>
                <span>01</span>
                <div>
                  <strong>Pin the source</strong>
                  <small>Verified 2024 snapshot and manifest</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Define the situation</strong>
                  <small>Role · week cutoff · pre-play context</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Report the evidence</strong>
                  <small>Tendencies · EPA · sample sizes</small>
                </div>
              </li>
            </ol>
            <p className="diagram-note">
              Implemented CSV / snapshot → JSON pipeline · interface on roadmap
            </p>
          </div>
        </article>
        <div className="project-grid">
          {projects.slice(1).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        id="sports"
        className="section sports-section"
        aria-labelledby="sports-title"
      >
        <div className="section-heading">
          <div className="eyebrow">02 / SPORTS & DATA</div>
          <h2 id="sports-title">The sports work is growing.</h2>
          <p>
            Football and basketball are where I’m applying the same engineering
            discipline to a new class of decisions.
          </p>
        </div>
        <div className="sports-layout">
          <div className="sports-statement">
            <span className="big-index">01</span>
            <h3>Start with a trustworthy measurement.</h3>
            <p>
              The NFL platform already handles source integrity, historical
              selection, football definitions, and sample accounting. The next
              stages will extend the analysis before adding a polished brief and
              interface.
            </p>
            <Link className="text-link" href={`/projects/${nfl.slug}/`}>
              Current NFL work
            </Link>
          </div>
          <div className="sports-rail">
            <div className="rail-item">
              <span>NOW</span>
              <strong>Opponent intelligence</strong>
              <p>Reproducible NFL tendency reports and situational cohorts.</p>
            </div>
            <div className="rail-item">
              <span>IN THE ROADMAP</span>
              <strong>Broader NFL analysis</strong>
              <p>
                Matched baselines, uncertainty, and richer football questions
                after the reporting foundation.
              </p>
            </div>
            <div className="rail-item">
              <span>FUTURE DIRECTION</span>
              <strong>Basketball data products</strong>
              <p>
                NBA engineering and applied ML work will join this collection as
                it exists.
              </p>
            </div>
          </div>
        </div>
        <div className="sports-note">
          <span className="eyebrow">EARLIER EXPLORATION</span>
          <p>
            A{' '}
            <a
              href="https://github.com/AryanParte/FantasyFootball"
              target="_blank"
              rel="noopener noreferrer"
            >
              fantasy football data-mining notebook
            </a>{' '}
            explored draft position and player performance. It is coursework,
            separate from the newer engineering platform.
          </p>
        </div>
      </section>

      <section
        id="about"
        className="section about-section"
        aria-labelledby="about-title"
      >
        <div className="section-heading">
          <div className="eyebrow">03 / EXPERIENCE & CAPABILITIES</div>
          <h2 id="about-title">A foundation across systems and AI.</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              My work spans backend architecture, applied AI, and data products.
              I currently work as a software engineer at Cognizant on an Ally
              Financial engineering team. Earlier software and AI experience
              includes Theorem Labs and Kirdar.
            </p>
            <p>
              I’m especially interested in the point where dependable
              engineering makes analytical work useful: source contracts,
              repeatable pipelines, transparent methods, and interfaces that
              help people make decisions.
            </p>
          </div>
          <div className="experience-list" aria-label="Professional experience">
            <div>
              <span>NOW</span>
              <strong>Software Engineer</strong>
              <p>Cognizant · Ally Financial team</p>
            </div>
            <div>
              <span>PREVIOUSLY</span>
              <strong>Software & AI work</strong>
              <p>Theorem Labs · Kirdar</p>
            </div>
          </div>
        </div>
        <div className="capabilities" aria-label="Core capabilities">
          <div>
            <span>01</span>
            <strong>Software & backend</strong>
            <p>TypeScript, Python, Java, REST APIs, PostgreSQL, Docker</p>
          </div>
          <div>
            <span>02</span>
            <strong>Data systems</strong>
            <p>
              Validation, provenance, Kafka, repeatable pipelines, analytics
            </p>
          </div>
          <div>
            <span>03</span>
            <strong>Applied AI & ML</strong>
            <p>LLM product flows, modeling, evaluation, interfaces</p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section contact-section"
        aria-labelledby="contact-title"
      >
        <div>
          <div className="eyebrow">04 / CONTACT</div>
          <h2 id="contact-title">Let’s connect.</h2>
          <p>
            For software engineering, applied AI, or data product conversations,
            reach me through the links below.
          </p>
        </div>
        <div className="contact-links">
          {site.email ? (
            <a href={`mailto:${site.email}`}>
              Email <span>{site.email}</span>
            </a>
          ) : (
            <span className="contact-placeholder">
              Email <span>Address available on request</span>
            </span>
          )}
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub <span>@AryanParte</span>
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span>aryanparte</span>
          </a>
        </div>
      </section>
    </main>
  );
}
