"use client";

import { usePathname } from "next/navigation";

export function Watermark() {
  const pathname = usePathname();
  // Hide watermark on login (clean auth surface) — show on actual demo content
  if (pathname?.startsWith("/demo/login")) return null;

  const today = new Date().toISOString().slice(0, 10);
  const text = `EADIE DEMO · CONFIDENTIAL · ENCORE SERVICES LLC · ${today}`;
  const lines = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden select-none"
      style={{ userSelect: "none" }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-around"
        style={{ transform: "rotate(-22deg) scale(1.4)", transformOrigin: "center" }}
      >
        {lines.map((i) => (
          <div
            key={i}
            className="whitespace-nowrap font-mono text-[10px] tracking-[0.3em]"
            style={{ color: "rgba(251, 191, 36, 0.06)" }}
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <span key={j} className="inline-block px-6">{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
