import { ventures } from '@/lib/family';
import { GenerativeCanvas } from '@/components/generative-canvas';
import { BuildLoop } from '@/components/build-loop';
import { Reveal } from '@/components/reveal';
import { LogoMark } from '@/components/icons';

// Where the build-to-launch app lives. Override with NEXT_PUBLIC_APP_URL if the app moves.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.creai.dev';

const HEADLINE = ['Say it.', 'See it.', 'Own it.'];

const MARQUEE = [
  'ONE SENTENCE IN · INSTANT PREVIEW',
  'THE AGENT DRAFTS — YOU DECIDE',
  'NO CODE · NO TEMPLATES · NO KIDDING',
  'SITES · APPS · BROWSER GAMES',
  'YOU OWN THE OUTPUT',
  'WORKING BEATS WAITLIST',
];

// What is true today, in the words a customer would use. Nothing aspirational:
// every line here is something that works right now, and saying otherwise is how
// a launch page becomes a support queue.
// The nine Creai can post to once connected. Listed plainly, because a customer
// checks for the one they actually use.
const NETWORKS = [
  'Instagram',
  'Facebook',
  'Google Business',
  'LinkedIn',
  'X',
  'Threads',
  'TikTok',
  'YouTube',
  'Pinterest',
];

const DOES = [
  {
    title: 'People can sign in',
    body:
      'A client portal, bookings, orders, a members area. Each person sees their own things and nobody else\u2019s \u2014 enforced by the server, not by hoping the code remembered.',
  },
  {
    title: 'You can take money',
    body:
      'Payments land in your own Stripe account, with your name on the statement. Creai never holds it, and you keep the relationship with your customer.',
  },
  {
    title: 'Speak it instead of typing',
    body:
      'Describe your business out loud, from a phone, on a job site. It works the same in every browser and inside the app \u2014 not just where the browser happens to support it.',
  },
  {
    title: 'It markets you, and waits',
    body:
      'Posts drafted from your own website \u2014 Instagram, Facebook, LinkedIn, TikTok and five more \u2014 scheduled weeks ahead. Every one waits for your yes, until you decide it doesn\u2019t need to.',
  },
  {
    title: 'Bring what you already have',
    body:
      'Got a site already? Drop the folder in. Creai hosts it, points your domain at it, and you never touch a DNS record.',
  },
  {
    title: 'Go back to how it was',
    body:
      'Every version you publish is kept. Open an earlier one, look at it, put it back \u2014 and the one you replaced is still there to return to.',
  },
  {
    title: 'It keeps marketing you',
    body:
      'Creai reads your site, writes the weeks ahead, and schedules them across nine networks \u2014 then waits. Nothing posts until you approve that exact post.',
  },
  {
    title: 'Take it with you',
    body:
      'Export the whole thing whenever you like, and your domain is registered in your name. Leaving is a button, not a support ticket.',
  },
];

const FLOW = [
  {
    n: '01',
    lead: 'Say it.',
    rest: 'Type it or just talk. Describe what you do in plain words — no forms, no templates, no jargon.',
  },
  {
    n: '02',
    lead: 'See it.',
    rest: 'Your site takes shape in real time, right beside the conversation. Every answer, every tweak — instantly on screen.',
  },
  {
    n: '03',
    lead: 'Own it.',
    rest: 'Publish in one tap, line up your first posts, keep everything you make. Nothing sends, posts or spends until you tap yes.',
  },
];

function MarqueeStrip() {
  const run = (
    <div aria-hidden="true">
      {MARQUEE.map((phrase) => (
        <span key={phrase} className="font-mono-label text-[11px] tracking-[0.28em] text-cream-soft/70 px-8">
          {phrase} <span className="text-leaf px-2">·</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y hairline py-3.5 bg-night-deep/60">
      {run}
      {run}
    </div>
  );
}

function RoomLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="font-mono-label text-[11px] tracking-[0.28em] text-cream-soft/80 uppercase mb-10 flex items-center gap-4">
      <span className="text-leaf">{n}</span>
      <span className="w-10 h-px bg-cream/20 inline-block" />
      {title}
    </p>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-night text-cream relative">
      {/* the field runs behind the entire site */}
      <GenerativeCanvas className="fixed inset-0 w-full h-full opacity-90" />
      <div className="fixed inset-0 bg-gradient-to-b from-night/30 via-night/62 to-night/88 pointer-events-none" />

      <div className="relative">
        {/* Masthead */}
        <nav className="absolute top-0 left-0 right-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <LogoMark className="w-7 h-7 text-leaf" />
              <span className="font-display text-2xl tracking-tight">Creai</span>
            </a>
            <div className="flex items-center gap-7 font-mono-label text-[11px] tracking-[0.22em] uppercase">
              <a href="/pricing" className="text-cream-soft hover:text-cream transition-colors hidden sm:block">
                Pricing
              </a>
              <a href="#flow" className="text-cream-soft hover:text-cream transition-colors hidden sm:block">
                How it flows
              </a>
              <a href="#index" className="text-cream-soft hover:text-cream transition-colors hidden sm:block">
                Ventures
              </a>
              <a
                href={APP_URL}
                className="border border-leaf/60 hover:bg-leaf hover:text-night text-leaf px-4 py-2 transition-colors"
              >
                Start building
              </a>
            </div>
          </div>
        </nav>

        {/* Room 00 — the field */}
        <header className="min-h-screen flex flex-col justify-end">
          <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-10">
            <p className="font-mono-label text-[11px] tracking-[0.28em] uppercase text-cream-soft mb-6">
              <span className="text-leaf">00</span> · The build-to-launch studio
            </p>
            <h1 className="font-display text-[14vw] md:text-[9.5rem] leading-[0.95] tracking-tight mb-8 md:flex md:flex-wrap">
              {HEADLINE.map((word, i) => (
                <span key={`${i}-${word}`} className="reveal-word block md:inline whitespace-nowrap mr-[0.22em]" style={{ animationDelay: `${0.2 + i * 0.22}s` }}>
                  {word}
                </span>
              ))}
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
              <div className="max-w-md">
                <p className="text-cream-soft leading-relaxed mb-6">
                  Describe it in a sentence. Watch a site, a working app, or a playable game
                  take shape beside the conversation — reviewed on a phone and a desktop, and
                  run, before you see it. Publish when you&apos;re ready. Nothing goes live until
                  you say so.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={APP_URL}
                    className="bg-leaf text-night hover:bg-cream px-6 py-3 font-mono-label text-[12px] tracking-[0.2em] uppercase transition-colors"
                  >
                    Start building →
                  </a>
                  <a
                    href="/made"
                    className="border hairline hover:border-leaf text-cream px-6 py-3 font-mono-label text-[12px] tracking-[0.2em] uppercase transition-colors"
                  >
                    See what people made
                  </a>
                  <a
                    href="https://skills.creai.dev"
                    className="border hairline hover:border-leaf text-cream px-6 py-3 font-mono-label text-[12px] tracking-[0.2em] uppercase transition-colors"
                  >
                    Explore Skills
                  </a>
                </div>
              </div>
              <div className="w-full md:max-w-xl shrink-0">
                <BuildLoop />
              </div>
            </div>
          </div>
          <MarqueeStrip />
        </header>

        {/* Room 01 — how it flows */}
        <section id="flow" className="py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="01" title="How it flows" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {FLOW.map((f, i) => (
                <Reveal key={f.n} delay={i * 110}>
                  <p className="font-mono-label text-sm text-cream-soft/60 mb-4">{f.n}</p>
                  <h2 className="font-display text-5xl md:text-6xl tracking-tight text-leaf mb-5">{f.lead}</h2>
                  <p className="text-cream-soft leading-relaxed">{f.rest}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={360}>
              <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mt-14">
                Free to build. Publishing included. You keep what you make.
              </p>
            </Reveal>
          </div>
        </section>


        {/* Room 01.5 — what it can actually do */}
        <section id="does" className="py-28 bg-night/40">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="01.5" title="What it does" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
              {DOES.map((d, i) => (
                <Reveal key={d.title} delay={i * 80}>
                  <h3 className="font-display text-3xl tracking-tight text-leaf mb-2">{d.title}</h3>
                  <p className="text-cream-soft leading-relaxed">{d.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={420}>
              <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mt-14">
                No second tool to learn. No editor waiting behind the AI.
              </p>
            </Reveal>
          </div>
        </section>


        {/* Room 01.6 — the part that keeps going */}
        <section id="marketing" className="py-28">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="01.6" title="After it's live" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-start">
              <Reveal>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight text-leaf mb-5 leading-[1.05]">
                  A site nobody visits
                  <br />
                  is a business card in a drawer.
                </h2>
                <p className="text-cream-soft leading-relaxed mb-5">
                  Creai reads your own site to learn what you sell and how you sound, then writes
                  the weeks ahead: three to five posts, scheduled, each pointing back at the page
                  that answers it. No invented prices, no invented reviews, no awards you never
                  won \u2014 only what is on your site or what you told it.
                </p>
                <p className="text-cream-soft leading-relaxed">
                  Every post waits for you. They sit in a queue with the date they would go out,
                  and nothing reaches anybody until you say yes to that one. Approving takes a
                  tap; so does rewriting it.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="hairline border rounded-xl p-6">
                  <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45 mb-4">
                    Connect once
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {NETWORKS.map((n) => (
                      <p key={n} className="text-cream-soft text-sm">
                        {n}
                      </p>
                    ))}
                  </div>
                  <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45 mt-6 pt-5 border-t hairline">
                    Nothing posts without your approval
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Room 02 — the index */}
        <section id="index" className="py-28 bg-night/40">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="02" title="Ventures" />
            </Reveal>
            <div className="border-t hairline">
              {ventures.map((v, i) => (
                <Reveal key={v.id} delay={i * 90}>
                  <a
                    href={v.url ?? '#index'}
                    className={`index-row grid grid-cols-12 gap-4 items-baseline border-b hairline py-8 ${
                      v.url ? '' : 'pointer-events-none'
                    }`}
                  >
                    <span className="col-span-2 md:col-span-1 font-mono-label text-sm text-cream-soft/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="col-span-10 md:col-span-4 font-display text-3xl md:text-5xl tracking-tight">
                      {v.name}
                    </span>
                    <span className="col-span-6 col-start-3 md:col-span-4 md:col-start-auto text-cream-soft text-sm leading-relaxed">
                      {v.tagline}
                      <span className="block text-cream-soft/60 mt-1 text-[13px]">{v.detail}</span>
                    </span>
                    <span className="col-span-4 md:col-span-3 text-right">
                      {v.status === 'live' ? (
                        <span className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-leaf">
                          ● live — visit ↗
                        </span>
                      ) : v.status === 'preview' ? (
                        <span className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-leaf/80">
                          ◐ preview — try it ↗
                        </span>
                      ) : (
                        <span className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50">
                          ○ in development
                        </span>
                      )}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mt-6">
              No waitlists. A venture shows up here the moment it works.
            </p>
          </div>
        </section>

        {/* Room 03 — thesis */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="03" title="What we believe" />
            </Reveal>
            <div className="space-y-16">
              {[
                { lead: 'Taste is the interface.', rest: 'Anyone can generate. Choosing brilliantly is the whole game.' },
                { lead: 'The agent drafts. You decide.', rest: 'Nothing we ship sends, posts or spends on its own. That’s not a limit — it’s the design.' },
                { lead: 'Magic you can watch.', rest: 'Every change lands on screen the instant it happens. No black boxes. No surprises.' },
                { lead: 'Flexible by design.', rest: 'Owners describe it and publish. Developers get real code, real files and their own domain — no lock-in, no export tax.' },
                { lead: 'Nothing ships unchecked.', rest: 'Every build is rendered on a phone and a desktop, run, and reviewed before it reaches you.' },
                { lead: 'Working beats waitlist.', rest: 'We ship things you can touch today — not visions. Even the art behind this page is painted live.' },
              ].map((t, i) => (
                <Reveal key={t.lead} delay={i * 100}>
                  <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
                    <span className="text-leaf">{t.lead}</span>{' '}
                    <span className="text-cream/90">{t.rest}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Room 04 — atlas */}
        <section id="atlas" className="py-28 bg-night/40">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <RoomLabel n="04" title="Atlas of Flow" />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
              <div className="lg:col-span-3">
                <Reveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/plate-001.jpg"
                    alt="Field Notation — Plate 001: Directed Current. A generative ink drawing of two thousand fine flow-field strokes bending around a single annotated hexagonal node."
                    className="w-full shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                    loading="lazy"
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-2">
                <Reveal delay={120}>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-5">
                    Plate 001 — Directed Current
                  </h2>
                  <p className="text-cream-soft leading-relaxed mb-4">
                    Two thousand individually placed strokes, one current, and a single
                    annotated node where the flow bends: the decision. It is the same idea the
                    product runs on — the work moves, a person chooses.
                  </p>
                  <p className="text-cream-soft/70 leading-relaxed text-sm mb-6">
                    Drawn by our own generative systems, never stock. The living version
                    surrounds you now, seeded fresh for every visitor.
                  </p>
                  <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50">
                    obs. 2026-09 · n = 2,040 strokes · archival
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t hairline bg-night-deep/70">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
              <div className="col-span-2 md:col-span-1">
                <a href="#" className="flex items-center gap-2.5 mb-4">
                  <LogoMark className="w-6 h-6 text-leaf" />
                  <span className="font-display text-xl tracking-tight">Creai</span>
                </a>
                <p className="text-cream-soft text-sm leading-relaxed max-w-xs">
                  Build a site, an app or a game by describing it, then launch when it&apos;s right.
                </p>
              </div>
              <div>
                <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mb-4">Product</p>
                <ul className="space-y-2.5 text-sm">
                  <li><a href={APP_URL} className="text-cream-soft hover:text-cream transition-colors">Start building</a></li>
                  <li><a href="/pricing" className="text-cream-soft hover:text-cream transition-colors">Pricing</a></li>
                  <li><a href="#flow" className="text-cream-soft hover:text-cream transition-colors">How it flows</a></li>
                  <li><a href="https://skills.creai.dev" className="text-cream-soft hover:text-cream transition-colors">Skills</a></li>
                </ul>
              </div>
              <div>
                <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mb-4">Company</p>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#index" className="text-cream-soft hover:text-cream transition-colors">Ventures</a></li>
                  <li><a href="/privacy" className="text-cream-soft hover:text-cream transition-colors">Privacy</a></li>
                  <li><a href="/terms" className="text-cream-soft hover:text-cream transition-colors">Terms</a></li>
                </ul>
              </div>
              <div>
                <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/50 mb-4">Contact</p>
                <a href="mailto:contact@creai.dev" className="text-cream hover:text-leaf transition-colors text-sm break-all">
                  contact@creai.dev
                </a>
                <p className="text-cream-soft/60 text-sm mt-3 leading-relaxed">Milwaukee, Wisconsin</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 border-t hairline">
              <p className="text-cream-soft/60 text-sm">© 2026 Creai. All rights reserved.</p>
              <p className="text-cream-soft/50 text-sm md:text-right">
                Built in Milwaukee. Nothing goes live without your approval.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
