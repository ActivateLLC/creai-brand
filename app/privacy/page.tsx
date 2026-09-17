import type { Metadata } from 'next';
import { CONTACT, LegalPage, OPERATOR, Section } from '@/components/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — CreAI',
  description: 'What CreAI collects, why, who helps us run the service, and the choices you have.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what ${OPERATOR} ("CreAI", "we") collects when you use creai.dev and app.creai.dev, why we collect it, who helps us run the service, and the choices you have. We collect only what we need to build, edit and launch your site, and we never sell your personal information.`}
    >
      <Section n="01" title="What we collect">
        <p><strong>Account details.</strong> Your email address, and your name if you sign in with Google. When you sign in with Google we receive only your basic profile (name, email and profile picture) and a unique account ID. We do not receive your Google password or access to your Gmail, Drive or other Google data.</p>
        <p><strong>What you create.</strong> The messages you send the assistant, your site drafts and settings, post drafts, domains you connect, and your approval decisions.</p>
        <p><strong>Connected tools.</strong> If you connect a platform such as Webflow, we store an access token for it, encrypted, and use it only to act on your sites at your request.</p>
        <p><strong>Payments.</strong> Purchases are processed by our payment provider. We receive the pack you bought, the amount and the payment method type. Card numbers never reach our servers.</p>
        <p><strong>Usage and technical data.</strong> Credit usage, basic logs (such as request times and errors) and security events, used to run, bill and protect the service.</p>
      </Section>

      <Section n="02" title="How we use it">
        <p>To provide the service: generating and editing your site, connecting domains, drafting content, and carrying out actions you approve. To bill credits and process purchases. To keep accounts secure and prevent abuse. To send service emails such as sign-in codes, receipts, invitations and approval notices. To improve reliability. We do not use your content to train AI models, and we do not sell or rent personal information.</p>
      </Section>

      <Section n="03" title="AI processing">
        <p>Your messages and site content are sent to our AI providers (Anthropic, and Meta where that model is in use) to generate replies and changes. Descriptions of images for your posts are sent to Hugging Face and its hosting partners to create those images. This happens only to serve your request. Results can be wrong, so nothing is published, posted or charged without your approval.</p>
      </Section>

      <Section n="04" title="Who helps us run CreAI">
        <p>We share data only with service providers that process it on our behalf, under their own security and privacy commitments:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Anthropic — AI model processing</li>
          <li>Meta — AI model processing (Meta Model API), where enabled</li>
          <li>Hugging Face and its inference partners (such as fal) — image generation</li>
          <li>Railway — application hosting and databases</li>
          <li>Stripe — payment processing</li>
          <li>Resend — transactional email</li>
          <li>Google — sign-in (when you choose it)</li>
          <li>Webflow and other platforms you connect — to make the changes you ask for</li>
          <li>Postiz (run by CreAI) and the social networks you connect — to publish the posts you approve</li>
          <li>Cloudflare — DNS for domains you connect</li>
          <li>Google Fonts and esm.sh — fonts and open-source code libraries loaded by site and app previews (they see the viewer&apos;s IP address, as any website font or library host does)</li>
        </ul>
        <p>We may also disclose information if required by law, or to protect the rights, safety or security of our users or the service.</p>
      </Section>

      <Section n="05" title="Google user data">
        <p>CreAI&apos;s use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. We use Google sign-in data only to create and secure your account.</p>
      </Section>

      <Section n="06" title="Cookies and local storage">
        <p>We use a small number of first-party cookies and browser storage entries: one to keep an unsaved draft for up to 30 days, one to keep you signed in, and preferences such as your theme. We do not use advertising or cross-site tracking cookies.</p>
      </Section>

      <Section n="07" title="How long we keep it">
        <p>Unclaimed drafts expire after 30 days. Account data and your content are kept while your account is active. Connected-tool tokens are deleted when you disconnect. Billing records are kept as long as the law requires. When you delete your account, we delete or anonymise your data within 30 days, except where we must keep it for legal reasons.</p>
      </Section>

      <Section n="08" title="Security">
        <p>Data is encrypted in transit. Access tokens for connected tools are encrypted at rest. Each workspace is isolated from every other, and access by our staff is limited and logged. No system is perfectly secure, and we will notify you of a breach affecting your data as the law requires.</p>
      </Section>

      <Section n="09" title="Your choices and rights">
        <p>You can access, correct, export or delete your information, disconnect any connected tool at any time, and ask us questions about how your data is used. Depending on where you live (for example California, the EEA or the UK), you may have additional rights, including to object to or restrict processing. Email <a className="text-leaf underline underline-offset-4" href={`mailto:${CONTACT}`}>{CONTACT}</a> and we will respond within the time the law requires.</p>
      </Section>

      <Section n="10" title="Children">
        <p>CreAI is not directed to children under 16, and we do not knowingly collect their information. If you believe a child has given us information, contact us and we will delete it.</p>
      </Section>

      <Section n="11" title="Changes">
        <p>If we change this policy in a meaningful way, we will update the effective date and let account holders know before the change takes effect.</p>
      </Section>
    </LegalPage>
  );
}
