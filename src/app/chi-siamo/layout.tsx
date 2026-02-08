import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo | Team Comunicazione Comuni — CIVIKA",
  description:
    "Il team CIVIKA: professionisti della comunicazione istituzionale, eventi e progettazione europea per i 391 Comuni siciliani.",
  openGraph: {
    title: "Chi Siamo | Team Comunicazione Comuni — CIVIKA",
    description:
      "Il team CIVIKA: professionisti della comunicazione istituzionale, eventi e progettazione europea per i 391 Comuni siciliani.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/chi-siamo",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Chi Siamo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | Team Comunicazione Comuni — CIVIKA",
    description:
      "Il team CIVIKA: professionisti della comunicazione istituzionale per i Comuni siciliani.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/chi-siamo",
  },
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
