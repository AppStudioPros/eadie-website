import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — EADIE",
  description: "Privacy policy for the EADIE marketing site and platform.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen text-text">
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/80 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
              <span className="text-[10px] text-muted leading-none mt-0.5 uppercase tracking-widest">Decision Intelligence</span>
            </div>
          </Link>
          <Link href="/" className="text-sm text-muted hover:text-text transition-colors">← Back to home</Link>
        </nav>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-sm text-muted uppercase tracking-wider mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-muted mb-12">Effective Date: May 24, 2026</p>

        <Section title="1. Overview">
          <p>
            This Privacy Policy describes how Encore Services, LLC (&quot;Encore,&quot; &quot;we,&quot; or &quot;us&quot;) collects, uses, and protects information in connection with the EADIE website and Services. We handle information responsibly and proportionately to the federal procurement context in which the Services operate.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following categories of information:</p>
          <ul>
            <li>Information you provide directly through demo request forms (name, work email, organization, role, agency or affiliation, briefing type, message text)</li>
            <li>Information you provide as part of a restricted demonstration (institutional context, project details, demonstration interactions)</li>
            <li>Information collected automatically when you visit the site (IP address, browser type, device information, referring URL, pages viewed)</li>
            <li>Standard server logs maintained for security, performance, and abuse-prevention purposes</li>
          </ul>
        </Section>

        <Section title="3. How We Use Information">
          <p>We use the information to:</p>
          <ul>
            <li>Respond to demo and briefing requests</li>
            <li>Operate, maintain, and improve the Services</li>
            <li>Authenticate and authorize access to restricted demonstrations</li>
            <li>Detect, investigate, and prevent fraudulent, abusive, or unauthorized activity</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </Section>

        <Section title="4. Information Sharing">
          <p>We do not sell personal information. We share information only with:</p>
          <ul>
            <li>Service providers acting on our behalf under contractual confidentiality obligations (hosting, analytics, email delivery)</li>
            <li>Authorized institutional partners with whom you have a legitimate engagement, only with your knowledge</li>
            <li>Authorities when required by law or to protect rights, safety, or property</li>
          </ul>
        </Section>

        <Section title="5. Cookies and Analytics">
          <p>
            The site may use cookies and similar technologies to remember preferences, maintain sessions, and collect aggregated usage analytics. You can disable cookies in your browser, though some features may not function as intended.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            The Services are served over HTTPS with current TLS standards. Restricted-demonstration access is gated by credentials. We maintain administrative, technical, and physical safeguards designed to protect information against unauthorized access, loss, or alteration. No system is perfectly secure; we make commercially reasonable efforts to protect information.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain information for as long as needed to provide the Services, respond to inquiries, comply with legal obligations, resolve disputes, and enforce agreements. When information is no longer required, we take reasonable steps to delete or anonymize it.
          </p>
        </Section>

        <Section title="8. No Marketing Lists">
          <p>
            We do not add inquirers to general marketing lists. Submissions through the demo request form are used solely to schedule briefings, respond to inquiries, and maintain a relationship with you regarding the inquiry. We do not sell, rent, or share inquiry contact information for marketing purposes.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, delete, or limit our use of information about you. To exercise these rights, contact us at the email below. We will respond consistent with applicable law.
          </p>
        </Section>

        <Section title="10. International Use">
          <p>
            The Services are operated from the United States. By using the Services from outside the United States, you understand that information may be transferred to, stored in, and processed in the United States.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The effective date at the top of this page reflects the most recent revision. Material changes will be reasonably communicated.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Privacy questions can be directed to Encore Services, LLC at <a href="mailto:jwoodson@encoresvcsllc.com" className="text-accent hover:underline">jwoodson@encoresvcsllc.com</a>.
          </p>
        </Section>
      </article>

      <LegalFooter />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4 text-accent">{title}</h2>
      <div className="text-light text-base leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-accent [&_a]:hover:underline">
        {children}
      </div>
    </section>
  );
}

function LegalFooter() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center">
        <div className="text-sm text-muted mb-2">
          EADIE — Encore Acquisition Decision Intelligence Engine, a product of <a href="https://encoresvcsllc.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Encore Services, LLC</a>.
        </div>
        <div className="text-xs text-muted">
          © {new Date().getFullYear()} Encore Services, LLC. All rights reserved. U.S. Provisional Patent Application Filed.
        </div>
        <div className="text-xs text-muted mt-4 flex items-center justify-center gap-4">
          <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/disclosures" className="hover:text-accent transition-colors">Disclosures</Link>
        </div>
      </div>
    </footer>
  );
}
