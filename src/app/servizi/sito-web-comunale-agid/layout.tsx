import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sito Web Comunale Conforme AGID | CIVIKA",
  description:
    "Sviluppiamo siti web comunali conformi alle linee guida AGID con Design System Italia, integrazione SPID e CIE, pagoPA e accessibilità WCAG 2.1. Finanziabili con PNRR misura 1.4.1.",
  openGraph: {
    title: "Sito Web Comunale Conforme AGID | CIVIKA",
    description:
      "Sviluppiamo siti web comunali conformi alle linee guida AGID con Design System Italia, integrazione SPID e CIE, pagoPA e accessibilità WCAG 2.1.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/sito-web-comunale-agid",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Sito Web Comunale Conforme AGID",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sito Web Comunale Conforme AGID | CIVIKA",
    description:
      "Sviluppiamo siti web comunali conformi alle linee guida AGID con Design System Italia, integrazione SPID e CIE, pagoPA e accessibilità WCAG 2.1.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/sito-web-comunale-agid",
  },
};

export default function SitoWebComunaleAgidLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
