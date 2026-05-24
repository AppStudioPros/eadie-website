import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EADIE — Encore Acquisition Decision Intelligence Engine",
  description:
    "Multi-dimensional federal contractor evaluation with protest-defensible audit trails and a pause-resume AI assistant that travels with you through every step. A product of Encore Services LLC.",
  metadataBase: new URL("https://encoreacquisitionintelligenceengine.com"),
  openGraph: {
    title: "EADIE — Encore Acquisition Decision Intelligence Engine",
    description:
      "Multi-dimensional federal contractor evaluation with protest-defensible audit trails.",
    url: "https://encoreacquisitionintelligenceengine.com",
    siteName: "EADIE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EADIE",
    description:
      "Multi-dimensional federal contractor evaluation with protest-defensible audit trails.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full text-text">
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1"></div>
          <div className="ambient-blob ambient-blob-2"></div>
          <div className="ambient-blob ambient-blob-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
