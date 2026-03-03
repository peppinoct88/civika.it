import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bandi Europei e PNRR per Comuni Siciliani | CIVIKA",
  description:
    "Consulenza completa su bandi europei e PNRR per Comuni. Scouting opportunità, analisi ammissibilità, scrittura progetti, supporto istruttoria, rendicontazione. FESR, FEASR, SNAI, LEADER.",
  openGraph: {
    title: "Bandi Europei e PNRR per Comuni Siciliani | CIVIKA",
    description:
      "Consulenza completa su bandi europei e PNRR per Comuni. Scouting opportunità, analisi ammissibilità, scrittura progetti, supporto istruttoria, rendicontazione.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/bandi-europei-comuni",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Bandi Europei e PNRR per Comuni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bandi Europei e PNRR per Comuni Siciliani | CIVIKA",
    description:
      "Consulenza completa su bandi europei e PNRR per Comuni. Scouting opportunità, analisi ammissibilità, scrittura progetti, supporto istruttoria, rendicontazione.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/bandi-europei-comuni",
  },
};

export default function BandiEuropeiComuniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
