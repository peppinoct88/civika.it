import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Comunicazione per Comuni — CIVIKA",
  description:
    "Guide e approfondimenti su comunicazione istituzionale, social media, eventi e bandi europei per i Comuni siciliani.",
  openGraph: {
    title: "Blog | Comunicazione per Comuni — CIVIKA",
    description:
      "Guide e approfondimenti su comunicazione istituzionale, social media, eventi e bandi europei per i Comuni siciliani.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://www.civika.it/blog",
    images: [
      {
        url: "https://www.civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Blog sulla comunicazione istituzionale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Comunicazione per Comuni — CIVIKA",
    description:
      "Guide su comunicazione istituzionale, social media, eventi e bandi per Comuni siciliani.",
    images: ["https://www.civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
