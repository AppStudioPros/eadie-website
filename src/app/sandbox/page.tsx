import Link from "next/link";
import { SandboxConnectionCheck } from "@/components/SandboxConnectionCheck";

export default function SandboxPage() {
  return (
    <main className="relative min-h-screen text-text z-10">
      {/* Sandbox header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/80 border-b border-amber/30">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/sandbox" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
              <span className="text-[10px] text-accent leading-none mt-0.5 uppercase tracking-widest">Sandbox · Live</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/demo" className="text-muted hover:text-text transition-colors hidden sm:inline">
              Walkthrough
            </Link>
            <Link href="/" className="text-muted hover:text-text transition-colors">
              ← Public site
            </Link>
          </div>
        </nav>
      </header>

      {/* Sandbox banner */}
      <div className="bg-amber/10 border-b border-amber/30 py-2">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap text-xs">
          <span className="text-amber font-semibold uppercase tracking-wider">
            Sandbox · Live Working Demonstration · Pre-Decisional
          </span>
          <span className="text-muted">
            Encore Services, LLC · Pending U.S. Provisional Patent Application
          </span>
        </div>
      </div>

      {/* Hero / current state */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
            EADIE Sandbox · Phase 1 · Foundation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Live working sandbox.
          </h1>
          <p className="text-lg md:text-xl text-light max-w-3xl leading-relaxed mb-10">
            This is the real-software companion to the EADIE walkthrough. Pre-seeded acquisition
            scenarios, real document parsing, real Acumen-7 analysis, real audit-trail export.
            Build in progress.
          </p>

          {/* Connection check, verifies the Python API is reachable end-to-end */}
          <SandboxConnectionCheck />

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
              What&rsquo;s coming
            </div>
            <ul className="space-y-2 text-sm text-light leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber flex-shrink-0"></span>
                Three pre-seeded acquisition scenarios (VAMC Janitorial, VBA IT Help Desk, OSDBU Outreach)
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber flex-shrink-0"></span>
                Live document ingestion with drag-drop PDF parsing
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber flex-shrink-0"></span>
                Real-time multi-dimension scoring across five live AI dimensions
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber flex-shrink-0"></span>
                Context-bound Acumen-7 chat panel, grounded in workspace state
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber flex-shrink-0"></span>
                Audit-trail-defensible decision package PDF export
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
