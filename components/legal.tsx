import Link from 'next/link';
import { LogoMark } from '@/components/icons';

// The operator named on legal pages. Confirm before relying on these pages.
export const OPERATOR = process.env.NEXT_PUBLIC_LEGAL_ENTITY || 'Creai';
export const CONTACT = 'contact@creai.dev';
export const EFFECTIVE = 'September 17, 2026';

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-night text-cream">
      <nav className="border-b hairline">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="w-7 h-7" />
            <span className="font-display text-2xl tracking-tight">Creai</span>
          </Link>
          <div className="flex gap-6 font-mono-label text-[11px] tracking-[0.22em] uppercase">
            <Link href="/pricing" className="text-cream-soft hover:text-cream">Pricing</Link>
            <Link href="/privacy" className="text-cream-soft hover:text-cream">Privacy</Link>
            <Link href="/terms" className="text-cream-soft hover:text-cream">Terms</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="font-mono-label text-[11px] tracking-[0.28em] uppercase text-cream-soft mb-6">
          <span className="text-leaf">Legal</span> · Effective {EFFECTIVE}
        </p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-6">{title}</h1>
        <p className="text-cream-soft text-lg leading-relaxed mb-12">{intro}</p>
        <div className="legal space-y-10">{children}</div>
        <p className="mt-16 pt-8 border-t hairline text-cream-soft text-sm">
          Questions? Email <a className="text-leaf underline underline-offset-4" href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </main>
    </div>
  );
}

export function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
        <span className="font-mono-label text-sm text-leaf mr-3 align-middle">{n}</span>{title}
      </h2>
      <div className="text-cream/85 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
