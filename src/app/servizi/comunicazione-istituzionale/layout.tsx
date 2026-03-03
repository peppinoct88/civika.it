import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunicazione Istituzionale per Comuni | CIVIKA",
  description:
    "Servizio completo di comunicazione istituzionale per Comuni siciliani: piano editoriale, gestione canali, content creation, ufficio stampa, newsletter e branding. Conforme a L.150/2000 e AGID.",
  openGraph: {
    title: "Comunicazione Istituzionale per Comuni | CIVIKA",
    description:
      "Servizio completo di comunicazione istituzionale per Comuni siciliani: piano editoriale, gestione canali, content creation, ufficio stampa, newsletter e branding.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/comunicazione-istituzionale",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Comunicazione Istituzionale per Comuni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comunicazione Istituzionale per Comuni | CIVIKA",
    description:
      "Servizio completo di comunicazione istituzionale per Comuni siciliani: piano editoriale, gestione canali, content creation, ufficio stampa, newsletter e branding.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/comunicazione-istituzionale",
  },
};

export default function ComunicazioneIstituzionaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
