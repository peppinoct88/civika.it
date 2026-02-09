import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import ServerPageView from "@/components/ServerPageView";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.civika.it"),
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
  authors: [{ name: "CIVIKA SRL", url: "https://www.civika.it" }],
  creator: "CIVIKA SRL",
  publisher: "CIVIKA SRL",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.civika.it",
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
    canonical: "https://www.civika.it",
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
    url: "https://www.civika.it",
    logo: "https://www.civika.it/logo-civika-white.svg",
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
    url: "https://www.civika.it",
    description:
      "CIVIKA — Il partner unico per la comunicazione istituzionale dei Comuni siciliani.",
    publisher: {
      "@type": "Organization",
      name: "CIVIKA",
      logo: "https://www.civika.it/logo-civika-white.svg",
    },
    inLanguage: "it",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.civika.it/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="it">
      <head>
        <meta name="theme-color" content="#0F1F33" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Google Analytics — first-party proxy */}
        <script async src="/api/t/ga" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K0JZPPYSG4',{send_page_view:true,cookie_flags:'SameSite=None;Secure'});`,
          }}
        />
        {/* Meta Pixel — first-party proxy */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','/api/t/fb');fbq('init','887486544068900');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=887486544068900&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <ServerPageView />
        <CookieBanner />
      </body>
    </html>
  );
}
