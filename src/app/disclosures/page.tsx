import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclosures — EADIE",
  description: "Disclosures regarding the EADIE platform and outputs.",
};

export default function DisclosuresPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Disclosures</h1>
        <p className="text-muted mb-12">Effective Date: May 24, 2026</p>

        <Section title="Forward-Looking Statements">
          <p>
            Material on this site may include forward-looking statements regarding the capabilities, roadmap, partnerships, and commercial outcomes of the EADIE platform. Forward-looking statements reflect current expectations and assumptions and are not guarantees of future results. Actual outcomes may differ materially.
          </p>
        </Section>

        <Section title="Intellectual Property and Patents">
          <p>
            One or more U.S. provisional patent applications have been filed in connection with the EADIE platform and its constituent methods, including the multi-dimensional contractor evaluation framework, methodology-as-object architecture, stateful workflow with persistent context-bound artificial intelligence assistant, and audit-trail-grounded refinement chat. References to &quot;patent pending&quot; or &quot;U.S. Provisional Patent Application Filed&quot; relate to those applications and to additional applications that may be filed. Provisional applications do not themselves constitute issued patents and remain subject to the standard U.S. examination process.
          </p>
        </Section>

        <Section title="Outputs Are Decision Support, Not Legal or Acquisition Advice">
          <p>
            Dimensional scores, contractor rankings, sources sought memos, decision matrices, counter-argument packages, reasoning trails, protest-defense briefs, and similar outputs of the EADIE platform are decision support information. They are not legal advice, contracting officer judgment, agency policy, or any binding determination under the Federal Acquisition Regulation or any agency supplement. Decisions based on the outputs are the responsibility of the contracting officer or other authorized user and should be validated against applicable regulation, agency policy, source data, and professional judgment.
          </p>
        </Section>

        <Section title="Federal Acquisition Regulation Compliance">
          <p>
            The EADIE platform is designed to support compliant federal acquisition practice. Use of the platform does not by itself satisfy any contracting officer obligation under the Federal Acquisition Regulation, agency supplements, or applicable executive orders. Contracting officers and federal users are responsible for ensuring compliant acquisition practice in their decisions.
          </p>
        </Section>

        <Section title="Demonstration Material">
          <p>
            Restricted demonstrations may display synthetic, illustrative, or partial data intended to communicate platform capability. Demonstration outputs do not represent final commercial deliverables and should not be relied upon for operational decisions.
          </p>
        </Section>

        <Section title="No Solicitation of Investment">
          <p>
            Nothing on this site constitutes an offer to sell, or a solicitation of an offer to buy, securities or other investment products. Any future investment opportunity will be conducted through appropriate channels and subject to applicable securities laws.
          </p>
        </Section>

        <Section title="Affiliations and Operating Entity">
          <p>
            EADIE is a product of Encore Services, LLC, a Service-Disabled Veteran-Owned Small Business and AI technology solutions provider headquartered in Maryland. References on this site to federal agencies, contractor names, or other third parties are illustrative or descriptive only and do not imply endorsement by the named entity unless expressly stated.
          </p>
        </Section>

        <Section title="Trademarks">
          <p>
            EADIE, Encore Acquisition Decision Intelligence Engine, and Encore Services, LLC are trademarks or service marks of Encore Services, LLC. All other product and company names mentioned are the property of their respective owners.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions regarding these disclosures can be directed to Encore Services, LLC at <a href="mailto:jwoodson@encoresvcsllc.com" className="text-accent hover:underline">jwoodson@encoresvcsllc.com</a>.
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
      <div className="text-light text-base leading-relaxed space-y-4 [&_a]:text-accent [&_a]:hover:underline">
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
