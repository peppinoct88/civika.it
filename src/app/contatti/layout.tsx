import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti — Parliamo del Vostro Comune | CIVIKA",
  description:
    "Contatta CIVIKA per un incontro gratuito sulla comunicazione del tuo Comune. Rispondiamo entro 24 ore, nessun impegno.",
  openGraph: {
    title: "Contatti — Parliamo del Vostro Comune | CIVIKA",
    description:
      "Contatta CIVIKA per un incontro gratuito sulla comunicazione del tuo Comune. Rispondiamo entro 24 ore.",
    type: "website",
    locale: "it_IT",
    siteName: "CIVIKA",
    url: "https://civika.it/contatti",
    images: [
      {
        url: "https://civika.it/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — Contatti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti — Parliamo del Vostro Comune | CIVIKA",
    description:
      "Contatta CIVIKA per un incontro gratuito sulla comunicazione del tuo Comune.",
    images: ["https://civika.it/og-image.png"],
  },
  alternates: {
    canonical: "https://civika.it/contatti",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Il primo incontro è davvero gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, sempre. Ci sediamo con voi, ascoltiamo, e vi proponiamo un piano. Zero costi, zero impegni.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa il servizio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dalle esigenze. Prepariamo sempre una proposta su misura con budget trasparente.",
      },
    },
    {
      "@type": "Question",
      name: "Lavorate anche fuori dalla Sicilia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il nostro focus è la Sicilia, ma valutiamo progetti anche nel resto d'Italia.",
      },
    },
  ],
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
