"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ComparisonRow } from "@/components/molecules/ComparisonRow";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/molecules/Card";

const rows = [
  {
    label: "Sito web",
    without: "Pagina generica, non aggiornata",
    withCivika: "Sito AGID compliant, aggiornato",
  },
  {
    label: "Social media",
    without: "Post sporadici, senza strategia",
    withCivika: "Piano editoriale integrato",
  },
  {
    label: "Eventi",
    without: "Organizzazione improvvisata",
    withCivika: "Regia professionale completa",
  },
  {
    label: "Rassegna stampa",
    without: "Nessuna copertura media",
    withCivika: "Comunicati e relazioni media",
  },
  {
    label: "Bandi e fondi",
    without: "Opportunita perse",
    withCivika: "Monitoraggio e candidatura assistita",
  },
  {
    label: "Normativa",
    without: "Rischio sanzioni AGID",
    withCivika: "Compliance garantita",
  },
] as const;

export function ComparisonSection() {
  return (
    <SectionWrapper id="confronto" bg="darker">
      <Container>
        <SectionHeader
          overline="Il confronto"
          title="Un evento fatto bene vale piu di cento post"
          subtitle="La differenza tra fare e far sapere."
        />

        <Card variant="glass" hover={false} className="p-0 sm:p-0 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Servizio
            </div>
            <div className="hidden md:block text-xs font-semibold uppercase tracking-wider text-red-400/70">
              Senza CIVIKA
            </div>
            <div className="hidden md:block text-xs font-semibold uppercase tracking-wider text-emerald-400/70">
              Con CIVIKA
            </div>
          </div>

          {/* Comparison rows */}
          <StaggerContainer className="px-6" staggerDelay={0.08}>
            {rows.map((row) => (
              <ComparisonRow
                key={row.label}
                label={row.label}
                without={row.without}
                withCivika={row.withCivika}
              />
            ))}
          </StaggerContainer>
        </Card>
      </Container>
    </SectionWrapper>
  );
}
