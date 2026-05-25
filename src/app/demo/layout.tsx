import type { Metadata } from "next";
import { Watermark } from "@/components/Watermark";

export const metadata: Metadata = {
  title: "EADIE Demo — Confidential · Encore Services LLC",
  description: "Confidential demonstration of EADIE. Access restricted.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Watermark />
      {children}
    </div>
  );
}
