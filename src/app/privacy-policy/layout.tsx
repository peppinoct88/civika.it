import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CIVIKA",
  description:
    "Informativa sul trattamento dei dati personali di CIVIKA SRL ai sensi del Regolamento UE 2016/679 (GDPR).",
  openGraph: {
    title: "Privacy Policy — CIVIKA",
    description:
      "Informativa sul trattamento dei dati personali di CIVIKA SRL ai sensi del GDPR.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — CIVIKA",
    description:
      "Informativa sul trattamento dei dati personali di CIVIKA SRL ai sensi del GDPR.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.civika.it/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
