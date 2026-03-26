import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Font Display — Instrument Serif
 * Usato per hero, titoli display, enfasi
 * Caricato da file locale per performance ottimale
 */
export const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

/**
 * Font Heading + Body — DM Sans
 * Font geometrico pulito per heading e body text
 * Fallback per Satoshi/General Sans (non su Google Fonts)
 */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

/**
 * Font Mono — JetBrains Mono
 * Per dati, numeri, tag normativi
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400"],
});

/**
 * Classe CSS combinata per tutte le font variables
 */
export const fontVariables = [
  instrumentSerif.variable,
  dmSans.variable,
  jetbrainsMono.variable,
].join(" ");
