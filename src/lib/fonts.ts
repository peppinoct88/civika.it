import { Lora, Libre_Franklin, JetBrains_Mono } from "next/font/google";

/**
 * Font Display — Lora
 * Serif moderno ed elegante per titoli e hero.
 * Leggibile anche a grandi dimensioni, non ornato.
 */
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/**
 * Font Heading + Body — Libre Franklin
 * Sans-serif raffinato e leggibile per heading e body text
 */
export const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
  lora.variable,
  libreFranklin.variable,
  jetbrainsMono.variable,
].join(" ");
