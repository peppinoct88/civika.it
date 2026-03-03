import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servizi | Comunicazione Istituzionale per Comuni — CIVIKA",
  description:
    "Servizi integrati di comunicazione istituzionale per Comuni siciliani: sito web AGID, social media, ufficio stampa, bandi europei e PNRR, eventi.",
  openGraph: {
    title: "Servizi | Comunicazione Istituzionale per Comuni — CIVIKA",
    description:
      "Servizi integrati di comunicazione istituzionale per Comuni siciliani: sito web AGID, social media, ufficio stampa, bandi europei e PNRR, eventi.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Servizi Comunicazione Comuni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi | Comunicazione Istituzionale per Comuni — CIVIKA",
    description:
      "Servizi integrati di comunicazione istituzionale per Comuni siciliani.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi",
  },
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
