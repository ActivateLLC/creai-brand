import type { Metadata } from 'next';
import Link from 'next/link';
import { LogoMark } from '@/components/icons';

const APP_URL = 'https://app.creai.dev';

export const metadata: Metadata = {
  title: 'Pricing — CreAI',
  description:
    'Build free. Launch on your own domain from $10 a month. Cancel in one tap, and your site never goes dark.',
  alternates: { canonical: '/pricing' },
};

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    note: 'forever',
    cta: 'Start building',
    features: [
      'Build sites and working apps by chat',
      '150 credits to start, top up any time',
      'Publish on a free CreAI address',
      'Small “Made with CreAI” badge',
    ],
  },
  {
    name: 'Launch',
    price: '$10',
    note: 'a month, billed $120 yearly · or $12 monthly',
    cta: 'Choose Launch',
    best: true,
    features: [
      'Your own domain, hosted with HTTPS',
      'A domain included every year (yearly plan)',
      'Domain renewals covered (yearly plan)',
      'No CreAI badge',
      '1,000 credits every month',
    ],
  },
  {
    name: 'Growth',
    price: '$29',
    note: 'a month, billed $350 yearly · or $35 monthly',
    cta: 'Choose Growth',
    features: [
      'Everything in Launch',
      'Scheduled posting to your social accounts',
      '3,000 credits every month',
      'Priority help',
    ],
  },
];

const PROMISES = [
  ['No surprise renewals', 'We email you a week before any plan renews.'],
  ['Cancel in one tap', 'From Credits → Manage plan. No calls, no forms.'],
  ['Never goes dark', 'If a plan ends, your site stays up on its free CreAI address.'],
  ['Your domain is yours', 'Registered in your name. Move it to another registrar any time.'],
  ['Pay for work that ships', 'Fixing errors in apps CreAI built is on us.'],
  ['See the cost first', 'Every message shows its likely credits, and you can set a monthly limit.'],
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-night text-cream">
      <nav className="border-b hairline">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="w-7 h-7" />
            <span className="font-display text-2xl tracking-tight">CreAI</span>
          </Link>
          <a href={APP_URL} className="font-mono-label text-[11px] tracking-[0.22em] uppercase border hairline px-4 py-2 hover:bg-cream hover:text-night transition-colors">
            Open CreAI
          </a>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono-label text-[11px] tracking-[0.28em] uppercase text-cream-soft mb-6">
          <span className="text-leaf">Pricing</span> · Simple, and no traps
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-6 max-w-3xl">
          Build free. Go live on your own domain.
        </h1>
        <p className="text-cream-soft text-lg leading-relaxed mb-14 max-w-2xl">
          Every plan includes the full agent: sites, working apps, your brand kit and drafted posts.
          Plans add your own domain, monthly credits and scheduled posting.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {PLANS.map((p) => (
            <div key={p.name} className={`border hairline p-8 flex flex-col ${p.best ? 'bg-cream/5 border-leaf' : ''}`}>
              <p className="font-mono-label text-[11px] tracking-[0.24em] uppercase text-cream-soft mb-4">
                {p.name}{p.best ? <span className="text-leaf"> · most popular</span> : null}
              </p>
              <p className="font-display text-6xl tracking-tight">{p.price}</p>
              <p className="text-cream-soft text-sm mt-2 mb-6">{p.note}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-cream-soft leading-snug flex gap-3">
                    <span className="text-leaf">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={APP_URL} className={`text-center font-mono-label text-[11px] tracking-[0.22em] uppercase px-5 py-4 transition-colors ${p.best ? 'bg-leaf text-night hover:bg-cream' : 'border hairline hover:bg-cream hover:text-night'}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <h2 className="font-display text-4xl tracking-tight mb-8">Our promises</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 border hairline mb-20">
          {PROMISES.map(([t, d]) => (
            <div key={t} className="bg-night p-7">
              <p className="font-display text-2xl tracking-tight mb-2">{t}</p>
              <p className="text-cream-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display text-4xl tracking-tight mb-6">Credits and domains</h2>
        <div className="grid md:grid-cols-2 gap-8 text-cream-soft leading-relaxed mb-16">
          <p>
            Credits pay for AI work beyond your plan&apos;s monthly allowance. Packs start at $10 for 1,000
            credits, with bonus credits on bigger packs. A typical site message costs 15–35 credits; building
            an app costs more. You always see the estimate before you send.
          </p>
          <p>
            Domains are registered in your name. Standard endings like .com are included every year with a
            yearly plan. Otherwise a .com is about $20 a year, and premium endings are priced before you buy.
            Registrations can&apos;t be refunded once complete.
          </p>
        </div>
        <p className="text-cream-soft text-sm border-t hairline pt-8">
          Prices in USD, before any sales tax. See the <Link href="/terms" className="text-leaf underline underline-offset-4">Terms</Link> for details.
        </p>
      </main>
    </div>
  );
}
