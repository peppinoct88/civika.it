import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import CookieBanner from "@/components/CookieBanner";
import ServerPageView from "@/components/ServerPageView";
import EventTracker from "@/components/EventTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.civika.it"),
  title: {
    default: "CIVIKA — Sblocco Fondi™ per PMI e Startup",
    template: "%s | CIVIKA",
  },
  description:
    "Civika trasforma i bandi pubblici in capitale reale per la tua impresa. Sistema Sblocca-Fondi™: dalla mappatura dei bandi all'incasso dei fondi.",
  keywords: [
    "bandi PMI",
    "finanziamenti imprese",
    "consulente bandi",
    "fondi europei PMI",
    "bandi startup",
    "PNRR imprese",
    "finanziamenti a fondo perduto",
    "consulenza bandi europei",
    "sblocco fondi",
    "Horizon Europe",
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
    title: "CIVIKA — Sblocco Fondi™ per PMI e Startup",
    description:
      "Civika trasforma i bandi pubblici in capitale reale per la tua impresa. I fondi non si cercano. Si progettano.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIVIKA — I fondi non si cercano. Si progettano.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIVIKA — Sblocco Fondi™ per PMI e Startup",
    description:
      "Civika trasforma i bandi pubblici in capitale reale per la tua impresa. I fondi non si cercano. Si progettano.",
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
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CIVIKA",
    legalName: "CIVIKA SRL",
    url: "https://www.civika.it",
    logo: "https://www.civika.it/logo-civika-white.svg",
    description:
      "Sblocco Fondi per PMI e Startup. Trasformiamo i bandi pubblici in capitale reale per la tua impresa.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "civikasrl@gmail.com",
      telephone: "+393498750521",
      contactType: "customer service",
      availableLanguage: "Italian",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sicilia",
    },
    sameAs: [
      "https://www.facebook.com/civikasrl",
      "https://www.instagram.com/civikasrl",
    ],
    knowsAbout: [
      "Bandi europei",
      "Finanziamenti PMI",
      "Fondi PNRR",
      "Horizon Europe",
      "Smart&Start",
      "Progettazione bandi",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "CIVIKA",
    url: "https://www.civika.it",
    telephone: "+393498750521",
    email: "civikasrl@gmail.com",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sicilia",
    },
    serviceType: [
      "Consulenza bandi europei",
      "Progettazione bandi nazionali",
      "Sblocco fondi PNRR",
      "Consulenza finanziamenti PMI",
      "Progettazione Horizon Europe",
      "Consulenza Smart&Start",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi Sblocco Fondi",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pacchetto Standard", url: "https://www.civika.it/servizi/standard" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pacchetto PRO", url: "https://www.civika.it/servizi/pro" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pacchetto VIP", url: "https://www.civika.it/servizi/vip" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diagnosi Sblocca-Fondi", url: "https://www.civika.it/diagnosi" } },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CIVIKA",
    url: "https://www.civika.it",
    description:
      "CIVIKA — Sblocco Fondi™ per PMI e Startup. I fondi non si cercano. Si progettano.",
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
        <meta name="theme-color" content="#0a1e2e" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
            alt="Meta Pixel"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, serviceSchema]),
          }}
        />
      </head>
      <body className={`${fontVariables} font-sans antialiased`} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Vai al contenuto principale
        </a>
        {children}
        <ServerPageView />
        <EventTracker />
        <CookieBanner />
      </body>
    </html>
  );
}
