'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The thing itself, looping: a sentence typed, then a page assembling from it.
 *
 * It is a drawing, not a recording — but it is an honest one. The sentence is one
 * a real customer typed, the sections that appear are the sections Creai actually
 * builds, and the order is the order it builds them in. A marketing animation that
 * shows a product doing something it cannot do is a promise you pay for later.
 *
 * Everything stops for prefers-reduced-motion: the finished state is drawn at once
 * and nothing moves.
 */

const TYPED = 'Bookkeeping for small construction companies in Milwaukee.';

// What assembles, in the order it really does: the page first, then the things
// that make it a business rather than a brochure.
const PARTS = [
  { at: 1200, label: 'Headline', h: 34, w: '78%' },
  { at: 1500, label: 'Copy', h: 10, w: '92%' },
  { at: 1650, label: '', h: 10, w: '64%' },
  { at: 2000, label: 'Services', h: 54, w: '100%', grid: true },
  { at: 2400, label: 'Sign-in', h: 30, w: '46%', accent: true },
  { at: 2750, label: 'Payments', h: 30, w: '40%' },
];

const TOTAL = 6200;

export function BuildLoop() {
  const [t, setT] = useState(0);
  const [still, setStill] = useState(false);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    let start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) % TOTAL;
      if (elapsed < 16) start = now;
      setT(elapsed);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  // Pause while the tab is hidden: an animation nobody is watching is just heat.
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'hidden') cancelAnimationFrame(frame.current);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const typed = still ? TYPED.length : Math.min(TYPED.length, Math.floor(t / 18));
  const shown = (at: number) => still || t > at;
  const live = still || t > 3100;

  return (
    <div
      className="relative rounded-xl overflow-hidden hairline border bg-night/60"
      aria-label="A sentence becoming a working site"
      role="img"
    >
      {/* the bar, so it reads as a workspace rather than a slideshow */}
      <div className="flex items-center gap-2 px-4 py-3 border-b hairline">
        <span className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/50">
          preview
        </span>
        <span
          className={`ml-auto font-mono-label text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
            live ? 'text-leaf' : 'text-cream-soft/40'
          }`}
        >
          {live ? '● live' : '○ building'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
        {/* what the person typed */}
        <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r hairline">
          <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40 mb-3">
            you
          </p>
          <p className="text-cream-soft leading-relaxed min-h-[4.5rem]">
            {TYPED.slice(0, typed)}
            {!still && typed < TYPED.length && (
              <span className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-[1px] bg-leaf animate-pulse" />
            )}
          </p>
        </div>

        {/* what appears */}
        <div className="p-6 md:p-7 space-y-3 min-h-[15rem]">
          {PARTS.map((p) => (
            <div
              key={p.label + p.at}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: shown(p.at) ? 1 : 0,
                transform: shown(p.at) ? 'none' : 'translateY(10px)',
              }}
            >
              {p.grid ? (
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-md bg-cream/[0.06] hairline border"
                      style={{ height: p.h }}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`rounded-md hairline border ${
                    p.accent ? 'bg-leaf/25' : 'bg-cream/[0.06]'
                  }`}
                  style={{ height: p.h, width: p.w }}
                />
              )}
              {p.label && (
                <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/35 mt-1.5">
                  {p.label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
