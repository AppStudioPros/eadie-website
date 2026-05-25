"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "eadie-nda-accepted-v1";

interface NDAState {
  name: string;
  email: string;
  organization: string;
  agreed: boolean;
}

const initialState: NDAState = { name: "", email: "", organization: "", agreed: false };

export function NDAModal() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<NDAState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setState({ ...state, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/nda-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to record acceptance");
      }
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...state, ts: new Date().toISOString() })
        );
      } catch {
        // localStorage unavailable, still allow continuation
      }
      setOpen(false);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to record acceptance");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl border border-accent/40 bg-ink/95 backdrop-blur-md shadow-2xl">
        <div className="px-8 py-6 border-b border-white/10">
          <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-2">EADIE Demo · Confidentiality Acknowledgment</div>
          <h2 className="text-2xl font-bold tracking-tight">Before you continue</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          <p className="text-sm text-light leading-relaxed">
            The demonstration content on this page is the confidential intellectual property of Encore Services, LLC. It is provided to a limited audience under non-disclosure for federal evaluation purposes only. Multiple novel mechanisms are subject to pending U.S. provisional patent applications.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" value={state.name} onChange={handleChange} required />
            <Field label="Work Email" name="email" type="email" value={state.email} onChange={handleChange} required />
          </div>
          <Field label="Organization" name="organization" value={state.organization} onChange={handleChange} required />

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreed"
              checked={state.agreed}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 rounded border-white/20 bg-white/[0.05] text-accent focus:ring-accent/40 focus:ring-2 cursor-pointer accent-accent"
            />
            <span className="text-sm text-light leading-relaxed group-hover:text-text transition-colors">
              I agree that the EADIE demonstration content is the confidential intellectual property of Encore Services, LLC. I will not reproduce, distribute, screen-share with non-authorized parties, or use the content to develop a competing product. The content is subject to one or more pending U.S. provisional patent applications.
            </span>
          </label>

          {status === "error" && (
            <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-4 py-3">
              {errorMsg}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
            <p className="text-xs text-muted">
              Your acceptance is recorded with Encore Services, LLC for audit.
            </p>
            <button
              type="submit"
              disabled={status === "sending" || !state.agreed}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "sending" ? "Recording…" : "Accept & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg bg-white/[0.05] border border-white/10 px-4 py-3 text-text placeholder-muted/60 focus:outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors text-sm"
      />
    </div>
  );
}
