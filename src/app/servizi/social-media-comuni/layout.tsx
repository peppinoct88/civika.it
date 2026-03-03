import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media per Comuni | Gestione Canali PA — CIVIKA",
  description:
    "Gestione professionale dei social media per Comuni secondo L.150/2000 e L.69/2025. Creiamo piano editoriale, contenuti originali, community management, gestione crisi e reportistica. Facebook, Instagram, YouTube, LinkedIn.",
  openGraph: {
    title: "Social Media per Comuni | Gestione Canali PA — CIVIKA",
    description:
      "Gestione professionale dei social media per Comuni secondo L.150/2000 e L.69/2025. Piano editoriale, content creation, community management, gestione crisi.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/servizi/social-media-comuni",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Social Media per Comuni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media per Comuni | Gestione Canali PA — CIVIKA",
    description:
      "Gestione professionale dei social media per Comuni secondo L.150/2000 e L.69/2025. Piano editoriale, content creation, community management.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/servizi/social-media-comuni",
  },
};

export default function SocialMediaComuniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
