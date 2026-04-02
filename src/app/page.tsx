import type { Metadata } from "next";
import Homepage from "@/components/Homepage";

export const metadata: Metadata = {
  title: "CIVIKA — Sblocco Fondi™ per PMI e Startup | I fondi non si cercano. Si progettano.",
  description:
    "Civika trasforma i bandi pubblici in capitale reale per la tua impresa. Con il Sistema Sblocca-Fondi™, il tuo progetto diventa la risposta che i bandi stanno cercando.",
  alternates: {
    canonical: "https://www.civika.it",
  },
};

export default function Page() {
  return <Homepage />;
}
