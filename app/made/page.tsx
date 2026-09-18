import type { Metadata } from 'next';

import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Made with Creai',
  description:
    'Real businesses built here — sites, apps and games. Open any of them, or take one and make it yours.',
  openGraph: {
    title: 'Made with Creai',
    description: 'Real businesses built here. Open one, or make it yours.',
  },
};

// The gallery moves when people publish, not when we deploy.
export const revalidate = 300;

const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.creai.dev';

type Item = {
  id: number;
  name: string;
  kind: string;
  headline: string;
  thumb: string | null;
  remixes: number;
  url: string | null;
};

async function fetchItems(): Promise<Item[]> {
  try {
    const r = await fetch(`${APP}/v1/gallery?limit=60`, { next: { revalidate } });
    if (!r.ok) return [];
    return (await r.json()).items ?? [];
  } catch {
    // A gallery that 500s because an API blinked is worse than a quiet page.
    return [];
  }
}

function openUrl(item: Item) {
  if (!item.url) return null;
  const path = item.kind === 'App' ? 'a' : item.kind === 'Game' ? 'g' : 's';
  return `${APP}/${path}/${item.url}`;
}

export default async function Made() {
  const items = await fetchItems();

  return (
    <main className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <Reveal>
          <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase text-cream-soft/50 mb-6">
            Made with Creai
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] mb-6">
            Real businesses,
            <br />
            built by the people who run them.
          </h1>
          <p className="text-cream-soft text-lg leading-relaxed max-w-2xl">
            Every one of these started as a sentence. Open any of them — they are live sites, not
            screenshots. Find one close to what you need and take it: you get the shape, and
            nothing of theirs.
          </p>
        </Reveal>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {items.length === 0 ? (
          <Reveal>
            <div className="hairline border rounded-xl p-12 text-center">
              <p className="font-display text-3xl tracking-tight mb-3">Nothing here yet.</p>
              <p className="text-cream-soft mb-8">
                The first businesses are being built. This fills up as people choose to show
                their work.
              </p>
              <a
                href={APP}
                className="inline-block font-mono-label text-[11px] tracking-[0.22em] uppercase text-leaf"
              >
                Build the first one ↗
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const open = openUrl(item);
              return (
                <Reveal key={item.id} delay={Math.min(i, 8) * 70}>
                  <article className="group hairline border rounded-xl overflow-hidden h-full flex flex-col">
                    <div className="aspect-[4/3] bg-night/60 overflow-hidden">
                      {item.thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${APP}${item.thumb}`}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center">
                          <span className="font-display text-5xl text-cream-soft/15">
                            {item.name.slice(0, 1)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h2 className="font-display text-2xl tracking-tight">{item.name}</h2>
                        <span className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/45 ml-auto">
                          {item.kind}
                        </span>
                      </div>
                      {item.headline && (
                        <p className="text-cream-soft/80 text-sm leading-relaxed line-clamp-2">
                          {item.headline}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-auto pt-3">
                        {open && (
                          <a
                            href={open}
                            target="_blank"
                            rel="noopener"
                            className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/70 hover:text-cream"
                          >
                            Open ↗
                          </a>
                        )}
                        <a
                          href={`${APP}/?remix=${item.id}`}
                          className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-leaf ml-auto"
                        >
                          Make it mine →
                        </a>
                      </div>
                      {item.remixes > 0 && (
                        <p className="font-mono-label text-[10px] tracking-[0.2em] uppercase text-cream-soft/35">
                          {item.remixes} {item.remixes === 1 ? 'remix' : 'remixes'}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal delay={200}>
          <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase text-cream-soft/45 mt-14">
            Taking one copies the page and the code. Never their customers, their records, their
            files or their takings.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
