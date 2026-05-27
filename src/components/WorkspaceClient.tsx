"use client";

import { useEffect, useState, useRef } from "react";
import { AcumenChatPanel } from "@/components/AcumenChatPanel";

// ============================================================================
// Types (mirrors the Python service schema)
// ============================================================================

interface KeyExcerpt {
  section: string;
  page: number;
  text: string;
}
interface Document {
  id: string;
  filename: string;
  description: string;
  size_bytes: number;
  parsed_sections: number;
  entities_extracted: number;
  key_excerpts?: KeyExcerpt[];
}
interface Candidate {
  id: string;
  name: string;
  type: string;
  cage: string;
  size: string;
  hq: string;
  workforce_size: number;
}
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
  documents?: Document[];
  candidates?: Candidate[];
}

interface DimensionResult {
  dimension_number: number;
  dimension_name: string;
  candidate_id: string;
  candidate_name: string;
  score: number | null;
  confidence: string;
  reasoning: string;
  citations: Array<{
    source_doc_id: string;
    filename: string;
    section: string;
    page: number;
    excerpt: string;
  }>;
  is_live_ai: boolean;
  raw_features?: Record<string, unknown>;
}

interface DimensionStreamEvent {
  type:
    | "analysis_start"
    | "dimension_start"
    | "dimension_done"
    | "analysis_complete";
  scenario_key?: string;
  scenario_title?: string;
  candidate_count?: number;
  dimension_count?: number;
  dimension_number?: number;
  dimension_name?: string;
  is_live_ai?: boolean;
  is_pending?: boolean;
  results?: DimensionResult[];
  summary?: {
    duration_ms: number;
    live_dimensions: number;
    mocked_dimensions: number;
    pending_dimensions: number;
  };
}

type DimensionState = "idle" | "running" | "done" | "pending";

interface DimensionRowState {
  number: number;
  name: string;
  state: DimensionState;
  isLive: boolean;
  isPending: boolean;
  results: DimensionResult[];
}

// ============================================================================
// Component
// ============================================================================

export function WorkspaceClient({ scenario }: { scenario: ScenarioFull }) {
  const [ingestionStarted, setIngestionStarted] = useState(false);
  const [ingestedCount, setIngestedCount] = useState(0);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<DimensionRowState[]>([]);
  const [expandedDim, setExpandedDim] = useState<number | null>(null);
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [persistenceMode, setPersistenceMode] = useState<string>("loading");
  const cancelRef = useRef<AbortController | null>(null);

  // Create the persistent workspace on first load (audit trail starts here)
  useEffect(() => {
    let cancelled = false;
    const create = async () => {
      try {
        const res = await fetch("/api/sandbox/workspace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario_key: scenario.key }),
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setWorkspaceId(data.workspace_id || null);
        setPersistenceMode(data.persistence || "unknown");
      } catch {
        if (!cancelled) setPersistenceMode("in-memory-only");
      }
    };
    create();
    return () => {
      cancelled = true;
    };
  }, [scenario.key]);

  // Trigger document ingestion animation on mount
  useEffect(() => {
    setIngestionStarted(true);
    const docs = scenario.documents || [];
    let i = 0;
    const tick = () => {
      i++;
      setIngestedCount(i);
      if (i < docs.length) {
        setTimeout(tick, 900);
      }
    };
    if (docs.length > 0) setTimeout(tick, 600);
  }, [scenario.documents]);

  // Set default active candidate
  useEffect(() => {
    if (scenario.candidates && scenario.candidates.length > 0 && !activeCandidateId) {
      setActiveCandidateId(scenario.candidates[0].id);
    }
  }, [scenario.candidates, activeCandidateId]);

  const runAnalysis = async () => {
    if (analysisStarted) return;
    setAnalysisStarted(true);
    setAnalysisError(null);
    setDimensions([]);
    setExpandedDim(null);

    const controller = new AbortController();
    cancelRef.current = controller;

    try {
      const res = await fetch("/api/sandbox/analyze/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_key: scenario.key,
          workspace_id: workspaceId,
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse SSE events from the buffer (split on \n\n)
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const evtBlock of events) {
          const line = evtBlock.trim();
          if (!line.startsWith("data:")) continue;
          try {
            const payload: DimensionStreamEvent = JSON.parse(line.slice(5).trim());
            handleStreamEvent(payload);
          } catch {
            // ignore malformed lines
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Stream failed";
      setAnalysisError(msg);
    } finally {
      cancelRef.current = null;
    }
  };

  const handleStreamEvent = (evt: DimensionStreamEvent) => {
    if (evt.type === "analysis_start") {
      // Initialize all 10 dimension rows
      const init: DimensionRowState[] = [];
      for (let n = 1; n <= 10; n++) {
        init.push({
          number: n,
          name: "",
          state: "idle",
          isLive: false,
          isPending: false,
          results: [],
        });
      }
      setDimensions(init);
    } else if (evt.type === "dimension_start") {
      setDimensions((prev) =>
        prev.map((d) =>
          d.number === evt.dimension_number
            ? {
                ...d,
                name: evt.dimension_name || d.name,
                state: "running",
                isLive: evt.is_live_ai || false,
                isPending: evt.is_pending || false,
              }
            : d
        )
      );
    } else if (evt.type === "dimension_done") {
      setDimensions((prev) =>
        prev.map((d) =>
          d.number === evt.dimension_number
            ? {
                ...d,
                state: d.isPending ? "pending" : "done",
                results: evt.results || [],
              }
            : d
        )
      );
    } else if (evt.type === "analysis_complete") {
      setAnalysisComplete(true);
    }
  };

  const docs = scenario.documents || [];
  const candidates = scenario.candidates || [];
  const activeCandidate = candidates.find((c) => c.id === activeCandidateId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Acquisition header card */}
      <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-7 mb-8">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber mb-2 font-bold">
              Acquisition Workspace
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{scenario.title}</h1>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs">
            <span className="text-light/60">Ceiling</span>
            <span className="font-mono text-accent text-lg font-bold">
              ${scenario.ceiling_usd.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <Cell label="Agency" value={scenario.agency} />
          <Cell label="Office" value={scenario.office} />
          <Cell label="Place of Performance" value={scenario.place_of_performance} />
          <Cell label="Contract Type" value={scenario.contract_type} />
          <Cell label="NAICS" value={scenario.naics} mono />
          <Cell label="Size Standard" value={scenario.size_standard} />
          <Cell label="Set-Aside" value={scenario.set_aside} />
        </div>

        {scenario.solicitation?.scope_summary && (
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-[0.18em] text-amber mb-2 font-bold">
              Scope Summary
            </div>
            <p className="text-sm text-light leading-relaxed">
              {scenario.solicitation.scope_summary}
            </p>
          </div>
        )}
      </div>

      {/* Two-column: ingestion + candidates */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Document ingestion */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber font-bold">
              Ingested Documents
            </div>
            <div className="text-[10px] text-muted">
              {ingestedCount} of {docs.length}
            </div>
          </div>
          <div className="space-y-2">
            {docs.map((doc, i) => {
              const isIngested = i < ingestedCount;
              return (
                <div
                  key={doc.id}
                  className={`rounded-lg border p-3 transition-all ${
                    isIngested
                      ? "border-accent/30 bg-accent/5 opacity-100"
                      : "border-white/10 bg-white/[0.02] opacity-40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 ${isIngested ? "text-accent" : "text-muted/50"}`}>
                      {isIngested ? "✓" : "○"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-mono text-light truncate">{doc.filename}</div>
                      <div className="text-xs text-muted leading-snug mt-0.5">{doc.description}</div>
                      {isIngested && (
                        <div className="text-[10px] text-muted/80 mt-1 font-mono">
                          {doc.parsed_sections} sections · {doc.entities_extracted} entities
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate vendors */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber font-bold">
              Candidate Vendors
            </div>
            <div className="text-[10px] text-muted">{candidates.length} loaded</div>
          </div>
          <div className="space-y-2">
            {candidates.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCandidateId(c.id)}
                className={`w-full text-left rounded-lg border p-3 transition-all ${
                  c.id === activeCandidateId
                    ? "border-accent/50 bg-accent/5"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-light">{c.name}</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber/80">
                    {c.type}
                  </span>
                </div>
                <div className="text-xs text-muted">
                  CAGE {c.cage} · {c.hq} · {c.workforce_size} W-2
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Run Analysis CTA */}
      {!analysisStarted && ingestedCount === docs.length && (
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/10 to-transparent backdrop-blur-sm p-7 mb-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber font-bold mb-2">
            ▸ Next: run the ten-dimension analysis
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
            Score {candidates.length} candidates across all ten EADIE dimensions
          </h2>
          <p className="text-sm text-muted max-w-2xl mx-auto mb-5">
            Acumen-7 reasons over the ingested workspace evidence and produces audit-grade
            scoring with cited document excerpts. Estimated 15-25 seconds.
          </p>
          <button
            onClick={runAnalysis}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent3 text-ink font-bold tracking-wider uppercase text-sm shadow-lg hover:shadow-amber/30 transition-shadow"
          >
            <span>⚡ Run Analysis</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Floating Acumen-7 chat panel - opens automatically when analysis completes */}
      <AcumenChatPanel
        scenarioKey={scenario.key}
        scenarioTitle={scenario.title}
        analysisComplete={analysisComplete}
        workspaceId={workspaceId}
      />

      {/* Persistence status chip (subtle, bottom-left) */}
      {workspaceId && persistenceMode === "enabled" && (
        <div className="fixed bottom-6 left-6 z-30 text-[10px] uppercase tracking-[0.18em] text-muted/80 font-bold pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/5 text-green-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            Audit trail · live
          </span>
        </div>
      )}

      {/* Analysis in progress / complete */}
      {analysisStarted && (
        <div className="mb-8">
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Ten-Dimension Analysis
              {activeCandidate && (
                <span className="text-base font-normal text-muted ml-3">
                  · viewing {activeCandidate.name}
                </span>
              )}
            </h2>
            <div className="text-xs text-muted">
              {analysisComplete ? (
                <span className="text-accent font-bold">▸ Complete</span>
              ) : (
                <span className="text-amber font-bold animate-pulse">▸ Streaming…</span>
              )}
            </div>
          </div>

          {analysisError && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              <div className="font-semibold mb-1">⚠ Analysis interrupted</div>
              <div className="text-xs text-red-300/80">{analysisError}</div>
            </div>
          )}

          <div className="space-y-3">
            {dimensions.map((dim) => (
              <DimensionCard
                key={dim.number}
                dimension={dim}
                activeCandidateId={activeCandidateId}
                expanded={expandedDim === dim.number}
                onToggle={() =>
                  setExpandedDim(expandedDim === dim.number ? null : dim.number)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function Cell({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-light/60 mb-0.5">{label}</div>
      <div className={`text-light ${mono ? "font-mono" : ""}`}>{value || "—"}</div>
    </div>
  );
}

function DimensionCard({
  dimension,
  activeCandidateId,
  expanded,
  onToggle,
}: {
  dimension: DimensionRowState;
  activeCandidateId: string | null;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { number, name, state, isLive, isPending, results } = dimension;
  const activeResult = results.find((r) => r.candidate_id === activeCandidateId);
  const score = activeResult?.score;

  let stateBadge = <span className="text-muted">queued</span>;
  let stateClasses = "border-white/10 bg-white/[0.02]";

  if (state === "running") {
    stateBadge = (
      <span className="text-amber animate-pulse">▸ analyzing…</span>
    );
    stateClasses = "border-amber/30 bg-amber/5";
  } else if (state === "done") {
    stateBadge = (
      <span className="text-accent font-bold">
        {isLive ? "● LIVE" : "○ MOCK"}
      </span>
    );
    stateClasses = "border-accent/30 bg-white/[0.04]";
  } else if (state === "pending") {
    stateBadge = <span className="text-muted">⏸ pending integration</span>;
    stateClasses = "border-white/10 bg-white/[0.02] opacity-60";
  }

  return (
    <div className={`rounded-xl border backdrop-blur-sm transition-all ${stateClasses}`}>
      <button
        onClick={onToggle}
        disabled={state !== "done" || isPending || !activeResult}
        className="w-full text-left p-5 flex items-center gap-4 disabled:cursor-not-allowed"
      >
        <div className="font-mono text-2xl font-bold text-amber/70 w-10 flex-shrink-0">
          {number.toString().padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-light truncate">
            {name || `Dimension ${number}`}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-1">{stateBadge}</div>
        </div>
        {state === "done" && score !== null && score !== undefined && (
          <div className="flex-shrink-0 text-right">
            <div className="font-mono text-2xl font-bold text-accent">
              {score.toFixed(1)}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-muted">
              / 10 · {activeResult?.confidence}
            </div>
          </div>
        )}
        {state === "done" && !isPending && activeResult && (
          <div
            className={`flex-shrink-0 text-accent transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            ▸
          </div>
        )}
      </button>

      {expanded && activeResult && (
        <div className="border-t border-white/10 px-5 py-5 bg-ink/40">
          <div className="text-[10px] uppercase tracking-[0.18em] text-amber font-bold mb-2">
            Acumen-7 Reasoning
          </div>
          <p className="text-sm text-light leading-relaxed whitespace-pre-wrap">
            {activeResult.reasoning}
          </p>

          {activeResult.citations && activeResult.citations.length > 0 && (
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber font-bold mb-2">
                Cited Evidence
              </div>
              <div className="space-y-2">
                {activeResult.citations.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs"
                  >
                    <div className="font-mono text-accent text-[11px] mb-1">
                      {c.filename} · p.{c.page} · {c.section}
                    </div>
                    <div className="text-light/80 italic leading-snug">
                      {c.excerpt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLive && (
            <div className="mt-4 text-[10px] uppercase tracking-wider text-accent/70 font-semibold">
              ● Live Acumen-7 reasoning · grounded in workspace evidence
            </div>
          )}
          {!isLive && !isPending && (
            <div className="mt-4 text-[10px] uppercase tracking-wider text-muted font-semibold">
              ○ Mocked-but-defensible reasoning · live Acumen-7 in Phase 2
            </div>
          )}
        </div>
      )}
    </div>
  );
}
