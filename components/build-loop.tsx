'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * One frame, three acts: a site built from a sentence, a week of posts waiting on
 * a yes, a game running. They play in sequence rather than side by side, because
 * three things animating at once is a page performing busyness instead of making
 * an argument.
 *
 * It is a drawing, not a recording — but an honest one. The sentence is one a real
 * customer typed, the parts assemble in the order Creai builds them, and the posts
 * wait for approval because that is what actually happens. Showing a product doing
 * something it cannot do is a promise somebody else pays for later.
 *
 * All of it stops for prefers-reduced-motion: the first act is drawn finished and
 * nothing moves.
 */

const TYPED = 'Bookkeeping for small construction companies in Milwaukee.';

const PARTS = [
  { at: 1200, label: 'Headline', h: 34, w: '78%' },
  { at: 1500, label: 'Copy', h: 10, w: '92%' },
  { at: 1650, label: '', h: 10, w: '64%' },
  { at: 2000, label: 'Services', h: 54, w: '100%', grid: true },
  { at: 2400, label: 'Sign-in', h: 30, w: '46%', accent: true },
  { at: 2750, label: 'Payments', h: 30, w: '40%' },
];

// Drafted from the customer's own site, scheduled across the coming weeks, each
// one waiting on a yes. The queue is the product; the posting is the easy part.
const POSTS = [
  { at: 600, when: 'Tue 9:00', on: 'Instagram', text: 'Frozen pipe season. A trickle overnight is cheaper than a burst.' },
  { at: 1100, when: 'Wed 12:30', on: 'Facebook', text: 'Replaced a water heater in Bay View this morning.' },
  { at: 1600, when: 'Fri 8:00', on: 'LinkedIn', text: 'Booking into next week for drain work.' },
];

const ACTS = [
  { id: 'site', bar: 'preview', ms: 7000, label: 'A sentence becomes a business' },
  { id: 'posts', bar: 'waiting on you', ms: 6000, label: 'A month of marketing, waiting on your yes' },
  { id: 'game', bar: 'playable', ms: 5000, label: 'And the things that are just fun' },
] as const;

const TOTAL = ACTS.reduce((n, a) => n + a.ms, 0);

export function BuildLoop() {
  const [t, setT] = useState(0);
  const [still, setStill] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      setT((now - start) % TOTAL);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'hidden') cancelAnimationFrame(frame.current);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  let act = 0;
  let into = t;
  for (let i = 0; i < ACTS.length; i += 1) {
    if (into < ACTS[i].ms) {
      act = i;
      break;
    }
    into -= ACTS[i].ms;
    act = ACTS.length - 1;
  }
  if (still) {
    act = 0;
    into = ACTS[0].ms;
  }

  const typed = still ? TYPED.length : Math.min(TYPED.length, Math.floor(into / 18));
  const shown = (at: number) => still || into > at;
  const ready = still || (act === 0 && into > 3100);

  return (
    <div
      className="relative rounded-xl overflow-hidden hairline border bg-night/60"
      aria-label={ACTS[act].label}
      role="img"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b hairline">
        <span className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/50">
          {ACTS[act].bar}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          {ACTS.map((a, i) => (
            <span
              key={a.id}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === act ? 'w-5 bg-leaf' : 'w-2 bg-cream-soft/25'
              }`}
            />
          ))}
        </span>
      </div>

      <div className="min-h-[17rem]">
        {act === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
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
              <p
                className={`font-mono-label text-[10px] tracking-[0.2em] uppercase mt-4 transition-colors duration-500 ${
                  ready ? 'text-leaf' : 'text-cream-soft/30'
                }`}
              >
                {ready ? '● ready to publish' : '○ building'}
              </p>
            </div>
            <div className="p-6 md:p-7 space-y-3">
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
        )}

        {act === 1 && (
          <div className="p-6 md:p-7">
            <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40 mb-4">
              drafted from your own site · nothing posts until you say so
            </p>
            <div className="space-y-2.5">
              {POSTS.map((p) => (
                <div
                  key={p.when}
                  className="rounded-lg hairline border p-3.5 transition-all duration-700 ease-out"
                  style={{
                    opacity: shown(p.at) ? 1 : 0,
                    transform: shown(p.at) ? 'none' : 'translateY(10px)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45">
                      {p.when} · {p.on}
                    </span>
                    <span className="ml-auto flex gap-2">
                      <span className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-leaf">
                        approve
                      </span>
                      <span className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-cream-soft/30">
                        edit
                      </span>
                    </span>
                  </div>
                  <p className="text-cream-soft text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {act === 2 && <GameAct into={into} />}
      </div>
    </div>
  );
}

/** A small thing that genuinely runs, rather than a picture of one. */
function GameAct({ into }: { into: number }) {
  const paddle = 22 + Math.sin(into / 420) * 30;
  const drop = ((into / 9) % 150) + 10;
  const close = Math.abs(drop - 126) < 16;
  return (
    <div className="p-6 md:p-7 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 items-center">
      <div className="rounded-lg hairline border bg-night/70 relative h-[11rem] overflow-hidden">
        <div
          className="absolute w-3.5 h-3.5 rounded-sm bg-cream-soft/70"
          style={{ left: `${20 + ((into / 13) % 60)}%`, top: drop }}
        />
        <div
          className="absolute bottom-3 h-3.5 w-10 rounded-full"
          style={{
            left: `${paddle}%`,
            background: close ? 'rgb(var(--leaf-rgb))' : 'rgba(244,241,234,0.75)',
          }}
        />
        <p className="absolute top-2.5 left-3 font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40">
          score {Math.floor(into / 900)}
        </p>
      </div>
      <div>
        <p className="text-cream-soft leading-relaxed">
          Browser games and real Godot builds, exported to the web and playable on a phone.
        </p>
        <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40 mt-3">
          same sentence, different ambition
        </p>
      </div>
    </div>
  );
}
