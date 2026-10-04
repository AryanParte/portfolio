import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { projects } from '../content/projects';

const output = path.resolve('out');
function htmlFor(route: string) {
  const file = path.join(output, route, 'index.html');
  assert.ok(existsSync(file), `Missing exported route: ${file}`);
  return readFileSync(file, 'utf8');
}
function textOf(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&');
}

test('the export has a homepage and one complete route per selected project', () => {
  const home = htmlFor('');
  assert.match(home, /Aryan Parte/);
  assert.match(home, /Ally Financial/);
  assert.match(textOf(home), /Data analytics/);
  assert.doesNotMatch(textOf(home), /Cognizant/i);
  assert.match(home, /id="sports"/);
  assert.match(home, /id="contact"/);
  assert.match(home, /www\.linkedin\.com\/in\/aryanparte/);
  for (const project of projects) {
    const html = htmlFor(`projects/${project.slug}`);
    const visible = textOf(html);
    assert.ok(visible.includes(project.name), project.name);
    assert.ok(visible.includes(project.summary), project.name);
    assert.match(visible, /DATA &amp; PROVENANCE|DATA & PROVENANCE/);
    assert.match(visible, /VALIDATION/);
    assert.match(visible, /LIMITATIONS/);
    assert.ok(html.includes(project.repo), project.repo);
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${project.name}: expected one h1`,
    );
  }
});

test('all exported internal links resolve to a route or asset', () => {
  const pages = ['', ...projects.map((project) => `projects/${project.slug}`)];
  for (const page of pages) {
    const html = htmlFor(page);
    for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
      if (!href.startsWith('/')) continue;
      const [pathname, fragment] = href.split('#');
      const target = pathname || `/${page}/`;
      const destination = target.endsWith('/')
        ? path.join(output, target, 'index.html')
        : path.join(output, target);
      assert.ok(
        existsSync(destination),
        `${page || '/'} contains broken link ${href}`,
      );
      if (fragment && !target.startsWith('/_next/')) {
        const destinationHtml = readFileSync(destination, 'utf8');
        assert.ok(
          destinationHtml.includes(`id="${fragment}"`),
          `${href} has no target`,
        );
      }
    }
  }
});

test('no email link is invented while the address is unverified', () => {
  const home = htmlFor('');
  assert.doesNotMatch(home, /href="mailto:/);
  assert.match(home, /Address available on request/);
});
