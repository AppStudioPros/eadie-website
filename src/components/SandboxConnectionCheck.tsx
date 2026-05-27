"use client";

import { useEffect, useState } from "react";

interface HelloResponse {
  message?: string;
  engine?: string;
  ready?: boolean;
  patent_status?: string;
  compliance?: string[];
  error?: string;
}

type Status = "checking" | "ok" | "error";

export function SandboxConnectionCheck() {
  const [status, setStatus] = useState<Status>("checking");
  const [data, setData] = useState<HelloResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch("/api/sandbox/hello", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const body: HelloResponse = await res.json();
        if (cancelled) return;
        setData(body);
        setStatus("ok");
      } catch (e) {
        if (cancelled) return;
        setErrorMsg(e instanceof Error ? e.message : "Connection failed");
        setStatus("error");
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm p-6 md:p-7 max-w-3xl">
      <div className="text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Engine Status
      </div>

      {status === "checking" && (
        <div className="flex items-center gap-3 text-light">
          <span className="inline-block w-2 h-2 rounded-full bg-amber animate-pulse" />
          <span className="text-sm">Connecting to EADIE engine...</span>
        </div>
      )}

      {status === "ok" && data && (
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-light">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm font-semibold">EADIE engine connected</span>
          </div>
          <div className="ml-5 text-xs text-muted space-y-1">
            <div>
              <span className="opacity-60">Engine:</span>{" "}
              <span className="text-accent font-mono">{data.engine}</span>
            </div>
            <div>
              <span className="opacity-60">Patent:</span>{" "}
              <span className="font-mono">{data.patent_status}</span>
            </div>
            {data.compliance && data.compliance.length > 0 && (
              <div>
                <span className="opacity-60">Posture:</span>{" "}
                {data.compliance.map((c) => (
                  <span
                    key={c}
                    className="inline-block px-1.5 py-0.5 mx-0.5 rounded text-[10px] bg-accent/10 text-accent border border-accent/30"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-light">
            <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
            <span className="text-sm font-semibold text-red-300">Engine unreachable</span>
          </div>
          <div className="ml-5 text-xs text-muted">
            <div className="font-mono opacity-80">{errorMsg}</div>
            <div className="mt-2 opacity-60">
              The EADIE Python backend is offline or not yet provisioned. Walkthrough at{" "}
              <a href="/demo" className="text-accent hover:underline">
                /demo
              </a>{" "}
              is still available.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
