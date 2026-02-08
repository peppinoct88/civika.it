import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://civika.it"),
  title: {
    default: "CIVIKA — Comunicazione e Eventi per Comuni Siciliani",
    template: "%s",
  },
  description:
    "CIVIKA: comunicazione istituzionale, eventi e bandi europei per i Comuni siciliani. Sito web AGID, social media e rassegna stampa.",
  keywords: [
    "comunicazione istituzionale",
    "comuni siciliani",
    "comunicazione pubblica amministrazione",
    "eventi istituzionali sicilia",
    "bandi europei comuni",
    "sito web comunale AGID",
    "social media comuni",
    "rassegna stampa PA",
    "PNRR comuni sicilia",
    "comunicazione PA sicilia",
    "CIVIKA",
  ],
  authors: [{ name: "CIVIKA SRL", url: "https://civika.it" }],
  creator: "CIVIKA SRL",
  publisher: "CIVIKA SRL",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://civika.it",
    siteName: "CIVIKA",
    title: "CIVIKA — Comunicazione e Eventi per Comuni Siciliani",
    description:
      "CIVIKA: comunicazione istituzionale, eventi e bandi europei per i Comuni siciliani.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — La Regia per Eventi e Comunicazione Istituzionale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIVIKA — Comunicazione e Eventi per Comuni Siciliani",
    description:
      "CIVIKA: comunicazione istituzionale, eventi e bandi europei per i Comuni siciliani.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://civika.it",
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* JSON-LD Organization structured data */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CIVIKA",
    legalName: "CIVIKA SRL",
    url: "https://civika.it",
    logo: "https://civika.it/logo-civika-new.svg",
    description:
      "Comunicazione istituzionale, eventi professionali e bandi europei per i Comuni siciliani.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@civika.it",
      contactType: "customer service",
      availableLanguage: "Italian",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sicilia",
    },
    sameAs: [],
    knowsAbout: [
      "Comunicazione istituzionale",
      "Eventi istituzionali",
      "Bandi europei",
      "Sito web comunale",
      "Social media management",
      "Pubblica Amministrazione",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CIVIKA",
    url: "https://civika.it",
    description:
      "CIVIKA — Il partner unico per la comunicazione istituzionale dei Comuni siciliani.",
    publisher: {
      "@type": "Organization",
      name: "CIVIKA",
      logo: "https://civika.it/logo-civika-new.svg",
    },
    inLanguage: "it",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://civika.it/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="it">
      <head>
        <meta name="theme-color" content="#0F1F33" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
