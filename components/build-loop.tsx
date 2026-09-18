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
  { at: 500, when: 'Tue 9:00', on: 'Instagram', img: '/demo/post-1.webp',
    text: 'Frozen pipe season. A trickle overnight is cheaper than a burst.' },
  { at: 950, when: 'Wed 12:30', on: 'Facebook', img: '/demo/post-2.webp',
    text: 'Replaced a water heater in Bay View this morning.' },
  { at: 1400, when: 'Fri 8:00', on: 'LinkedIn', img: '/demo/post-3.webp',
    text: 'Booking into next week for drain work.' },
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
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // Nothing runs until it is looked at. An animation playing below the fold is
  // heat, and it means the first thing a person sees is the middle of a story
  // rather than the start of one.
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    // A beat after it eases in, so the typing starts once it has arrived.
    const start = performance.now() + 420;
    const step = (now: number) => {
      setT(Math.max(0, now - start) % TOTAL);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [seen]);

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
      ref={box}
      className="relative rounded-xl overflow-hidden hairline border bg-night/60 transition-all duration-700 ease-out motion-reduce:transition-none"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'none' : 'translateY(18px) scale(0.985)',
      }}
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
          <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">
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
                {ready ? '● signed-in client portal' : '○ building'}
              </p>
            </div>
            <div className="relative p-4 md:p-5">
              {/* the real thing Creai renders, screenshotted from the product */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demo/app.webp"
                alt="A client portal built by Creai, showing outstanding and paid invoices"
                className="w-full rounded-lg hairline border transition-all duration-1000 ease-out"
                style={{
                  opacity: shown(1500) ? 1 : 0,
                  transform: shown(1500) ? 'none' : 'translateY(14px) scale(0.985)',
                  clipPath: shown(1500) ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                }}
              />
            </div>
          </div>
        )}
        {act === 1 && (
          <div className="p-5 md:p-6">
            <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40 mb-4">
              drafted from your own site · nothing posts until you say so
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {POSTS.map((p) => (
                <div
                  key={p.when}
                  className="rounded-lg hairline border overflow-hidden transition-all duration-700 ease-out"
                  style={{
                    opacity: shown(p.at) ? 1 : 0,
                    transform: shown(p.at) ? 'none' : 'translateY(12px)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="w-full h-24 object-cover" />
                  <div className="p-3">
                    <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-cream-soft/45 mb-1.5">
                      {p.when} · {p.on}
                    </p>
                    <p className="text-cream-soft text-[13px] leading-snug mb-2.5">{p.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-label text-[9px] tracking-[0.16em] uppercase text-night bg-leaf px-2 py-1 rounded">
                        approve
                      </span>
                      <span className="font-mono-label text-[9px] tracking-[0.16em] uppercase text-cream-soft/35">
                        edit
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {act === 2 && <GameAct />}
      </div>
    </div>
  );
}

/** Real footage: a game built with Creai's own kit, captured while it played. */
function GameAct() {
  return (
    <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-5 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/game.webp"
        alt="A game built with Creai, playing"
        className="w-full rounded-lg hairline border"
      />
      <div>
        <p className="text-cream-soft leading-relaxed">
          Playable games, in the browser or exported from Godot — with the art generated alongside
          them.
        </p>
        <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/40 mt-3">
          same sentence, different ambition
        </p>
      </div>
    </div>
  );
}
