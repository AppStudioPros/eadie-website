"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/demo";

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-focus the field
  useEffect(() => {
    const el = document.getElementById("eadie-pw") as HTMLInputElement | null;
    if (el) el.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/demo-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Sign-in failed");
      }
      // Cookie is set; navigate to the original destination
      const target = nextPath.startsWith("/demo") ? nextPath : "/demo";
      router.push(target);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Sign-in failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-accent/30 bg-white/[0.04] backdrop-blur-md p-7 md:p-8 shadow-2xl"
    >
      <label
        htmlFor="eadie-pw"
        className="block text-[10px] uppercase tracking-[0.18em] text-muted mb-2"
      >
        Briefing Password
      </label>
      <input
        id="eadie-pw"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full rounded-lg bg-white/[0.06] border border-white/10 px-4 py-3 text-text placeholder-muted/60 focus:outline-none focus:border-accent/60 focus:bg-white/[0.10] transition-colors text-base font-medium tracking-wider"
        placeholder="Enter password"
      />

      {status === "error" && (
        <div className="mt-4 text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !password}
        className="mt-5 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Verifying…" : "Enter Demonstration"}
      </button>

      <div className="mt-5 pt-5 border-t border-white/10 text-xs text-muted leading-relaxed">
        By entering, you acknowledge the demonstration content is the confidential intellectual property of Encore Services, LLC, subject to one or more pending U.S. provisional patent applications.
      </div>
    </form>
  );
}
