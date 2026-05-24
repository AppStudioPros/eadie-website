import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — EADIE",
  description: "Terms of service for the EADIE marketing site and platform.",
};

export default function TermsPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-muted mb-12">Effective Date: May 24, 2026</p>

        <Section title="1. Acceptance of Terms">
          <p>
            These Terms of Service (the &quot;Terms&quot;) govern your access to and use of the EADIE website at encoreacquisitionintelligenceengine.com and any related software, services, applications, briefings, demonstrations, and content (collectively, the &quot;Services&quot;) operated by Encore Services, LLC (&quot;Encore,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.
          </p>
        </Section>

        <Section title="2. About EADIE and Encore Services">
          <p>
            EADIE (Encore Acquisition Decision Intelligence Engine) is a product of Encore Services, LLC, a Service-Disabled Veteran-Owned Small Business and AI technology solutions provider for federal agencies. EADIE provides multi-dimensional federal contractor evaluation, methodology management, and audit-trail-grounded decision support for use in federal acquisition.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            The Services are intended for use by federal contracting officers, agency procurement leadership, federal acquisition consultancies, qualified federal contractors, and other institutional users with a legitimate interest in federal procurement decision support. You represent that you are at least eighteen years of age and have the authority to enter into these Terms on behalf of yourself and any organization you represent.
          </p>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            The EADIE platform, including all software, models, methodology objects, workspace state architecture, audit-trail systems, designs, logos, and the methods underlying its operation, is the property of Encore Services, LLC or its licensors. Multiple novel mechanisms within the platform are protected by one or more pending U.S. patent applications. Nothing in these Terms grants you any right, title, or interest in the platform or its intellectual property other than the limited right to access and use the Services as expressly permitted.
          </p>
        </Section>

        <Section title="5. Restricted Demonstrations and Confidentiality">
          <p>
            The Services may include restricted-access demonstrations available only to invited users with credentials issued by Encore. You agree not to share access credentials, reproduce, screenshot, record, distribute, or disclose the demonstration content to any third party without written permission. Any content marked or identified as confidential is the confidential information of Encore Services, LLC and may not be used for any purpose other than evaluation of the Services.
          </p>
        </Section>

        <Section title="6. Acceptable Use">
          <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You will not:</p>
          <ul>
            <li>Reverse engineer, decompile, or attempt to derive the source of any part of the platform</li>
            <li>Use the Services to develop a competing product, model, methodology, or dataset</li>
            <li>Scrape, harvest, or programmatically extract data without express written permission</li>
            <li>Misrepresent your identity or the institution you represent</li>
            <li>Submit demo or briefing requests that contain false, fraudulent, or impersonated information</li>
            <li>Interfere with the security, integrity, or performance of the Services</li>
          </ul>
        </Section>

        <Section title="7. Outputs Are Decision Support">
          <p>
            Outputs generated by the platform (dimensional scores, contractor rankings, sources sought memos, decision matrices, counter-argument packages, protest-defense briefs, reasoning trails, and similar) are provided for decision support purposes only. They do not constitute legal advice, contracting officer judgment, agency policy, or any binding determination. Contracting officers, federal agencies, and users are solely responsible for verifying outputs and for any award, modification, or related decisions taken based on them.
          </p>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>
            THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, ENCORE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NONINFRINGEMENT, ACCURACY, AND UNINTERRUPTED AVAILABILITY.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, ENCORE SERVICES, LLC AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUES, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES. OUR AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS.
          </p>
        </Section>

        <Section title="10. Indemnification">
          <p>
            You agree to defend, indemnify, and hold harmless Encore Services, LLC and its officers, directors, employees, agents, and affiliates from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Services or your breach of these Terms.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            We may suspend or terminate your access to the Services at any time, with or without cause and with or without notice. Upon termination, all rights granted to you under these Terms will immediately cease. Sections that by their nature should survive termination (including Intellectual Property, Confidentiality, Disclaimers, Limitation of Liability, and Indemnification) will survive.
          </p>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Maryland, United States, without regard to its conflict of laws principles. Any dispute arising out of or related to these Terms shall be resolved in the state or federal courts located in Maryland, and you consent to the exclusive jurisdiction and venue of those courts.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We may update these Terms from time to time. The effective date at the top of this page reflects the most recent revision. Material changes will be reasonably communicated. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            Questions about these Terms can be directed to Encore Services, LLC at <a href="mailto:jwoodson@encoresvcsllc.com" className="text-accent hover:underline">jwoodson@encoresvcsllc.com</a>.
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
