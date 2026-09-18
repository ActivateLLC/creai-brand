/**
 * What Creai is, in the vocabulary search engines read.
 *
 * Every figure here is taken from the real plans, because structured data that
 * disagrees with the pricing page is worse than none: Google treats the mismatch
 * as a reason to distrust the whole page, and a person who clicks a $12 result
 * and finds $35 does not come back.
 *
 * Kept as data rather than markup so there is one place to correct when prices
 * move, and so the pricing page and this file can be checked against each other.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.creai.dev';
const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.creai.dev';

// Straight from app/services/plans.py, in dollars.
export const PLANS = [
  { name: 'Free', price: 0, blurb: 'Build, publish on a Creai address, keep what you make.' },
  { name: 'Launch', price: 12, blurb: 'Your own domain, hosted with HTTPS, no Creai badge.' },
  { name: 'Growth', price: 35, blurb: 'More of everything, for a business that is moving.' },
];

export function organisation() {
  return {
    '@type': 'Organization',
    '@id': `${SITE}/#organisation`,
    name: 'Creai',
    url: SITE,
    logo: { '@type': 'ImageObject', url: `${SITE}/icon.png` },
    description:
      'Creai turns a sentence into a working business: a site, an app your customers sign in to, ' +
      'payments, a domain and the marketing that follows.',
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: 'Creai',
    publisher: { '@id': `${SITE}/#organisation` },
    inLanguage: 'en',
  };
}

export function application() {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE}/#app`,
    name: 'Creai',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    url: APP,
    publisher: { '@id': `${SITE}/#organisation` },
    description:
      'Describe a business in a sentence and Creai builds the site, the app people sign in to, ' +
      'and the marketing — publishing only when you say so.',
    featureList: [
      'Websites and web apps built from a description',
      'Accounts, so customers sign in and see only their own things',
      'Payments into the business owner’s own Stripe account',
      'Domain registration and hosting',
      'Social posts drafted from the site and scheduled for approval',
      'Playable browser and Godot games',
      'Export everything, any time',
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: String(Math.max(...PLANS.map((p) => p.price))),
      offerCount: String(PLANS.length),
      offers: PLANS.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(p.price),
        priceCurrency: 'USD',
        description: p.blurb,
        url: `${SITE}/pricing`,
        availability: 'https://schema.org/InStock',
      })),
    },
  };
}

/** Questions people actually ask before signing up, answered straight. */
export const FAQ = [
  {
    q: 'Do I own what Creai builds?',
    a:
      'Yes. Export the site, app or game whenever you like, and any domain you buy through Creai ' +
      'is registered in your name with your contact details.',
  },
  {
    q: 'Do I need to know how to code?',
    a:
      'No. You describe the business in plain words and Creai builds it, then you change it by ' +
      'saying what you want different. There is no editor to learn afterwards.',
  },
  {
    q: 'Can customers sign in to what I build?',
    a:
      'Yes. Creai builds accounts natively, and each person sees only their own invoices, ' +
      'bookings or records — enforced on the server, not by the page.',
  },
  {
    q: 'Can I take payments?',
    a:
      'Yes, into your own Stripe account. The money goes to you, your name is on the statement, ' +
      'and Creai takes a small fee on each charge.',
  },
  {
    q: 'Does anything go live without me?',
    a:
      'No. Publishing, domains and social posts all wait for your approval. Posting can be set ' +
      'to run on its own later, once you have confirmed the brand.',
  },
  {
    q: 'I already have a website. Can Creai host it?',
    a:
      'Yes. Bring the folder your site is in and Creai hosts it and points your domain at it.',
  },
];

export function faqPage() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema.org data is ours, not user input; still serialised rather than templated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
