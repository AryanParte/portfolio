import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    { url: site.url, lastModified: new Date('2026-10-04') },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified: new Date('2026-10-04'),
    })),
  ];
}
