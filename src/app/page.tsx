import type { Metadata } from "next";
import Homepage from "@/components/Homepage";

export const metadata: Metadata = {
  title: "CIVIKA — Comunicazione e Eventi per Comuni Siciliani",
  description:
    "CIVIKA: comunicazione istituzionale, eventi e bandi europei per i Comuni siciliani. Sito web AGID, social media e rassegna stampa.",
  alternates: {
    canonical: "https://www.civika.it",
  },
};

export default function Page() {
  return <Homepage />;
}
