import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizzazione Eventi Istituzionali per Comuni | CIVIKA",
  description:
    "Organizziamo eventi istituzionali per Comuni siciliani: inaugurazioni, convegni, festival, animazione territoriale, cerimonie. Concept, logistica, comunicazione e post-evento.",
  openGraph: {
    title: "Organizzazione Eventi Istituzionali per Comuni | CIVIKA",
    description:
      "Organizziamo eventi istituzionali per Comuni siciliani: inaugurazioni, convegni, festival, animazione territoriale, cerimonie. Concept, logistica, comunicazione e post-evento.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/eventi-istituzionali",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Organizzazione Eventi Istituzionali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organizzazione Eventi Istituzionali per Comuni | CIVIKA",
    description:
      "Organizziamo eventi istituzionali per Comuni siciliani: inaugurazioni, convegni, festival, animazione territoriale, cerimonie.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/eventi-istituzionali",
  },
};

export default function EventiIstituzionaliLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
