import Link from "next/link";
import { SandboxConnectionCheck } from "@/components/SandboxConnectionCheck";

interface Scenario {
  key: string;
  title: string;
  agency: string;
  ceiling_usd: number;
  set_aside: string | null;
}

async function fetchScenarios(): Promise<Scenario[]> {
  const apiUrl = process.env.EADIE_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/scenarios`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.scenarios || [];
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function SandboxPage() {
  const scenarios = await fetchScenarios();

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
              <span className="text-[10px] text-accent leading-none mt-0.5 uppercase tracking-widest">
                Sandbox · Live
              </span>
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
            Encore Services, LLC · U.S. Provisional Patent Application Filed
          </span>
        </div>
      </div>

      {/* Hero + engine status */}
      <section className="pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
            EADIE Sandbox · Phase 1
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
            Choose an acquisition.
            <span className="block text-accent">Run the analysis.</span>
          </h1>
          <p className="text-lg text-light max-w-3xl leading-relaxed mb-8">
            Each scenario below is a real-shape federal acquisition with pre-ingested
            documents, candidate vendors, and a loaded methodology. Tap a card to load
            the workspace, then run the ten-dimension EADIE analysis with live Acumen-7
            reasoning grounded in cited evidence.
          </p>
          <SandboxConnectionCheck />
        </div>
      </section>

      {/* Scenario picker */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Pre-Seeded Scenarios
            </h2>
            <span className="text-xs text-muted uppercase tracking-wider">
              {scenarios.length} active
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {scenarios.map((s) => (
              <ScenarioCard key={s.key} scenario={s} />
            ))}
          </div>

          {scenarios.length === 0 && (
            <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-300">
              <div className="font-semibold mb-1">⚠ EADIE engine not reachable</div>
              <div className="text-xs text-red-300/80">
                Scenarios could not be loaded from the Acumen-7 backend. The static
                walkthrough at <Link href="/demo" className="text-accent hover:underline">/demo</Link> is still available.
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link
      href={`/sandbox/${scenario.key}`}
      className="group block rounded-2xl border border-accent/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-6 hover:border-accent/60 hover:from-white/[0.10] hover:-translate-y-1 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase border border-accent/40 text-accent bg-accent/5">
          ▶ Live
        </span>
        {scenario.set_aside && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-amber/80">
            {scenario.set_aside}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold leading-tight tracking-tight mb-3 group-hover:text-accent transition-colors">
        {scenario.title}
      </h3>
      <div className="space-y-1.5 text-sm text-muted">
        <div>
          <span className="text-light/60">Agency:</span>{" "}
          <span className="text-light">{scenario.agency}</span>
        </div>
        <div>
          <span className="text-light/60">Ceiling:</span>{" "}
          <span className="text-light font-mono">
            ${scenario.ceiling_usd.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-accent/80 font-semibold">
          Open workspace
        </span>
        <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}


