'use client';

import { useEffect, useState } from 'react';

/** Enhancement only: server-rendered content never depends on this effect to appear. */
export function HomeMotion() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const disabled =
      paused ||
      reduced ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.dataset.motion = disabled ? 'off' : 'on';
    const animations = new Set<Animation>();
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (disabled || !('IntersectionObserver' in window)) {
      return () => {
        delete root.dataset.motion;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          // Never replay a reveal when motion is toggled or a visitor returns to a section.
          if (element.dataset.revealed) continue;
          element.dataset.revealed = 'true';
          if (element.contains(document.activeElement)) continue;
          const animation = element.animate(
            [
              { opacity: 0.45, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 620, easing: 'cubic-bezier(.22,1,.36,1)' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          // The diagram remains readable while its numbered stages receive emphasis.
          element
            .querySelectorAll<HTMLElement>('.pipeline li')
            .forEach((step, index) => {
              const pulse = step.animate(
                [
                  { transform: 'translateX(-8px)', opacity: 0.55 },
                  { transform: 'translateX(0)', opacity: 1 },
                ],
                { duration: 550, delay: index * 130, easing: 'ease-out' },
              );
              animations.add(pulse);
              pulse.onfinish = () => animations.delete(pulse);
            });
        }
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    const visual = document.querySelector<HTMLElement>('.hero-visual');
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (visual) visual.dataset.inView = String(entry.isIntersecting);
    });
    if (visual) heroObserver.observe(visual);
    const updateVisibility = () => {
      root.dataset.tabHidden = String(document.hidden);
    };
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    const finishOnFocus = () =>
      animations.forEach((animation) => animation.finish());
    document.addEventListener('focusin', finishOnFocus);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      if (visual) delete visual.dataset.inView;
      delete root.dataset.tabHidden;
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener('focusin', finishOnFocus);
      delete root.dataset.motion;
    };
  }, [paused, reduced]);

  return (
    <button
      type="button"
      className="motion-control"
      aria-pressed={paused || reduced}
      aria-label={
        reduced ? 'Motion reduced by system preference' : 'Reduce motion'
      }
      disabled={reduced}
      onClick={() => setPaused(!paused)}
    >
      <span className="motion-icon" aria-hidden="true">
        {paused || reduced ? 'Ⅱ' : '∿'}
      </span>
      {reduced ? 'Reduced motion' : paused ? 'Motion paused' : 'Pause motion'}
    </button>
  );
}
