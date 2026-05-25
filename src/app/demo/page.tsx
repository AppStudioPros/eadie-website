import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="relative min-h-screen text-text z-10">
      {/* Demo header — distinct from public site */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/80 border-b border-amber/30">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/demo" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
              <span className="text-[10px] text-accent leading-none mt-0.5 uppercase tracking-widest">Demo · Confidential</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-xs">
            <a href="#setup" className="text-muted hover:text-text transition-colors">Setup</a>
            <a href="#dimensions" className="text-muted hover:text-text transition-colors">Dimensions</a>
            <a href="#pause" className="text-muted hover:text-text transition-colors">Pause</a>
            <a href="#export" className="text-muted hover:text-text transition-colors">Export</a>
            <Link href="/" className="text-muted hover:text-text transition-colors">← Public site</Link>
          </div>
        </nav>
      </header>

      {/* Demo banner */}
      <div className="bg-accent/10 border-b border-accent/30 py-2">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap text-xs">
          <span className="text-accent font-semibold uppercase tracking-wider">Confidential Demo · For Recipient Eyes Only</span>
          <span className="text-muted">Encore Services, LLC · Pending U.S. Provisional Patent Application</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
            EADIE Walkthrough · Sample VAMC Acquisition
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            From acquisition setup to defensible decision package, in under an hour.
          </h1>
          <p className="text-lg md:text-xl text-light max-w-3xl leading-relaxed mb-10">
            This walkthrough takes a real-shape VAMC janitorial services acquisition through the EADIE workflow: setup, ten-dimension analysis, pause-resume refinement, and audit-trail export. Everything you see is a representative mock of the production experience.
          </p>
          <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-6 md:p-7 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber mb-3">Sample Acquisition</div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <DemoField label="Title" value="VAMC Denver Janitorial Services" />
              <DemoField label="Set-Aside" value="SDVOSB" />
              <DemoField label="NAICS" value="561720 — Janitorial Services" />
              <DemoField label="Contract Value" value="$3.2M (5-year, FFP)" />
              <DemoField label="Place of Performance" value="Denver, CO (VAMC + 4 CBOCs)" />
              <DemoField label="Criticality" value="High · Patient-care facility" />
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 — Setup + Methodology */}
      <section id="setup" className="py-16 md:py-20 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="01" title="Setup & Methodology Loaded" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            The CO loads their team's saved methodology for VAMC facility services. EADIE applies the weighted profile to the requirement and pulls candidate contractors from SAM.gov, FPDS-NG, SBIR.gov, and agency-internal records.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Panel title="Methodology applied" tone="accent">
              <KV k="Template" v="VAMC Facility Services v3.2 (team-shared)" />
              <KV k="Top weight" v="Specialized-Domain Depth · 22%" />
              <KV k="Next weight" v="Geographic Fit · 18%" />
              <KV k="Dealbreaker" v="Active CPARS rating below 3.0" />
              <KV k="Disclosure" v="Reasoning Trail (summarized) in export" />
            </Panel>
            <Panel title="Candidates ingested" tone="muted">
              <KV k="SAM.gov matches" v="247 SDVOSB contractors" />
              <KV k="After dealbreaker" v="194 contractors" />
              <KV k="With facility past performance" v="63 contractors" />
              <KV k="Locally-presenced (Denver MSA)" v="41 contractors" />
              <KV k="Initial shortlist (top-quartile)" v="12 contractors" />
            </Panel>
          </div>
        </div>
      </section>

      {/* Step 2 — Ten Dimensions */}
      <section id="dimensions" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="02" title="Ten-Dimension Analysis" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            EADIE scores every shortlisted contractor across all ten evaluation dimensions. Sample scoring for the top three candidates is shown below. Every score is traceable to source records — click any cell in production to see the underlying evidence.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.04] border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted font-semibold">Dimension</th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-muted font-semibold">Contractor A<br /><span className="text-light/60 text-[10px]">SDVOSB · 8yr · Denver</span></th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-muted font-semibold">Contractor B<br /><span className="text-light/60 text-[10px]">SDVOSB · 2yr · Aurora</span></th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-muted font-semibold">Incumbent<br /><span className="text-light/60 text-[10px]">Large · 12yr · multi-region</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <ScoreRow dim="01 · Adjacent-Capability Match" a={8.2} b={7.4} c={9.1} />
                <ScoreRow dim="02 · Modern-Methodology Premium" a={7.8} b={9.4} c={4.2} highlight="B" />
                <ScoreRow dim="03 · Incumbent-Overcommitment Risk" a={2.1} b={1.4} c={7.6} highlight="C-risk" />
                <ScoreRow dim="04 · Specialized-Domain Depth (VAMC)" a={8.9} b={6.7} c={9.5} />
                <ScoreRow dim="05 · Geographic & Cultural Fit" a={9.6} b={9.2} c={5.8} highlight="A" />
                <ScoreRow dim="06 · Innovation Trajectory" a={6.5} b={9.1} c={3.4} highlight="B" />
                <ScoreRow dim="07 · Subcontractor Network Quality" a={7.9} b={7.2} c={8.4} />
                <ScoreRow dim="08 · Counter-Concentration Value" a={6.8} b={8.2} c={1.5} />
                <ScoreRow dim="09 · Set-Aside-Beyond-Set-Aside" a={9.1} b={8.7} c={0.0} />
                <ScoreRow dim="10 · Cost-of-Failure Asymmetry" a={7.4} b={6.9} c={5.2} />
              </tbody>
              <tfoot className="border-t-2 border-amber/30 bg-amber/5">
                <tr>
                  <td className="px-4 py-3 text-sm font-bold text-accent">Composite (weighted)</td>
                  <td className="text-center px-4 py-3 text-base font-bold text-text">7.8</td>
                  <td className="text-center px-4 py-3 text-base font-bold text-accent">8.1</td>
                  <td className="text-center px-4 py-3 text-base font-bold text-text/60">6.3</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-sm text-muted mt-4 leading-relaxed max-w-3xl">
            Note: the incumbent ranks first on raw past performance but third on composite fit, driven primarily by overcommitment risk, weak geographic surge response, and low set-aside cross-match. Contractor B emerges as a genuine candidate the standard four-axis search would have buried.
          </p>
        </div>
      </section>

      {/* Step 3 — Pause-Resume */}
      <section id="pause" className="py-16 md:py-20 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="03" title="Pause · Ask · Refine · Resume" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            Mid-analysis, the CO pauses to ask the EADIE assistant a question. The assistant is bound to the current workspace state — the loaded methodology, the ingested candidate set, the scoring so far. Every exchange is logged and tagged.
          </p>

          <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-6 md:p-8 space-y-5">
            <Bubble who="CO · Sarah Miller" tone="user">
              I&apos;m considering Contractor B but their past performance count worries me. What&apos;s the strongest counter-argument to awarding to them, and how would I defend against it in a protest?
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">The strongest counter-argument is past performance volume. Contractor B has 2 prior federal awards versus the incumbent&apos;s 14 in this category. Three defensible responses, grounded in the audit trail:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li><strong className="text-accent">Adjacent-Capability Match score (7.4/10):</strong> Their 2 prior awards were at VA Eastern Colorado HCS with above-mean CPARS (4.3, 4.1). Smaller volume, comparable institutional environment.</li>
                <li><strong className="text-accent">Modern-Methodology Premium (9.4/10):</strong> Documented AI-driven cleaning route optimization and digital quality assurance, both flagged in their capability statement and confirmed via two industry citations. Standard process misses this entirely.</li>
                <li><strong className="text-accent">Cost-of-Failure Asymmetry (6.9/10):</strong> If they underperform, the requirement is re-competable within 8 weeks at lower absolute exposure than the incumbent&apos;s typical mod-cost pattern would produce.</li>
              </ol>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs">
                <span className="px-2 py-1 rounded bg-accent/15 text-accent font-semibold uppercase tracking-wider">Logged · Observational</span>
                <span className="text-muted">Citation chips: 7 sources referenced</span>
              </div>
            </Bubble>
            <Bubble who="CO · Sarah Miller" tone="user">
              Good. Let&apos;s also tighten the Subcontractor Network Quality weight. Push it from 7% to 11% for this acquisition.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Applied. Re-scoring now. The shift slightly raises Contractor A (8.0 → 8.1) and slightly lowers the incumbent (6.3 → 6.1). Contractor B unchanged.</p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 font-semibold uppercase tracking-wider">Logged · Applied</span>
                <span className="text-muted">Methodology delta recorded · Re-score in 1.2s</span>
              </div>
            </Bubble>
          </div>
          <p className="text-sm text-muted mt-6 leading-relaxed max-w-3xl">
            Every exchange — applied or observational — enters the audit trail. The CO can pause, ask, refine as often as they need. Sessions persist across days. A junior CO can pick up the workspace with full reasoning context intact.
          </p>
        </div>
      </section>

      {/* Step 4 — Audit-Trail Export */}
      <section id="export" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="04" title="Audit-Trail Export Package" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            When the analysis is complete, EADIE generates the full export package. Every artifact is grounded in source citations, every refinement is logged, every counter-argument is pre-staged.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ExportItem
              title="Sources Sought Memo"
              meta="14 pp · 47 citations"
              body="Market research narrative, contractor pool justification, qualified candidate list with rationale."
            />
            <ExportItem
              title="Decision Matrix"
              meta="3 pp · cell-traceable"
              body="Per-dimension scores and weights, ranked output, every cell linked to underlying source records."
            />
            <ExportItem
              title="Counter-Argument Package"
              meta="6 pp · top 3 candidates"
              body="Strongest argument against each top-ranked contractor, with documented response and audit-trail evidence."
            />
            <ExportItem
              title="CO Justification Statement"
              meta="2 pp · narrative"
              body="Plain-language reasoning chain explaining the methodology applied and the basis for the award recommendation."
            />
            <ExportItem
              title="Reasoning Trail"
              meta="4 pp · summarized"
              body="Summarized conversational history captured during the analysis. Full transcript available under the CO's disclosure setting."
            />
            <ExportItem
              title="Protest-Defense Brief"
              meta="9 pp · pre-staged"
              body="Pre-addressed response to the three most statistically likely protest grounds for this acquisition type and award decision."
            />
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="py-20 md:py-24 bg-surface/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            That&apos;s the full EADIE workflow.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Setup. Ten-dimension analysis. Pause-resume refinement with a context-bound AI assistant. Audit-trail export. The complete decision package in less time than the standard process takes to produce a market research memo.
          </p>
          <p className="text-base text-muted mb-10 max-w-2xl mx-auto">
            For a live federal briefing, pilot conversation, or deeper architectural walkthrough, reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/#contact" className="px-7 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-bold hover:opacity-90 transition-opacity">
              Request a federal briefing
            </Link>
            <a href="mailto:jwoodson@encoresvcsllc.com" className="text-sm text-muted hover:text-accent transition-colors">
              jwoodson@encoresvcsllc.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink/60">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="text-xs text-amber font-semibold uppercase tracking-wider mb-2">
            Confidential · For Recipient Eyes Only · Encore Services LLC
          </div>
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} Encore Services, LLC. All rights reserved. U.S. Provisional Patent Application Filed.
          </div>
        </div>
      </footer>
    </main>
  );
}

function DemoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">{label}</div>
      <div className="text-text font-semibold">{value}</div>
    </div>
  );
}

function StepHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="text-2xl md:text-3xl font-bold text-accent">{num}</div>
      <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"></div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function Panel({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "accent" | "muted";
  children: React.ReactNode;
}) {
  const border = tone === "accent" ? "border-amber/30" : "border-white/10";
  return (
    <div className={`rounded-2xl border ${border} bg-white/[0.04] backdrop-blur-sm p-6`}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-4 font-bold">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-muted">{k}</span>
      <span className="text-text font-medium text-right">{v}</span>
    </div>
  );
}

function ScoreRow({
  dim,
  a,
  b,
  c,
  highlight,
}: {
  dim: string;
  a: number;
  b: number;
  c: number;
  highlight?: "A" | "B" | "C-risk";
}) {
  const cellClass = (col: "A" | "B" | "C-risk") => {
    if (highlight === "C-risk" && col === "C-risk")
      return "text-red-300 font-bold bg-red-500/10";
    if (highlight === col) return "text-amber-300 font-bold bg-amber/10";
    return "text-text";
  };
  return (
    <tr className="hover:bg-white/[0.02]">
      <td className="px-4 py-3 text-sm text-light/90">{dim}</td>
      <td className={`text-center px-4 py-3 text-sm ${cellClass("A")}`}>{a.toFixed(1)}</td>
      <td className={`text-center px-4 py-3 text-sm ${cellClass("B")}`}>{b.toFixed(1)}</td>
      <td className={`text-center px-4 py-3 text-sm ${cellClass("C-risk")}`}>{c.toFixed(1)}</td>
    </tr>
  );
}

function Bubble({
  who,
  tone,
  children,
}: {
  who: string;
  tone: "user" | "ai";
  children: React.ReactNode;
}) {
  const isAI = tone === "ai";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[88%] ${isAI ? "" : ""}`}>
        <div className={`text-[10px] uppercase tracking-[0.18em] mb-2 ${isAI ? "text-accent" : "text-muted text-right"}`}>{who}</div>
        <div
          className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
            isAI
              ? "bg-gradient-to-br from-amber/10 to-amber/5 border border-amber/30 text-text"
              : "bg-white/[0.05] border border-white/10 text-light"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ExportItem({
  title,
  meta,
  body,
}: {
  title: string;
  meta: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-accent/30 transition-all">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="text-base font-bold text-accent">{title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted whitespace-nowrap">{meta}</span>
      </div>
      <p className="text-sm text-light leading-relaxed">{body}</p>
    </article>
  );
}
