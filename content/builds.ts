/**
 * The /build/* pages.
 *
 * The line between a programmatic page and scaled-content sludge is whether the
 * page contains something that had to be made. Every entry here points at an app
 * Creai actually built and a screenshot of it running — not a description of what
 * could be built. That is the part competitors cannot cheaply copy, and it is
 * what both search ranking and model retrieval are filtering for.
 *
 * So a new entry is not free: it requires building the thing first. That friction
 * is deliberate. Three hundred pages spun from this file without artifacts would
 * be worth less than the twelve with them.
 *
 * Honesty rules for anything added here:
 *  · `sentence` is the actual prompt that produced the app, not a tidied version
 *  · `minutes` is the real elapsed time, rounded up rather than down
 *  · `honestly` names who this is a bad fit for. A page with no losing row reads
 *    as marketing and gets discounted; one that concedes gets quoted as a source.
 */

export type Build = {
  slug: string;
  title: string;
  h1: string;
  blurb: string;
  sentence: string;
  shot: string;
  minutes: number;
  built: string[];
  honestly: string;
  faq: { q: string; a: string }[];
};

export const BUILDS: Build[] = [
  {
    slug: 'ai-crm',
    title: 'Build an AI CRM',
    h1: 'A CRM built from one sentence',
    blurb:
      'Pipeline, lead stages, values and what to chase next — built by describing it, with no ' +
      'spreadsheet and no editor to learn afterwards.',
    sentence:
      'A simple CRM for a contractor: leads with a stage, a value and the next thing to do, ' +
      'and show me what needs chasing.',
    shot: '/build/ai-crm.webp',
    minutes: 6,
    built: [
      'Leads with stages, values and a next action',
      'Open-pipeline total that updates as deals close',
      'A “needs attention” count for quotes going cold',
      'Sign-in, so each salesperson sees only their own leads',
    ],
    honestly:
      'If you already run Salesforce or HubSpot and your team lives in it, this will not replace ' +
      'it. This is for people currently running a pipeline out of a spreadsheet or their head.',
    faq: [
      {
        q: 'Can more than one person use it?',
        a: 'Yes. Creai builds accounts in, and each person sees only their own leads — enforced ' +
           'on the server, not by the page remembering to hide things.',
      },
      {
        q: 'Do I own the code?',
        a: 'Yes. Export the whole thing whenever you like, and any domain you buy through Creai ' +
           'is registered in your name.',
      },
      {
        q: 'What does it cost to build?',
        a: 'Building is free with the credits on the free plan. You only pay when you want your ' +
           'own domain and monthly credits.',
      },
    ],
  },
  {
    slug: 'booking-app',
    title: 'Build a booking app with AI',
    h1: 'A booking app, built by describing your day',
    blurb:
      'Real slots, real prices, taken times greyed out, and the deposit taken into your own ' +
      'Stripe account.',
    sentence:
      'Let customers book a drain inspection — 45 minutes, $120, show my free slots for the week ' +
      'and take the payment.',
    shot: '/build/booking-app.webp',
    minutes: 5,
    built: [
      'Slots for the day with taken times disabled',
      'The job, its length and its price on the confirmation',
      'Payment at the point of booking, into the owner’s Stripe',
      'Every booking visible to the owner, each customer sees only their own',
    ],
    honestly:
      'It does not sync with Google Calendar yet, so if your availability lives there you will ' +
      'be keeping two things in step. Worth knowing before you start.',
    faq: [
      {
        q: 'Where does the money go?',
        a: 'Into your own Stripe account, with your name on the customer’s statement. Creai never ' +
           'holds it and takes a small fee on each charge.',
      },
      {
        q: 'Can customers change a booking?',
        a: 'Yes, if you ask for it — say so in the conversation and it gets built in.',
      },
      {
        q: 'Does it work on a phone?',
        a: 'Yes. Everything Creai builds is made for a phone first, because that is where most ' +
           'customers will open it.',
      },
    ],
  },
  {
    slug: 'order-tracker',
    title: 'Build an order tracker with AI',
    h1: 'Tomorrow’s orders, on one screen',
    blurb:
      'What to make, who it is for, when it is collected and what has been paid — built by ' +
      'describing a morning.',
    sentence:
      'Show me tomorrow’s bakery orders: what to bake, who ordered, collection time, and whether ' +
      'they have paid.',
    shot: '/build/order-tracker.webp',
    minutes: 4,
    built: [
      'Orders with items, collection time and payment state',
      'A count of what to make and the money taken',
      'Customers can see their own order, and nobody else’s',
      'Works on the phone propped by the oven',
    ],
    honestly:
      'This is a day-to-day working screen, not stock control or accounting. If you need ' +
      'inventory and costing, you want something bigger than this.',
    faq: [
      {
        q: 'Can customers order through it?',
        a: 'Yes — ask for a customer-facing order form and it gets built alongside the owner’s ' +
           'screen, with payments if you want them.',
      },
      {
        q: 'What if I want to change it later?',
        a: 'You say what you want different, in words. There is no editor to learn and no second ' +
           'tool waiting behind the conversation.',
      },
      {
        q: 'Can I get my data out?',
        a: 'Yes, as plain JSON, whenever you ask. Your customers’ records belong to you.',
      },
    ],
  },
];

export function buildBySlug(slug: string) {
  return BUILDS.find((b) => b.slug === slug);
}
