import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main className="relative min-h-screen text-text">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/70 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-bold text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight leading-none">EADIE</span>
              <span className="text-[10px] text-muted leading-none mt-0.5 uppercase tracking-widest">Decision Intelligence</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#platform" className="text-muted hover:text-text transition-colors">Platform</a>
            <a href="#dimensions" className="text-muted hover:text-text transition-colors">Dimensions</a>
            <a href="#workflow" className="text-muted hover:text-text transition-colors">Workflow</a>
            <a href="#audit" className="text-muted hover:text-text transition-colors">Audit Trail</a>
            <a href="#contact" className="px-4 py-1.5 rounded border border-accent/40 text-accent hover:bg-accent/10 transition-colors">Request Briefing</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-8">
            Encore Services LLC
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            The decision intelligence engine senior contracting officers wish they had time to build themselves.
          </h1>
          <p className="text-lg md:text-xl text-light max-w-3xl mx-auto leading-relaxed mb-10">
            EADIE encodes the deeper market research and sources sought methodology senior COs already perform by hand, scales it with a pause-resume AI assistant that stays bound to your workspace, and produces audit trails that withstand protest review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="px-7 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-semibold hover:opacity-90 transition-opacity">
              Request a federal briefing
            </a>
            <a href="#workflow" className="text-sm text-muted hover:text-text transition-colors">
              See how the workflow works →
            </a>
          </div>
        </div>
      </section>

      {/* The credibility strip */}
      <section className="border-y border-accent/20 bg-gradient-to-r from-surface/40 via-surface2/40 to-surface/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Weeks → Hours</div>
              <div className="text-sm text-muted">Senior-CO depth at a CO-team pace</div>
            </div>
            <div className="md:border-x md:border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">10 Dimensions</div>
              <div className="text-sm text-muted">Beyond the standard four-axis match</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Protest-Defensible</div>
              <div className="text-sm text-muted">Auditable reasoning chain on every decision</div>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            The standard four-axis match is missing most of how senior COs actually think.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-6 max-w-4xl">
            Federal contractor search today operates on four axes: industry code, business size, past performance, price. That framework rewards what the giants are built to win on. It misses adjacent-capable smaller firms, modern-methodology innovators, and specialists who know the specific system the requirement touches.
          </p>
          <p className="text-lg text-light leading-relaxed mb-6 max-w-4xl">
            Senior contracting officers already perform a deeper, multi-dimensional analysis by hand. It takes weeks per acquisition. Most COs do not have the time. The few who do cannot easily share their methodology with teammates or successors, cannot consistently document it for protest defense, and cannot calibrate it across acquisitions.
          </p>
          <p className="text-base text-muted leading-relaxed max-w-4xl">
            EADIE codifies that methodology, scales it, and produces the documentation that survives review.
          </p>
        </div>
      </section>

      {/* Ten Dimensions */}
      <section id="dimensions" className="py-20 md:py-28 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">The Ten Dimensions</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The evaluation framework, end to end.
            </h2>
            <p className="text-light max-w-3xl mx-auto">
              Each dimension is independently scorable, weightable, explainable, and accessible to the AI assistant as a conversational surface during the workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <DimensionCard num={d.num} title={d.title} body={d.body} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Pause-Resume Workflow (the holy-wtf moment) */}
      <section id="workflow" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">The Workflow</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Pause anywhere. Ask anything. Resume with refinements applied.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-12 max-w-4xl">
            Senior contracting officers do not run wizards end to end and then refine. They run, stop, think, refine, run, stop, think, refine, dozens of times per acquisition. EADIE is built around that reality. A persistent AI assistant travels with you across every step, bound to your active workspace, grounded only in your loaded methodology, your ingested data, and your prior decisions.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0}>
              <WorkflowStep num="01" title="Pause" body="At any moment, in any step, you ask. The workspace state freezes in place. The AI assistant is already loaded with everything you have configured, ingested, and scored." />
            </Reveal>
            <Reveal delay={120}>
              <WorkflowStep num="02" title="Refine" body="Suggested adjustments to weights, sources, dealbreakers, or dimensions are tagged as applied (workspace state updates and re-scores) or observational (logged but no change). Every exchange enters the audit trail." />
            </Reveal>
            <Reveal delay={240}>
              <WorkflowStep num="03" title="Resume" body="Continue the analysis with refinements incorporated. Session-spanning persistence lets you close and resume days later, or hand the workspace to a teammate with full reasoning context intact." />
            </Reveal>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-accent mb-4">Workspace forking and collaboration, built in</h3>
            <p className="text-light leading-relaxed mb-3">
              Run a what-if analysis in parallel without losing the original. Hand a workspace to a junior CO with the full reasoning chain preserved. Promote a methodology from personal to team to agency to federation level. Methodology knowledge transfers as a side effect of normal use.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Every refinement, every pause, every conversational exchange is captured in a configurable audit trail with disclosure controls the contracting officer sets per methodology.
            </p>
          </div>
        </div>
      </section>

      {/* Audit Trail */}
      <section id="audit" className="py-20 md:py-28 bg-surface/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">Protest Defense</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            An auditable reasoning chain on every decision.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-10 max-w-4xl">
            Federal acquisition protests are won and lost on documentation. EADIE produces a decision package that captures not just the result, but the full reasoning chain that produced it. Counter-arguments pre-staged. Protest grounds pre-addressed. Disclosure of conversational reasoning configurable per methodology.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <AuditItem title="Sources Sought Memo" body="The market research document, grounded in the analysis with full citation trail." />
            <AuditItem title="Decision Matrix" body="Per-dimension scores, weights, and resulting ranking, with every cell traceable to a source." />
            <AuditItem title="Counter-Argument Package" body="For each top-ranked contractor, the strongest argument against, with documented response." />
            <AuditItem title="CO Justification Statement" body="Narrative explaining the methodology applied and why it produces a defensible award basis." />
            <AuditItem title="Reasoning Trail" body="Summarized assistant exchange history by default. Full transcripts available on request. CO controls per methodology." />
            <AuditItem title="Protest-Defense Brief" body="Pre-staged response to the three most likely protest grounds for the acquisition type and award decision." />
          </div>
        </div>
      </section>

      {/* Why EADIE / Why Encore */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Built by federal-acquisition operators, for federal-acquisition operators.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureBlock
              title="Federal-first by design"
              body="EADIE is built for the Federal Acquisition Regulation, agency supplements, GAO protest precedent, and the realities of how contracting offices operate. Not a civilian tool retrofitted for government."
            />
            <FeatureBlock
              title="Gated premium tier"
              body="Available as a stand-alone application and as a gated add-on to existing federal procurement platforms. Per-user, team, or office-wide entitlement. Senior CO depth without disrupting your standard workflow."
            />
            <FeatureBlock
              title="Compound learning across acquisitions"
              body="Methodologies improve over time based on observed outcomes. Anonymized workspace data tightens dimension scoring and refines default methodology profiles. Every acquisition makes the next one sharper."
            />
            <FeatureBlock
              title="U.S. Provisional Patent Application Filed"
              body="EADIE's multi-dimensional evaluation framework, methodology-as-object architecture, stateful workflow with persistent context-bound AI assistant, and audit-trail-grounded refinement chat are subject to a pending U.S. provisional patent application."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 bg-surface/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Available for federal briefings and pilots.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-10 max-w-2xl mx-auto">
            We are actively engaging contracting offices, agency procurement leadership, and federal acquisition modernization teams. For a briefing, demo, or pilot inquiry, reach out directly.
          </p>
          <a
            href="mailto:info@webdesignpros365.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-semibold hover:opacity-90 transition-opacity"
          >
            info@webdesignpros365.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="text-sm text-muted mb-2">
            EADIE — Encore Acquisition Decision Intelligence Engine, a product of Encore Services LLC.
          </div>
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} Encore Services LLC. All rights reserved. U.S. Provisional Patent Application Filed.
          </div>
          <div className="text-xs text-muted mt-4 flex items-center justify-center gap-4">
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="/disclosures" className="hover:text-accent transition-colors">Disclosures</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const dimensions = [
  { num: "01", title: "Adjacent-Capability Match", body: "Surface contractors who have done something harder than the requirement, on a comparable axis, even when the literal industry-code match misses them." },
  { num: "02", title: "Modern-Methodology Premium", body: "Score the methodology-modernity of each contractor against the requirement's methodology-sensitivity. Reward modern delivery where it produces better outcomes." },
  { num: "03", title: "Incumbent-Overcommitment Risk", body: "Quantify the realistic risk of degraded delivery when a giant incumbent's current obligation pipeline exceeds their estimated capacity." },
  { num: "04", title: "Specialized-Domain Depth", body: "Industry codes are coarse. Surface the contractors who have actually worked the specific system, regulation, or agency the requirement touches." },
  { num: "05", title: "Geographic and Cultural Fit", body: "For requirements that benefit from local presence, weight contractors by surge-response capability, regional labor pool, and historical work in the region." },
  { num: "06", title: "Innovation Trajectory", body: "Direction matters. Trailing trend across R&D investment, technical hiring, patents, SBIR pipeline, and publication activity." },
  { num: "07", title: "Subcontractor Network Quality", body: "Evaluate the prime plus the planned or historical sub stack as a network. Flag where a weak prime has a strong network and vice versa." },
  { num: "08", title: "Counter-Concentration Value", body: "Where category concentration exceeds policy-defined thresholds, surface qualified alternatives outside the top-N incumbents." },
  { num: "09", title: "Set-Aside-Beyond-Set-Aside", body: "Treat set-aside status as one dimension among many. Surface contractors who match across multiple beneficial dimensions simultaneously." },
  { num: "10", title: "Cost-of-Failure Asymmetry", body: "Quantify the asymmetric expected cost of contractor failure per archetype. Frame the risk-of-award decision honestly." },
];

function DimensionCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 hover:bg-white/[0.08] hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
      <div className="text-xs font-bold tracking-widest text-accent mb-3">DIMENSION {num}</div>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-sm text-light leading-relaxed">{body}</p>
    </article>
  );
}

function WorkflowStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <article className="h-full rounded-2xl border border-accent/20 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-7 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl font-bold text-accent mb-3">{num}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-light leading-relaxed">{body}</p>
    </article>
  );
}

function AuditItem({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
      <h3 className="text-base font-bold text-accent mb-2">{title}</h3>
      <p className="text-sm text-light leading-relaxed">{body}</p>
    </article>
  );
}

function FeatureBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7">
      <h3 className="text-lg font-bold text-accent mb-3">{title}</h3>
      <p className="text-sm text-light leading-relaxed">{body}</p>
    </article>
  );
}
