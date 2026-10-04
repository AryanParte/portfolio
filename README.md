# Aryan Parte — portfolio

A project-led portfolio for software engineering, applied AI, and reproducible sports data work. The site is built with Next.js App Router, TypeScript, and plain CSS. It exports to static files; there is no server, database, or paid API dependency.

## Run locally

Use Node.js 20.19+ (or another version supported by the installed Next.js release).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production export and local preview:

```sh
npm run build
npx serve out
```

Checks:

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
```

## Content model

- `content/projects.ts` holds the selected projects, case-study sections, and sports roadmap. Add a new object with a unique `slug` to generate a case-study route, homepage card, and (for sports projects) an item in the sports section. Update the roadmap entries in the same data file as milestones are completed.
- `content/site.ts` holds the name, profile links, and contact email. `email` is intentionally empty until Aryan supplies a verified public address. The homepage shows “Address available on request” meanwhile; no invented email link is shipped.
- `app/page.tsx` composes the homepage. `app/projects/[slug]/page.tsx` renders each project from structured data.
- `app/globals.css` contains the visual system and responsive rules. `public/favicon.svg` is the small AP brand mark.
- `.env.example` shows the optional production URL variable. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before building so canonical/sitemap links use the actual address.

## Motion and accessibility

The homepage uses CSS and the native Web Animations API; there is no production animation dependency. `components/hero-signal.tsx` is an abstract signal-routing illustration, not measured project data. `components/home-motion.tsx` adds one-time section and pipeline reveals through IntersectionObserver. Content is rendered visibly on the server and stays usable without JavaScript.

System reduced-motion preferences disable the effects, including on initial hydration. The hero also has a manual pause control, pauses outside the viewport and in hidden tabs, and keyboard focus immediately finishes section reveals. The motion test covers system preferences, preference changes, manual pause, cancellation, and cleanup.

## Content standards

Claims and limitations were checked against the public GitHub repositories on October 4, 2026. `docs/CONTENT_AUDIT.md` explains the selection. The investment benchmark is a synthetic local workload, the API hub uses simulated integrations, and the NFL project is an active reporting foundation. Update case-study status and validation when those repositories change. Do not add screenshots, outcomes, production claims, or affiliation without evidence.

## Deployment later

This is a static export in `out/`. Vercel Hobby is a practical initial choice for this personal portfolio; its current plan is free within its usage limits. Deploy only after reviewing the content, adding a real email if desired, and setting `NEXT_PUBLIC_SITE_URL`. This repository intentionally has no deployment workflow yet.
