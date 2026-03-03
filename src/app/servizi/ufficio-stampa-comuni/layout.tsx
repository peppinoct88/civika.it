import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ufficio Stampa per Comuni | Relazioni Media PA — CIVIKA",
  description:
    "Servizio di ufficio stampa per Comuni: comunicati stampa, relazioni con i media, media training per Sindaci, rassegna stampa, gestione crisi. Conforme a L.150/2000.",
  openGraph: {
    title: "Ufficio Stampa per Comuni | Relazioni Media PA — CIVIKA",
    description:
      "Servizio di ufficio stampa per Comuni: comunicati stampa, relazioni con i media, media training per Sindaci, rassegna stampa, gestione crisi. Conforme a L.150/2000.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/ufficio-stampa-comuni",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Ufficio Stampa per Comuni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ufficio Stampa per Comuni | Relazioni Media PA — CIVIKA",
    description:
      "Servizio di ufficio stampa per Comuni: comunicati stampa, relazioni con i media, media training per Sindaci, rassegna stampa, gestione crisi.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/ufficio-stampa-comuni",
  },
};

export default function UfficioStampaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
