import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkspaceClient } from "@/components/WorkspaceClient";

interface ScenarioFull {
  key: string;
  title: string;
  agency: string;
  office?: string;
  place_of_performance?: string;
  ceiling_usd: number;
  contract_type?: string;
  naics?: string;
  size_standard?: string;
  set_aside?: string;
  solicitation?: {
    scope_summary?: string;
    key_far_clauses?: string[];
    required_certifications?: string[];
    evaluation_factors?: string[];
  };
  documents?: Array<{
    id: string;
    filename: string;
    description: string;
    size_bytes: number;
    parsed_sections: number;
    entities_extracted: number;
    key_excerpts?: Array<{ section: string; page: number; text: string }>;
  }>;
  candidates?: Array<{
    id: string;
    name: string;
    type: string;
    cage: string;
    size: string;
    hq: string;
    workforce_size: number;
  }>;
}

async function fetchScenario(key: string): Promise<ScenarioFull | null> {
  const apiUrl = process.env.EADIE_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/scenarios/${encodeURIComponent(key)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return (await res.json()) as ScenarioFull;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function ScenarioWorkspacePage({
  params,
}: {
  params: Promise<{ scenarioKey: string }>;
}) {
  const { scenarioKey } = await params;
  const scenario = await fetchScenario(scenarioKey);

  if (!scenario) {
    notFound();
  }

  return (
    <main className="relative min-h-screen text-text z-10">
      {/* Sandbox header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/80 border-b border-amber/30">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/sandbox" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
              <span className="text-[10px] text-accent leading-none mt-0.5 uppercase tracking-widest">
                Sandbox · Workspace
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/sandbox" className="text-muted hover:text-text transition-colors">
              ← All scenarios
            </Link>
          </div>
        </nav>
      </header>

      {/* Sandbox banner */}
      <div className="bg-amber/10 border-b border-amber/30 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap text-xs">
          <span className="text-amber font-semibold uppercase tracking-wider">
            Sandbox · Live · Pre-Decisional · For Demonstration Only
          </span>
          <span className="text-muted">U.S. Provisional Patent Application Filed</span>
        </div>
      </div>

      <WorkspaceClient scenario={scenario} />
    </main>
  );
}
