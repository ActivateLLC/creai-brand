// The CreAI venture family, as shown on the brand site. Edit freely —
// descriptions for ventures still in development are deliberately neutral;
// replace them as each venture becomes real.

export interface Venture {
  id: string;
  name: string;
  url: string | null; // null = not yet public
  status: 'live' | 'preview' | 'in-development';
  tagline: string;
  detail: string;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://api-production-2412f.up.railway.app';

export const ventures: Venture[] = [
  {
    id: 'launch',
    name: 'CreAI Launch',
    url: APP_URL,
    status: 'preview',
    tagline: 'Talk. Watch it build. Launch.',
    detail:
      'Describe your business and watch your site come together live, beside the chat. Connect your domain, draft your first campaign, approve every step. Publishing to your own domain is next.',
  },
  {
    id: 'skills',
    name: 'CreAI Skills',
    url: 'https://skills.creai.dev',
    status: 'live',
    tagline: 'Agents that work. Yours to keep.',
    detail:
      'Plug-and-play automation kits for lead qualification, inbox triage, meetings and content — tested, complete, and yours after one payment. Try one free.',
  },
  {
    id: 'activate',
    name: 'Activate',
    url: null,
    status: 'in-development',
    tagline: 'The next venture from the studio.',
    detail: 'In development. Details when it ships — we announce things that work, not waitlists.',
  },
  {
    id: 'arbi',
    name: 'Arbi',
    url: null,
    status: 'in-development',
    tagline: 'The next venture after that.',
    detail: 'In development. Details when it ships — we announce things that work, not waitlists.',
  },
];
