"use client";

import { useState, useRef, useEffect } from "react";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  degraded?: boolean;
}

interface AcumenChatPanelProps {
  scenarioKey: string;
  scenarioTitle: string;
  // When the analysis runs, the parent can pass a key that flips when complete
  // so the panel can show an inviting opener bot message after results land.
  analysisComplete?: boolean;
  workspaceId?: string | null;
}

export function AcumenChatPanel({
  scenarioKey,
  scenarioTitle,
  analysisComplete = false,
  workspaceId = null,
}: AcumenChatPanelProps) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [hasInjectedOpener, setHasInjectedOpener] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inject opener message after analysis completes
  useEffect(() => {
    if (analysisComplete && !hasInjectedOpener) {
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Acumen-7 here. I have the full **${scenarioTitle}** workspace loaded: solicitation, ingested documents, candidate vendors, and the ten-dimension analysis. Ask me anything grounded in this acquisition — capability gaps, scoring rationale, risk callouts, comparable precedent, recommended next steps. Try "What's the strongest signal for the SDVOSB candidates?" or "Which dimensions carry the most protest risk if challenged?"`,
          timestamp: Date.now(),
        },
      ]);
      setHasInjectedOpener(true);
      // Auto-open panel on completion
      setOpen(true);
    }
  }, [analysisComplete, hasInjectedOpener, scenarioTitle]);

  // Auto-scroll on new turns
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns, open]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userTurn: ChatTurn = {
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };
    setTurns((prev) => [...prev, userTurn]);
    setInput("");
    setSending(true);

    try {
      const history = turns.map((t) => ({ role: t.role, content: t.content }));
      const res = await fetch("/api/sandbox/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_key: scenarioKey,
          history,
          message: trimmed,
          workspace_id: workspaceId,
        }),
      });

      let reply: string;
      let degraded = false;
      if (res.ok) {
        const data = await res.json();
        reply = data.reply || "Acumen-7 returned an empty response.";
        degraded = data.degraded === true;
      } else {
        const errData = await res.json().catch(() => ({}));
        reply = `Acumen-7 is temporarily unavailable: ${
          errData.message || `HTTP ${res.status}`
        }. Please try again in a moment.`;
        degraded = true;
      }

      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
          degraded,
        },
      ]);
    } catch (e) {
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Acumen-7 chat error: ${
            e instanceof Error ? e.message : "unknown"
          }. The workspace is still loaded; please retry.`,
          timestamp: Date.now(),
          degraded: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating launcher button (always visible when panel is closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-accent to-accent3 text-ink font-bold tracking-wider uppercase text-xs shadow-2xl hover:shadow-amber/30 transition-shadow"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ink"></span>
          </span>
          <span>Acumen-7 · Ask</span>
        </button>
      )}

      {/* Slide-in chat panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-ink/95 backdrop-blur-xl border-l border-amber/30 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center flex-shrink-0">
              <span className="text-ink font-black text-sm">A7</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight">Acumen-7</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                  </span>
                  Live
                </span>
              </div>
              <div className="text-[10px] text-muted uppercase tracking-widest truncate">
                Workspace-grounded · {scenarioTitle}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="w-9 h-9 rounded-full text-muted hover:text-text hover:bg-white/5 transition-colors flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        >
          {turns.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted leading-relaxed">
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber font-bold mb-2">
                Tip
              </div>
              Acumen-7 answers questions grounded in the loaded workspace
              (scenario, methodology, ingested documents, candidate vendors).
              Outside that scope, it&rsquo;ll redirect.
            </div>
          )}

          {turns.map((t, i) => (
            <div
              key={i}
              className={`flex ${
                t.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  t.role === "user"
                    ? "bg-accent/15 border border-accent/30 text-light rounded-br-md"
                    : t.degraded
                    ? "bg-red-500/10 border border-red-500/30 text-red-100 rounded-bl-md"
                    : "bg-white/[0.04] border border-white/10 text-light rounded-bl-md"
                }`}
              >
                {t.content}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 bg-white/[0.04] border border-white/10 text-sm text-muted rounded-bl-md inline-flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: "200ms" }}
                  ></span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: "400ms" }}
                  ></span>
                </span>
                <span className="text-[11px] uppercase tracking-wider">
                  Acumen-7 is reasoning
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about this acquisition…"
              rows={2}
              className="flex-1 resize-none rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5 text-sm text-light placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              disabled={sending}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent3 text-ink font-bold text-xs tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber/20 transition-shadow"
            >
              Send
            </button>
          </div>
          <div className="text-[10px] text-muted/70 mt-2 uppercase tracking-wider">
            Enter to send · Shift+Enter for newline · Audit-trail logged
          </div>
        </div>
      </div>
    </>
  );
}
