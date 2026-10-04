const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = configuredUrl ? new URL(configuredUrl) : null;
if (siteUrl && !['http:', 'https:'].includes(siteUrl.protocol)) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin');
}

export const site = {
  name: 'Aryan Parte',
  title: 'Software engineer building intelligent, data-driven systems.',
  description:
    'Software engineering, applied AI, and reproducible data systems. Selected work by Aryan Parte, including NFL opponent intelligence and backend infrastructure.',
  github: 'https://github.com/AryanParte',
  linkedin: 'https://www.linkedin.com/in/aryanparte',
  // Add a verified, public contact address before launch. Never use a Git commit address.
  email: '',
  // Set NEXT_PUBLIC_SITE_URL to the chosen production origin before deployment.
  url: siteUrl?.origin || '',
};
