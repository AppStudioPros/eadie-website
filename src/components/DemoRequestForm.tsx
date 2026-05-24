"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  organization: string;
  role: string;
  briefingType: string;
  agency: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  role: "",
  briefingType: "",
  agency: "",
  message: "",
};

export function DemoRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-white/[0.05] backdrop-blur-md p-8 md:p-10 text-center">
        <div className="text-2xl font-bold mb-3">Request received.</div>
        <p className="text-light text-base leading-relaxed mb-2">
          Encore will respond directly to confirm a briefing time and answer initial questions.
        </p>
        <p className="text-muted text-sm">
          For urgent inquiries, reach Dr. Jeff Woodson at <a href="mailto:jwoodson@encoresvcsllc.com" className="text-accent hover:underline">jwoodson@encoresvcsllc.com</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-8 md:p-10 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Work Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Organization" name="organization" value={form.organization} onChange={handleChange} required />
        <Field label="Title / Role" name="role" value={form.role} onChange={handleChange} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Select
          label="Briefing Type"
          name="briefingType"
          value={form.briefingType}
          onChange={handleChange}
          required
          options={[
            { value: "", label: "Select…" },
            { value: "overview", label: "Overview briefing (30 min)" },
            { value: "demo", label: "Live demo (60 min)" },
            { value: "pilot", label: "Pilot conversation" },
            { value: "partner", label: "Partner / channel inquiry" },
            { value: "press", label: "Press / analyst inquiry" },
            { value: "other", label: "Other" },
          ]}
        />
        <Field
          label="Agency / Affiliation"
          name="agency"
          value={form.agency}
          onChange={handleChange}
          placeholder="VA, DOD, civilian, etc."
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Anything we should know before the briefing
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg bg-white/[0.05] border border-white/10 px-4 py-3 text-text placeholder-muted/60 focus:outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors text-sm"
          placeholder="Acquisition type, timeline, specific questions, etc. (optional)"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-xs text-muted leading-relaxed max-w-md">
          Submissions are routed to Encore Services, LLC. We reply within one business day. No marketing list. No automated outreach.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent3 text-ink font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "sending" ? "Sending…" : "Request Briefing"}
        </button>
      </div>

      {status === "error" && (
        <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-4 py-3">
          {errorMsg || "Something went wrong. Try again or email jwoodson@encoresvcsllc.com directly."}
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-lg bg-white/[0.05] border border-white/10 px-4 py-3 text-text placeholder-muted/60 focus:outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors text-sm"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg bg-white/[0.05] border border-white/10 px-4 py-3 text-text focus:outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors text-sm appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%23fbbf24' stroke-width='2'%3e%3cpath d='M2 4l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          paddingRight: "2.5rem",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
