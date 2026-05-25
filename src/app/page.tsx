import { Reveal } from "@/components/Reveal";
import { DemoRequestForm } from "@/components/DemoRequestForm";

export default function Home() {
  return (
    <main className="relative min-h-screen text-text">
      {/* Top Bar — header reads "Encore · EADIE" */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/70 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
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
            An Encore Services product
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

      {/* Credibility strip */}
      <section className="border-y border-accent/20 bg-gradient-to-r from-surface/40 via-surface2/40 to-surface/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
          <div className="grid md:grid-cols-4 gap-6 md:gap-10 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">Weeks → Hours</div>
              <div className="text-sm text-muted">Senior-CO depth at a CO-team pace</div>
            </div>
            <div className="md:border-l md:border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">10 Dimensions</div>
              <div className="text-sm text-muted">Beyond the standard four-axis match</div>
            </div>
            <div className="md:border-l md:border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">4 Methodology Scopes</div>
              <div className="text-sm text-muted">Personal, Team, Agency, Federation</div>
            </div>
            <div className="md:border-l md:border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">Protest-Defensible</div>
              <div className="text-sm text-muted">Auditable reasoning chain on every decision</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="platform" className="py-20 md:py-28">
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
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">A 10-Dimension Framework</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The evaluation framework, end to end.
            </h2>
            <p className="text-light max-w-3xl mx-auto">
              EADIE evaluates contractors across ten distinct dimensions. A representative sample is shown below. The full framework, scoring methodology, and integration architecture are covered under NDA in a federal briefing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <DimensionCard num={d.num} title={d.title} body={d.body} />
              </Reveal>
            ))}
            <Reveal delay={dimensions.length * 60}>
              <LockedCard count={10 - dimensions.length} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Methodology Library teaser */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">Methodology Library</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Methodologies that travel with you, your team, and your agency.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-6 max-w-4xl">
            A methodology in EADIE is more than a weighted set of dimensions. It bundles the procedures a senior CO has refined over a career, the AI prompt templates they have built, the sources they trust, and the disclosure controls they require. Methodologies are versionable, shareable, and improve over time as observed acquisition outcomes feed back into calibration.
          </p>
          <p className="text-base text-muted leading-relaxed mb-10 max-w-4xl">
            EADIE also ingests your accumulated institutional knowledge: prior sources sought responses, capability statements obtained outside of structured database channels, predecessor CO market research memoranda. The AI assistant grounds its reasoning in your library alongside public source data.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ScopeBadge label="Personal" body="Yours alone" />
            <ScopeBadge label="Team" body="Shared within a contracting office" />
            <ScopeBadge label="Agency" body="Published as agency standard" />
            <ScopeBadge label="Federation" body="Cross-agency, opt-in" />
          </div>
        </div>
      </section>

      {/* Pause-Resume Workflow */}
      <section id="workflow" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">The Workflow</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Pause anywhere. Ask anything. Resume with refinements applied.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-12 max-w-4xl">
            Senior contracting officers do not work in a straight line. They run, stop, think, refine, run again. EADIE is built around that reality. An AI assistant travels with your analysis, lets you pause to ask questions, refine inputs, and resume, with everything captured for protest review.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0}>
              <WorkflowStep num="01" title="Pause" body="At any moment in any step, ask the AI assistant. The analysis holds in place while you think." />
            </Reveal>
            <Reveal delay={120}>
              <WorkflowStep num="02" title="Refine" body="Adjust weights, sources, or assumptions based on the conversation. Every exchange enters the audit trail." />
            </Reveal>
            <Reveal delay={240}>
              <WorkflowStep num="03" title="Resume" body="Continue with refinements incorporated. Close the session and pick up later with full context preserved." />
            </Reveal>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-accent mb-4">Built for the way senior COs actually work</h3>
            <p className="text-light leading-relaxed mb-3">
              EADIE supports parallel analysis paths, handoff between contracting officers, and methodology sharing across a contracting office. The deeper architecture is covered under NDA in a federal briefing.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Every pause, every refinement, every conversational exchange is captured in a configurable audit trail.
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
            <AuditItem title="Protest-Defense Brief" body="Pre-staged response to the most statistically likely protest grounds for the acquisition type and award decision." />
            <LockedAuditItem />
          </div>
        </div>
      </section>

      {/* About / Encore Parent */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">An Encore Services Product</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Built by federal-acquisition operators, for federal-acquisition operators.
          </h2>
          <p className="text-lg text-light leading-relaxed mb-6 max-w-4xl">
            EADIE is a product of Encore Services, LLC, a Service-Disabled Veteran-Owned Small Business and AI technology solutions provider for federal agencies. Headquartered in Maryland, Encore designs, builds, and deploys production-grade AI platforms, software, cybersecurity, and accessibility-compliant systems for federal missions.
          </p>
          <p className="text-base text-muted leading-relaxed mb-10 max-w-4xl">
            EADIE extends Encore&apos;s federal procurement product portfolio alongside additional AI-driven mission systems.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureBlock title="Federal-first by design" body="EADIE is built for the Federal Acquisition Regulation, agency supplements, GAO protest precedent, and the realities of how contracting offices operate. Not a civilian tool retrofitted for government." />
            <FeatureBlock title="Ingests your institutional knowledge" body="Prior sources sought responses, capability statements, predecessor CO market research memoranda. The accumulated knowledge of a 20-year CO finally becomes part of the workspace the AI can reason against." />
            <FeatureBlock title="Gated premium tier" body="Available as a stand-alone application and as a gated add-on to existing federal procurement platforms. Per-user, team, or office-wide entitlement." />
            <FeatureBlock title="Compound learning across acquisitions" body="Methodologies improve over time based on observed outcomes. Anonymized workspace data tightens dimension scoring and refines default methodology profiles." />
          </div>
          <div className="mt-6">
            <FeatureBlock title="U.S. Provisional Patent Application Filed" body="EADIE&apos;s multi-dimensional evaluation framework, methodology-as-object architecture, stateful workflow with persistent context-bound AI assistant, audit-trail-grounded refinement chat, multi-modal document ingestion, and saved-procedure/saved-prompt extensions are subject to a pending U.S. provisional patent application." />
          </div>
        </div>
      </section>

      {/* Contact — demo request form + Dr. Woodson card side by side */}
      <section id="contact" className="py-20 md:py-28 bg-surface/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">Request a Briefing</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Available for federal briefings and pilots.
            </h2>
            <p className="text-light max-w-2xl mx-auto">
              Submit a briefing request and Encore Services will respond directly within one business day to schedule a time.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Demo Request Form */}
            <div className="lg:col-span-3">
              <DemoRequestForm />
            </div>

            {/* Dr. Jeff Woodson Card */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="rounded-2xl border border-accent/30 bg-white/[0.04] backdrop-blur-md p-8 shadow-2xl">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-3">Principal Contact</div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">Dr. Jeff Woodson</h3>
                  <div className="text-xs uppercase tracking-widest mb-6 text-accent">
                    President &amp; CEO · Encore Services, LLC
                  </div>

                  <div className="space-y-5 text-sm">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">Address</div>
                      <address className="not-italic text-text leading-relaxed">
                        9500 Medical Center Dr. Suite 300<br />
                        Largo, MD 20774
                      </address>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">Business</div>
                      <a href="tel:+12024608668" className="text-text hover:text-accent transition-colors text-sm font-semibold">
                        (202) 460-8668
                      </a>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">Mobile</div>
                      <a href="tel:+13016753001" className="text-text hover:text-accent transition-colors text-sm font-semibold">
                        (301) 675-3001
                      </a>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">Email</div>
                      <a href="mailto:jwoodson@encoresvcsllc.com" className="text-text hover:text-accent transition-colors break-all text-sm">
                        jwoodson@encoresvcsllc.com
                      </a>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">Parent Company</div>
                      <a href="https://encoresvcsllc.com" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors text-sm">
                        encoresvcsllc.com →
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 text-xs text-muted text-center">
                    EADIE is a product of Encore Services, LLC.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="text-sm text-muted mb-2">
            EADIE — Encore Acquisition Decision Intelligence Engine, a product of <a href="https://encoresvcsllc.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Encore Services, LLC</a>.
          </div>
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} Encore Services, LLC. All rights reserved. U.S. Provisional Patent Application Filed.
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
  { num: "02", title: "Specialized-Domain Depth", body: "Industry codes are coarse. Surface the contractors who have actually worked the specific system, regulation, or agency the requirement touches." },
  { num: "03", title: "Geographic and Cultural Fit", body: "For requirements that benefit from local presence, weight contractors by surge-response capability, regional labor pool, and historical work in the region." },
  { num: "04", title: "Innovation Trajectory", body: "Direction matters. Trailing trend across R&D investment, technical hiring, patents, SBIR pipeline, and publication activity." },
  { num: "05", title: "Cost-of-Failure Asymmetry", body: "Quantify the asymmetric expected cost of contractor failure per archetype. Frame the risk-of-award decision honestly." },
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

function LockedCard({ count }: { count: number }) {
  return (
    <article className="h-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] backdrop-blur-sm p-7 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300">
      <div className="mb-4 w-12 h-12 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div className="text-xs font-bold tracking-widest text-accent mb-2">+{count} MORE DIMENSIONS</div>
      <p className="text-sm text-muted leading-relaxed">
        The remaining dimensions, scoring methodology, and integration architecture are covered under NDA in a federal briefing.
      </p>
      <a href="#contact" className="mt-4 text-xs text-accent hover:underline uppercase tracking-wider font-semibold">
        Request briefing →
      </a>
    </article>
  );
}

function LockedAuditItem() {
  return (
    <article className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h3 className="text-base font-bold text-accent">Additional audit components</h3>
      </div>
      <p className="text-sm text-muted leading-relaxed">
        Counter-argument synthesis, CO justification statement, configurable reasoning trail, and related components are covered under NDA.
      </p>
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

function ScopeBadge({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-xl border border-amber/30 bg-amber/5 p-5 text-center hover:bg-amber/10 hover:border-amber/50 transition-all">
      <div className="text-base font-bold text-accent mb-1">{label}</div>
      <div className="text-xs text-light leading-relaxed">{body}</div>
    </div>
  );
}
