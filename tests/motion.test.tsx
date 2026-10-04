import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { HomeMotion } from '../components/home-motion';

test('system reduction, user pause, and cleanup stop enhancement without hiding content', async () => {
  const dom = new JSDOM(
    '<html><body><div id="root"></div><section data-reveal>Readable content</section><div class="hero-visual"></div></body></html>',
  );
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  let reduced = true;
  let preferenceChanged = () => {};
  Object.defineProperty(dom.window, 'matchMedia', {
    value: () => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_: string, listener: () => void) => {
        preferenceChanged = listener;
      },
      removeEventListener: () => {},
    }),
  });
  let observed = 0;
  let disconnected = 0;
  let cancelled = 0;
  Object.defineProperty(dom.window.HTMLElement.prototype, 'animate', {
    value: () => ({
      cancel: () => {
        cancelled++;
      },
      finish: () => {},
      onfinish: null,
    }),
  });
  class Observer {
    constructor(
      private callback: (
        entries: { isIntersecting: boolean; target: Element }[],
      ) => void,
    ) {}
    observe(target: Element) {
      observed++;
      this.callback([{ isIntersecting: true, target }]);
    }
    unobserve() {}
    disconnect() {
      disconnected++;
    }
  }
  Object.assign(globalThis, { IntersectionObserver: Observer });
  Object.assign(dom.window, { IntersectionObserver: Observer });
  const root = createRoot(document.getElementById('root')!);
  await act(async () => {
    root.render(<HomeMotion />);
  });
  assert.equal(document.documentElement.dataset.motion, 'off');
  assert.equal(
    observed,
    0,
    'reduced motion must never start observers even at first hydration',
  );
  assert.equal(document.querySelector('button')!.disabled, true);
  assert.equal(document.querySelector('section')!.getAttribute('style'), null);
  reduced = false;
  await act(async () => {
    preferenceChanged();
  });
  assert.equal(document.documentElement.dataset.motion, 'on');
  assert.ok(observed > 0);
  await act(async () => {
    document.querySelector('button')!.click();
  });
  assert.equal(document.documentElement.dataset.motion, 'off');
  assert.equal(
    document.querySelector('button')!.getAttribute('aria-pressed'),
    'true',
  );
  assert.ok(disconnected >= 2);
  assert.ok(cancelled > 0, 'pause cancels in-flight reveal animations');
  assert.equal(
    document.querySelector('section')!.textContent,
    'Readable content',
  );
  await act(async () => {
    root.unmount();
  });
  assert.equal(document.documentElement.dataset.motion, undefined);
  dom.window.close();
});
