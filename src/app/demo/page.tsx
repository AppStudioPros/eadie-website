import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="relative min-h-screen text-text z-10">
      {/* Demo header */}
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
            <a href="#ingest" className="text-muted hover:text-text transition-colors">Ingestion</a>
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
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
            EADIE Walkthrough · Sample VAMC Acquisition
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            From acquisition setup to defensible decision package, in under an hour.
          </h1>
          <p className="text-lg md:text-xl text-light max-w-3xl leading-relaxed mb-10">
            This walkthrough takes a real-shape VAMC janitorial services acquisition through the EADIE workflow: methodology load, document ingestion, ten-dimension analysis, pause-resume refinement, and audit-trail export. Everything you see is a representative mock of the production experience.
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
            The CO loads their team&apos;s saved methodology for VAMC facility services. A methodology in EADIE is more than a weighted dimension profile — it bundles dealbreakers, source preferences, saved procedure sequences, and saved AI prompt templates the CO has built across prior acquisitions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Panel title="Methodology applied" tone="accent">
              <KV k="Template" v="VAMC Facility Services v3.2 (team-shared)" />
              <KV k="Top weight" v="Specialized-Domain Depth · 22%" />
              <KV k="Next weight" v="Geographic Fit · 18%" />
              <KV k="Dealbreaker" v="Active CPARS rating below 3.0" />
              <KV k="Saved procedure" v="VAMC sources-sought sequence" />
              <KV k="Saved asks" v="4 prompt templates loaded" />
              <KV k="Disclosure" v="Reasoning Trail (summarized) in export" />
            </Panel>
            <Panel title="Candidates ingested from public sources" tone="muted">
              <KV k="SAM.gov matches" v="247 SDVOSB contractors" />
              <KV k="After dealbreaker" v="194 contractors" />
              <KV k="With facility past performance" v="63 contractors" />
              <KV k="Locally-presenced (Denver MSA)" v="41 contractors" />
              <KV k="Initial shortlist (top-quartile)" v="12 contractors" />
            </Panel>
          </div>

          <YellowCallout>
            <strong>Why this matters:</strong> Most senior COs build their methodology in their head over a career and rebuild it from scratch every time they change agencies or hand off an acquisition. EADIE makes methodology a portable, versionable, shareable object — including the procedures and the AI prompt templates the CO has refined. Methodology knowledge transfers as a side effect of normal use.
          </YellowCallout>
        </div>
      </section>

      {/* Step 1.5 — Document Ingestion */}
      <section id="ingest" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="02" title="Drop in your institutional knowledge" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            Before the analysis runs, the CO drags in three documents from prior VAMC acquisitions — a previous sources sought response, a contractor capability statement that arrived after a different solicitation, and a market research memo from a senior CO who recently retired. EADIE ingests, parses, and indexes them into the workspace state in seconds.
          </p>

          {/* Drag-drop visual */}
          <div className="rounded-2xl border-2 border-dashed border-amber/40 bg-gradient-to-b from-amber/5 to-transparent backdrop-blur-sm p-8 md:p-10">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-amber mb-2">Workspace Inbox</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Drag &amp; drop PDFs, Word docs, Excel, scanned images</h3>
                <p className="text-sm text-light leading-relaxed mb-5">
                  Any procurement-adjacent document the CO has in hand. EADIE extracts the content, parses entities, links references to known contractors, and indexes the text into the workspace so the AI assistant can ground its responses in this material alongside SAM, FPDS, and SBIR data.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <IngestFile name="2024-VAMC-Aurora-SS-Response.pdf" size="2.4 MB" parsed="14 sections · 41 entities" />
                  <IngestFile name="CleanForce-Capabilities-2025.docx" size="890 KB" parsed="8 sections · 12 entities" />
                  <IngestFile name="Retired-CO-Market-Memo.pdf" size="1.1 MB" parsed="6 sections · 23 entities" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs">
                  <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 font-semibold uppercase tracking-wider">3 documents indexed · 4.2s</span>
                  <span className="text-muted">Added to workspace · AI assistant grounded</span>
                </div>
              </div>
            </div>
          </div>

          <YellowCallout>
            <strong>Senior CO note:</strong> Most contracting officers have drawers and folders full of paper, capability statements, prior sources-sought responses, and market research from previous acquisitions that effectively sits dead. The accumulated institutional knowledge of a 20-year CO is huge — and almost none of it survives a handoff. EADIE turns that knowledge into part of the workspace the AI assistant can actually reason against.
          </YellowCallout>
        </div>
      </section>

      {/* Step 3 — Ten Dimensions */}
      <section id="dimensions" className="py-16 md:py-20 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="03" title="Ten-Dimension Analysis" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            EADIE scores every shortlisted contractor across all ten evaluation dimensions. Top three candidates shown below. Every score is traceable to source records — click any cell in production to see the underlying evidence. Two drill-downs are expanded inline below the table to show the reasoning chain.
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

          {/* Drill-down 1: Modern-Methodology Premium for Contractor B */}
          <DrillDown title="Drill-down · Contractor B · Modern-Methodology Premium" score="9.4 / 10" highlight>
            <ul className="space-y-2 text-sm text-light leading-relaxed">
              <li>SAM capability statement names &quot;AI-driven cleaning route optimization&quot; (verified against vendor-submitted document, indexed)</li>
              <li>2 industry citations: Pro Builder Q3 2025, Cleaning Industry Today (auto-pulled, both reference Contractor B by name)</li>
              <li>Public technical surface: 3 GitHub repositories demonstrating IoT sensor integration patterns</li>
              <li>Hiring trajectory: 4 of last 8 technical postings are for ML and automation roles</li>
              <li>Cross-reference to ingested capability statement (uploaded 4 minutes ago): independent confirmation of route-optimization platform deployment</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted">
              Methodology-sensitivity for this requirement: <strong className="text-accent">HIGH</strong> (facility services + IoT-compatible) → premium fully applied. Standard four-axis process scores this dimension at 0.0 because it does not exist in the standard framework.
            </div>
          </DrillDown>

          {/* Drill-down 2: Geographic Fit for Contractor A */}
          <DrillDown title="Drill-down · Contractor A · Geographic & Cultural Fit" score="9.6 / 10" highlight>
            <ul className="space-y-2 text-sm text-light leading-relaxed">
              <li>HQ: Denver, CO · 14 W-2 employees within 12-mile radius of VAMC Denver</li>
              <li>Surge-response capability: 2-hour mobilization confirmed across 6 prior incidents (FPDS sub-award data)</li>
              <li>4 of 4 CBOC sites historically serviced from Denver base (zero travel-cost overhead)</li>
              <li>Subcontractor footprint: 3 Denver-area SDVOSBs maintained in network across 5 years</li>
              <li>Regional labor pool fit: hires through Mile High Veterans Workforce program (documented partnership)</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted">
              Requirement geographic-sensitivity for this acquisition: <strong className="text-accent">HIGH</strong> (multi-site facility services, surge-response needed). Incumbent flies engineers in from regional headquarters — geographic-fit score 5.8.
            </div>
          </DrillDown>

          <YellowCallout>
            <strong>The punchline:</strong> The incumbent ranks first on raw past performance but third on composite fit, driven primarily by overcommitment risk, weak geographic surge response, and low set-aside cross-match. Contractor B emerges as a genuine candidate the standard four-axis search would have buried. The CO can now defend a non-incumbent award on documented multi-dimensional reasoning instead of gut.
          </YellowCallout>
        </div>
      </section>

      {/* Step 4 — Pause-Resume */}
      <section id="pause" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="04" title="Pause · Ask · Refine · Resume" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            Mid-analysis the CO pauses to ask the EADIE assistant a series of questions. The assistant is bound to the current workspace state — the loaded methodology, the candidate set, the partial scoring, and now the three ingested documents from Setup. Every exchange is logged and tagged.
          </p>

          <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-6 md:p-8 space-y-5">
            <Bubble who="CO · Sarah Miller" tone="user">
              I&apos;m considering Contractor B but their past performance count worries me. What&apos;s the strongest counter-argument to awarding to them, and how would I defend against it in a protest?
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">The strongest counter-argument is past performance volume. Contractor B has 2 prior federal awards versus the incumbent&apos;s 14 in this category. Three defensible responses, grounded in the workspace state:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li><strong className="text-accent">Adjacent-Capability Match score (7.4/10):</strong> Their 2 prior awards were at VA Eastern Colorado HCS with above-mean CPARS (4.3, 4.1). Smaller volume, comparable institutional environment.</li>
                <li><strong className="text-accent">Modern-Methodology Premium (9.4/10):</strong> AI-driven cleaning route optimization confirmed in their ingested capability statement and two industry citations. Standard process misses this entirely.</li>
                <li><strong className="text-accent">Cost-of-Failure Asymmetry (6.9/10):</strong> If they underperform, re-competable within 8 weeks at lower absolute exposure than the incumbent&apos;s typical mod-cost pattern.</li>
              </ol>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs flex-wrap">
                <span className="px-2 py-1 rounded bg-accent/15 text-accent font-semibold uppercase tracking-wider">Logged · Observational</span>
                <span className="text-muted">Citation chips: 7 sources · 1 from ingested capability statement</span>
              </div>
            </Bubble>

            <Bubble who="CO · Sarah Miller" tone="user">
              Show me Contractor A&apos;s past VA awards, especially anything at a multi-site facility.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Six prior VA awards in the past 8 years. Three are multi-site facility services:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>VAMC Denver Patient Transport (2023, $1.64M, CPARS 4.4) — same campus, 4 CBOCs</li>
                <li>VAMC Cheyenne Janitorial (2021, $890K, CPARS 4.6) — single site, no CBOCs</li>
                <li>Denver VBA Regional Office Custodial (2020, $420K, CPARS 4.2) — three sites in Denver MSA</li>
              </ul>
              <p className="mt-3 text-sm">Multi-site delivery pattern is documented and recent. Most relevant comparable: the Patient Transport award is the closest analog to current requirement complexity.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs">
                <span className="px-2 py-1 rounded bg-accent/15 text-accent font-semibold uppercase tracking-wider">Logged · Observational</span>
                <span className="text-muted">3 FPDS records cited</span>
              </div>
            </Bubble>

            <Bubble who="CO · Sarah Miller" tone="user">
              What if I made local presence (Dimension 5) a dealbreaker at &gt;7.0? Show me how the shortlist changes.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Hypothetical applied to a forked workspace (parent unchanged). Shortlist reduction:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>12 contractors → 7 contractors (5 dropped on local-presence threshold)</li>
                <li>Incumbent drops out (Geographic Fit 5.8, below 7.0 threshold)</li>
                <li>Contractor A and Contractor B both clear (9.6 and 9.2)</li>
                <li>Top 3 reshuffles: Contractor A composite 8.0 → 8.4, Contractor B 8.1 → 8.5</li>
              </ul>
              <p className="mt-3 text-sm">If you commit this change to the active methodology, the incumbent is removed from consideration. Recommend keeping as observational and documenting the reasoning, since &ldquo;local-presence dealbreaker&rdquo; for a Denver-anchored requirement is defensible but could draw a protest on the basis of geographic restriction.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs flex-wrap">
                <span className="px-2 py-1 rounded bg-blue-500/15 text-blue-300 font-semibold uppercase tracking-wider">Forked Workspace</span>
                <span className="text-muted">Parent state unchanged · Diff stored · 1.4s</span>
              </div>
            </Bubble>

            <Bubble who="CO · Sarah Miller" tone="user">
              OK. Apply the saved &quot;protest-defense prep&quot; ask to the top three candidates.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Saved ask applied. For each top-three candidate, generated:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li><strong className="text-accent">Most likely protest ground</strong> (with statistical basis from GAO precedent in similar acquisitions)</li>
                <li><strong className="text-accent">Pre-staged response</strong> grounded in the workspace audit trail</li>
                <li><strong className="text-accent">Evidence package</strong> ready to attach</li>
              </ul>
              <p className="mt-3 text-sm">Output added to the audit trail. Visible in the Protest-Defense Brief in the export step.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs flex-wrap">
                <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 font-semibold uppercase tracking-wider">Saved Ask · Applied</span>
                <span className="text-muted">Asks library v3.2 · &quot;protest-defense prep&quot; · last used 11 days ago</span>
              </div>
            </Bubble>

            <Bubble who="CO · Sarah Miller" tone="user">
              Tighten Subcontractor Network Quality (Dim 7) weight from 7% to 11% for this acquisition.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Applied to the active workspace. Re-scoring now.</p>
              <p className="text-sm">Shift impact: Contractor A 7.8 → 7.9, Contractor B 8.1 (unchanged), Incumbent 6.3 → 6.1. Methodology delta logged as a per-acquisition modification (not promoted to the saved template).</p>
              <div className="mt-2 flex items-center gap-3 text-xs flex-wrap">
                <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 font-semibold uppercase tracking-wider">Logged · Applied</span>
                <span className="text-muted">Methodology delta · Re-score in 1.2s</span>
              </div>
            </Bubble>

            <Bubble who="CO · Sarah Miller" tone="user">
              Lock the methodology and generate the export package.
            </Bubble>
            <Bubble who="EADIE" tone="ai">
              <p className="mb-3">Methodology locked. Generating audit-trail export package now.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Sources Sought Memo · 14 pp · 47 citations</li>
                <li>Decision Matrix · 3 pp · cell-traceable</li>
                <li>Counter-Argument Package · 6 pp · top 3 candidates</li>
                <li>CO Justification Statement · 2 pp</li>
                <li>Reasoning Trail · 4 pp · summarized (per methodology disclosure setting)</li>
                <li>Protest-Defense Brief · 9 pp · pre-staged</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs flex-wrap">
                <span className="px-2 py-1 rounded bg-amber/20 text-amber font-semibold uppercase tracking-wider">Workspace Sealed</span>
                <span className="text-muted">38 pp · 67 sources · Read-only · Audit-trail integrity hash recorded</span>
              </div>
            </Bubble>
          </div>

          <YellowCallout>
            <strong>What you just watched:</strong> A senior CO ran a six-exchange refinement loop in roughly ten minutes. Counter-arguments surfaced. A what-if branched into a forked workspace without losing the primary analysis. A saved ask reused work from 11 days ago. A weight tightened for this acquisition only, without polluting the team template. The export package generated itself. Every action logged. Every claim citation-grounded. That is the rhythm of how senior COs actually work — and EADIE matches it.
          </YellowCallout>
        </div>
      </section>

      {/* Methodology Library teaser */}
      <section className="py-16 md:py-20 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="05" title="Methodology Library" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            Sarah&apos;s methodology lives alongside her team&apos;s, her agency&apos;s, and a growing federation library. Each methodology bundles dimension weights, dealbreakers, source preferences, saved procedures, saved asks, and audit-disclosure settings. Methodologies are versioned, shareable, and improve over time as observed acquisition outcomes feed back into calibration.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <MethodologyCard
              scope="Personal"
              name="VAMC Facility Services v3.2"
              meta="Used in 8 acquisitions · last updated 2 days ago"
              by="Sarah Miller · Denver Contracting Office"
            />
            <MethodologyCard
              scope="Team"
              name="Denver CO Multi-Site Standard v2.1"
              meta="Used in 23 acquisitions · 4 contributors"
              by="Denver Contracting Office (Team)"
            />
            <MethodologyCard
              scope="Agency"
              name="VHA Specialty Care Vendor Eval v1.8"
              meta="Used in 47 acquisitions · agency-published"
              by="Veterans Health Administration"
            />
            <MethodologyCard
              scope="Federation"
              name="Federal IT Modernization Multi-Site v2.4"
              meta="Used in 312 acquisitions · 14 agencies opted in"
              by="Federation · cross-agency"
            />
          </div>
        </div>
      </section>

      {/* Step 6 — Audit-Trail Export with previews */}
      <section id="export" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <StepHeader num="06" title="Audit-Trail Export Package" />
          <p className="text-light leading-relaxed mb-8 max-w-3xl">
            When the analysis is complete, EADIE generates the full export package. Every artifact is grounded in source citations, every refinement is logged, every counter-argument is pre-staged. Three excerpts shown below.
          </p>

          {/* Sample document excerpts */}
          <div className="space-y-6 mb-8">
            <DocPreview
              title="Sources Sought Memo · Excerpt"
              meta="14 pp · 47 citations · production document"
            >
              <p className="mb-3">
                <strong>Subject:</strong> Sources Sought for VAMC Denver Janitorial Services, 5-year FFP, SDVOSB Set-Aside (NAICS 561720)
              </p>
              <p className="mb-3">
                Market research has identified{" "}
                <span className="text-accent font-semibold">12 qualified SDVOSB contractors</span>{" "}
                with demonstrated capability across the multi-site facility-services profile required by this acquisition. Capability assessment incorporated ten distinct evaluation dimensions including specialized VAMC domain depth
                <CitationChip n={14} />
                , geographic and surge-response fit
                <CitationChip n={21} />
                , methodology modernity
                <CitationChip n={9} />
                , and cost-of-failure asymmetry analysis
                <CitationChip n={33} />.
              </p>
              <p className="text-muted text-sm italic">
                [Excerpt ends. Full memo includes contractor-by-contractor capability matrix, comparable-acquisition references from FPDS, and a detailed market analysis section.]
              </p>
            </DocPreview>

            <DocPreview
              title="Decision Matrix · Top 3 Excerpt"
              meta="3 pp · cell-traceable to source records"
            >
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-2 text-muted font-semibold">Candidate</th>
                    <th className="text-center py-2 px-2 text-muted font-semibold">Composite</th>
                    <th className="text-center py-2 px-2 text-muted font-semibold">Strongest dim</th>
                    <th className="text-center py-2 px-2 text-muted font-semibold">Weakest dim</th>
                    <th className="text-center py-2 px-2 text-muted font-semibold">Citations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 px-2 font-semibold text-accent">Contractor B</td>
                    <td className="text-center py-2 px-2 font-bold text-accent">8.1</td>
                    <td className="text-center py-2 px-2">Mod-Method (9.4)</td>
                    <td className="text-center py-2 px-2">Adj-Cap (7.4)</td>
                    <td className="text-center py-2 px-2 text-muted">23</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold">Contractor A</td>
                    <td className="text-center py-2 px-2 font-bold">7.9</td>
                    <td className="text-center py-2 px-2">Geo-Fit (9.6)</td>
                    <td className="text-center py-2 px-2">Innov-Traj (6.5)</td>
                    <td className="text-center py-2 px-2 text-muted">19</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 text-muted">Incumbent (Large)</td>
                    <td className="text-center py-2 px-2 text-muted">6.1</td>
                    <td className="text-center py-2 px-2">Adj-Cap (9.1)</td>
                    <td className="text-center py-2 px-2">Set-Aside (0.0)</td>
                    <td className="text-center py-2 px-2 text-muted">14</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-muted text-xs italic mt-3">
                [Excerpt shows top-3 row collapse. Production matrix shows all 12 shortlisted candidates with full per-dimension drill-down on every cell.]
              </p>
            </DocPreview>

            <DocPreview
              title="Protest-Defense Brief · Top Ground Excerpt"
              meta="9 pp · pre-staged · 3 protest grounds addressed"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-amber mb-2">Protest Ground #1 (statistically most likely)</div>
              <p className="mb-3 font-semibold">
                &ldquo;Award to non-incumbent contractor lacks sufficient past performance basis under FAR 15.305(a)(2).&rdquo;
              </p>
              <div className="text-xs uppercase tracking-[0.18em] text-accent mb-2">Pre-staged Response</div>
              <p className="mb-3">
                Past performance was evaluated across substantively comparable adjacent work (Adjacent-Capability Match dimension, score documented), with Contractor B&apos;s prior VA Eastern Colorado HCS awards at above-mean CPARS providing direct institutional-environment comparability
                <CitationChip n={14} />
                . Evaluation incorporated nine additional dimensions documented in the decision matrix, none of which favor the incumbent on a net basis
                <CitationChip n={33} />.
              </p>
              <p className="text-muted text-xs italic">
                [Excerpt ends. Full brief includes evidence-package references, FAR citations, and GAO precedent analogs for each pre-staged response.]
              </p>
            </DocPreview>
          </div>

          {/* Compact grid of remaining outputs */}
          <div className="grid md:grid-cols-2 gap-4">
            <ExportItem title="Counter-Argument Package" meta="6 pp · top 3 candidates" body="Strongest argument against each top-ranked contractor, with documented response and audit-trail evidence." />
            <ExportItem title="CO Justification Statement" meta="2 pp · narrative" body="Plain-language reasoning chain explaining the methodology applied and the basis for the award recommendation." />
            <ExportItem title="Reasoning Trail" meta="4 pp · summarized" body="Summarized conversational history captured during the analysis. Full transcript available under the CO's disclosure setting." />
            <ExportItem title="Workspace Integrity Hash" meta="cryptographic" body="Audit-trail integrity hash recorded at workspace seal time. Demonstrates the package is unchanged since the CO sealed the analysis." />
          </div>

          <YellowCallout>
            <strong>What a protest reviewer sees:</strong> Not a one-page market research memo. A 38-page evidence-grounded decision package with 67 citations, pre-staged responses to the most likely protest grounds, and a cryptographic integrity hash demonstrating the package is unchanged since the moment the CO sealed it. The standard process produces protest exposure. EADIE produces protest defense.
          </YellowCallout>
        </div>
      </section>

      {/* Outro */}
      <section className="py-20 md:py-24 bg-surface/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            That&apos;s the full EADIE workflow.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Setup with saved methodology. Drag-and-drop institutional knowledge. Ten-dimension analysis. Pause-resume refinement with a context-bound AI assistant. Methodology library with personal, team, agency, and federation scoping. Audit-trail export with pre-staged protest defense.
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
      <div className={`max-w-[88%]`}>
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

// Yellow highlighter callout for senior-CO context
function YellowCallout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-8 rounded-xl border border-yellow-400/40 bg-yellow-400/[0.08] p-5 md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
        </div>
        <div className="text-sm text-yellow-100/95 leading-relaxed">
          {children}
        </div>
      </div>
    </aside>
  );
}

function IngestFile({ name, size, parsed }: { name: string; size: string; parsed: string }) {
  return (
    <div className="rounded-lg bg-white/[0.05] border border-white/10 p-3 text-xs">
      <div className="flex items-center gap-2 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span className="font-mono text-text/90 truncate">{name}</span>
      </div>
      <div className="text-[10px] text-muted ml-6">{size}</div>
      <div className="text-[10px] text-emerald-300/80 ml-6 mt-1">✓ {parsed}</div>
    </div>
  );
}

function DrillDown({
  title,
  score,
  highlight,
  children,
}: {
  title: string;
  score: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const border = highlight ? "border-amber/40" : "border-white/10";
  return (
    <div className={`mt-6 rounded-2xl border ${border} bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm p-6 md:p-7`}>
      <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
        <div className="text-sm font-semibold text-accent">{title}</div>
        <div className="text-2xl font-bold text-accent">{score}</div>
      </div>
      {children}
    </div>
  );
}

function MethodologyCard({
  scope,
  name,
  meta,
  by,
}: {
  scope: "Personal" | "Team" | "Agency" | "Federation";
  name: string;
  meta: string;
  by: string;
}) {
  const scopeColor = {
    Personal: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    Team: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Agency: "bg-amber/15 text-amber border-amber/30",
    Federation: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  }[scope];
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 hover:bg-white/[0.06] transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${scopeColor}`}>{scope}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted flex-shrink-0">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h3 className="text-base font-bold mb-1">{name}</h3>
      <div className="text-xs text-muted mb-1">{meta}</div>
      <div className="text-xs text-muted/80">{by}</div>
    </article>
  );
}

function DocPreview({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
      <div className="px-6 py-3 border-b border-white/10 bg-white/[0.04] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-bold text-accent">{title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted">{meta}</span>
      </div>
      <div className="px-6 py-5 text-sm text-light leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function CitationChip({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-[18px] px-1 mx-0.5 rounded bg-accent/20 text-accent text-[10px] font-bold align-super">
      [{n}]
    </span>
  );
}
