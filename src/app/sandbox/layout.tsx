import type { Metadata } from "next";
import { Watermark } from "@/components/Watermark";

export const metadata: Metadata = {
  title: "EADIE Sandbox — Live Demonstration · Encore Services LLC",
  description: "Live working demonstration of EADIE. Access restricted. For evaluation only.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Watermark />
      {children}
    </div>
  );
}
