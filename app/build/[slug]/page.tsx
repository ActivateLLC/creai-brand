import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BUILDS, buildBySlug } from '@/content/builds';
import { JsonLd, graph } from '@/components/structured-data';
import { Reveal } from '@/components/reveal';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.creai.dev';
const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.creai.dev';

export function generateStaticParams() {
  return BUILDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }):
  Promise<Metadata> {
  const { slug } = await params;
  const b = buildBySlug(slug);
  if (!b) return {};
  return {
    title: `${b.title} — Creai`,
    description: b.blurb,
    alternates: { canonical: `${SITE}/build/${b.slug}` },
    openGraph: { title: b.title, description: b.blurb, images: [b.shot] },
  };
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = buildBySlug(slug);
  if (!b) notFound();

  // HowTo and FAQ describe what is visibly on the page — structured data that
  // claims more than the page shows is the fastest way to lose a rich result.
  const data = graph(
    {
      '@type': 'HowTo',
      name: b.title,
      description: b.blurb,
      totalTime: `PT${b.minutes}M`,
      step: [
        { '@type': 'HowToStep', name: 'Describe it', text: b.sentence },
        { '@type': 'HowToStep', name: 'Watch it build',
          text: 'Creai builds the screens, the data and the sign-in while you watch.' },
        { '@type': 'HowToStep', name: 'Publish when you are ready',
          text: 'Nothing goes live until you say so. Your domain is registered in your name.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: b.faq.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  );

  return (
    <main className="min-h-screen">
      <JsonLd data={data} />

      <header className="max-w-5xl mx-auto px-6 pt-28 pb-12">
        <Reveal>
          <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase text-cream-soft/50 mb-6">
            Built with Creai · {b.minutes} minutes
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.03] mb-6">
            {b.h1}
          </h1>
          <p className="text-cream-soft text-lg leading-relaxed max-w-2xl">{b.blurb}</p>
        </Reveal>
      </header>

      {/* The artifact. The page exists because this was made, not the other way round. */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <Reveal delay={80}>
          <figure className="hairline border rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.shot} alt={`${b.title}, running`} className="w-full" />
            <figcaption className="px-5 py-4 border-t hairline">
              <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45 mb-2">
                what was typed
              </p>
              <p className="text-cream-soft">“{b.sentence}”</p>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight mb-4">What it came with</h2>
            <ul className="space-y-2">
              {b.built.map((x) => (
                <li key={x} className="text-cream-soft flex gap-3">
                  <span className="text-leaf">—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="font-display text-3xl tracking-tight mb-4">Where it isn’t the answer</h2>
            <p className="text-cream-soft leading-relaxed">{b.honestly}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <Reveal>
          <a
            href={APP}
            className="inline-block bg-leaf text-night px-7 py-4 font-mono-label text-[12px] tracking-[0.2em] uppercase"
          >
            Build yours →
          </a>
          <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/45 mt-4">
            Free to start · nothing goes live until you say so
          </p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-28">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight mb-6">Questions</h2>
          <div className="border-t hairline">
            {b.faq.map((f, i) => (
              <div key={f.q} className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b hairline py-6">
                <h3 className="md:col-span-5 font-display text-xl tracking-tight">{f.q}</h3>
                <p className="md:col-span-7 text-cream-soft leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <nav className="mt-12 flex flex-wrap gap-4">
            {BUILDS.filter((o) => o.slug !== b.slug).map((o) => (
              <a
                key={o.slug}
                href={`/build/${o.slug}`}
                className="hairline border rounded-lg px-5 py-4 hover:border-leaf transition-colors"
              >
                <span className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45 block mb-1">
                  also built
                </span>
                <span className="font-display text-xl tracking-tight">{o.title}</span>
              </a>
            ))}
          </nav>
        </Reveal>
      </section>
    </main>
  );
}
