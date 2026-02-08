import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — CIVIKA",
  description:
    "Informativa estesa sull'utilizzo dei cookie del sito civika.it ai sensi del GDPR e della Direttiva ePrivacy.",
  openGraph: {
    title: "Cookie Policy — CIVIKA",
    description:
      "Informativa estesa sull'utilizzo dei cookie del sito civika.it.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Cookie Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy — CIVIKA",
    description:
      "Informativa estesa sull'utilizzo dei cookie del sito civika.it.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/cookie-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
