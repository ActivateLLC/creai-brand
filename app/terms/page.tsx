import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, LegalPage, OPERATOR, Section } from '@/components/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — CreAI',
  description: 'The agreement for using CreAI: accounts, credits, your content, connected tools and approvals.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms are an agreement between you and ${OPERATOR} ("CreAI", "we") for using creai.dev, app.creai.dev and related services. By creating an account or using CreAI, you agree to them. If you use CreAI for a business, you agree on its behalf.`}
    >
      <Section n="01" title="The service">
        <p>CreAI is an AI assistant that helps you create and edit websites, connect domains and existing platforms, and draft marketing content. Features may change as we improve the product.</p>
      </Section>

      <Section n="02" title="Your account">
        <p>You must be at least 16 and able to form a binding contract. Keep your sign-in secure; you are responsible for activity in your account and workspaces. Tell us promptly at <a className="text-leaf underline underline-offset-4" href={`mailto:${CONTACT}`}>{CONTACT}</a> if you suspect unauthorised use.</p>
      </Section>

      <Section n="03" title="Credits and payments">
        <p>Using the assistant consumes credits, based on the work each request takes. New accounts receive a one-time allowance of free credits. You can buy credit packs in the app; prices are shown before you pay, and taxes may apply.</p>
        <p>Credits are prepaid, are not cash, cannot be transferred, and are non-refundable except where the law requires or where we charged you in error. We may change pack prices or credit rates for future purchases; credits you already hold keep their value. If we end the service, we will refund unused purchased credits.</p>
      </Section>

      <Section n="04" title="Your content">
        <p>You own what you bring to CreAI and what CreAI creates for you, to the extent the law allows. You give us permission to host, process and transmit it only as needed to run the service for you. You are responsible for your content and for having the rights to use it, including images, text and trademarks.</p>
      </Section>

      <Section n="05" title="AI output and your review">
        <p>AI can make mistakes. Review what CreAI produces before you rely on it, and check anything factual, legal, pricing-related or regulated. CreAI does not provide legal, financial, tax or professional advice.</p>
      </Section>

      <Section n="06" title="Approvals and connected tools">
        <p>Actions that are public, costly or hard to undo — such as publishing to your live domain, deleting content, writing DNS records or posting to social accounts — wait for your approval unless you turn on automatic publishing. When you approve an action, or enable automatic publishing, you authorise CreAI to carry it out on the connected platform.</p>
        <p>When you connect a platform such as Webflow, you confirm you are allowed to, and your use of that platform stays subject to its own terms. You can disconnect at any time.</p>
      </Section>

      <Section n="07" title="Acceptable use">
        <p>Don&apos;t use CreAI to break the law, infringe others&apos; rights, send spam, deceive people, distribute malware, harass anyone, or create content that exploits or endangers others. Don&apos;t try to access other workspaces, disrupt the service, or get around its limits. You must also follow the usage policies of our AI provider. We may suspend accounts that break these rules.</p>
      </Section>

      <Section n="08" title="Domains, DNS and third-party services">
        <p>Domain registration, DNS and publishing depend on third parties such as registrars, DNS providers and hosting platforms. Changes can take time to propagate, and we are not responsible for outages or policies of services we don&apos;t control.</p>
      
        <p>When you buy a domain through CreAI, it is registered in your name with the contact details you give us, through Cloudflare Registrar. You pay in credits at the registry&apos;s price plus a small fee, shown before you buy. Registrations can&apos;t be refunded once complete; if a registration fails, your credits are returned. CreAI renews your domain each year from your credits and tells you beforehand; if your balance can&apos;t cover a renewal, we&apos;ll contact you before it lapses. You can move your domain to another registrar at any time.</p>
        <p>Sites and apps you publish are served on a CreAI address or your own domain until you unpublish them, and you are responsible for what you publish.</p>
      </Section>

      <Section n="09" title="Disclaimers">
        <p>CreAI is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent the law allows, we disclaim implied warranties of merchantability, fitness for a particular purpose and non-infringement, and we do not promise the service will be uninterrupted or error-free.</p>
      </Section>

      <Section n="10" title="Limitation of liability">
        <p>To the extent the law allows, CreAI is not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue or data. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim, or $100 if greater.</p>
      </Section>

      <Section n="11" title="Ending use">
        <p>You can stop using CreAI and delete your account at any time. We may suspend or end access for a breach of these terms or where required by law, and will tell you when we can.</p>
      </Section>

      <Section n="12" title="Changes and law">
        <p>If we change these terms in a meaningful way, we will update the effective date and notify account holders before the change applies. These terms are governed by the laws of the State of Wisconsin, USA, without regard to conflict-of-law rules, except where your local consumer law gives you rights that can&apos;t be waived.</p>
        <p>See also our <Link href="/privacy" className="text-leaf underline underline-offset-4">Privacy Policy</Link>.</p>
      </Section>
    </LegalPage>
  );
}
