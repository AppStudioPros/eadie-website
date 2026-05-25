import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "EADIE Demo Access — Encore Services LLC",
  description: "Restricted access to the EADIE demonstration.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen text-text z-10 flex flex-col">
      {/* Slim top bar */}
      <header className="border-b border-white/10 bg-ink/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent3 flex items-center justify-center">
              <span className="text-ink font-black text-sm tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none">Encore · EADIE</span>
              <span className="text-[10px] text-accent leading-none mt-0.5 uppercase tracking-widest">Demo · Confidential</span>
            </div>
          </a>
          <a href="/" className="text-sm text-muted hover:text-text transition-colors">← Public site</a>
        </div>
      </header>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
              Restricted Access
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              EADIE Demonstration
            </h1>
            <p className="text-light leading-relaxed">
              Access is limited to invited federal stakeholders. Enter the briefing password provided by Encore Services to continue.
            </p>
          </div>

          <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center text-muted text-sm">Loading…</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-8 text-center">
            <div className="text-xs text-muted leading-relaxed">
              For access inquiries, contact{" "}
              <a href="mailto:jwoodson@encoresvcsllc.com" className="text-accent hover:underline">
                Dr. Jeff Woodson · Encore Services LLC
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-ink/60">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
            Confidential · Encore Services LLC
          </div>
          <div className="text-xs text-muted mb-3">
            U.S. Provisional Patent Application Filed.
          </div>
          <div className="text-xs text-muted flex items-center justify-center gap-4">
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
