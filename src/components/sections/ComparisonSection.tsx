"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ComparisonRow } from "@/components/molecules/ComparisonRow";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/molecules/Card";

const rows = [
  {
    label: "Ricerca bandi",
    without: "Ore perse a cercare senza metodo",
    withCivika: "Mappa personalizzata dei fondi attivi",
  },
  {
    label: "Progettazione",
    without: "Proposta generica, debole",
    withCivika: "Progetto calibrato sui criteri di valutazione",
  },
  {
    label: "Burocrazia",
    without: "Documenti mancanti, errori, ritardi",
    withCivika: "Iter gestito dalla A alla Z",
  },
  {
    label: "Tasso approvazione",
    without: "Bocciature ripetute, senza capire perché",
    withCivika: "Metodologia con track record verificabile",
  },
  {
    label: "Tempo imprenditore",
    without: "Settimane sottratte al business",
    withCivika: "Tu gestisci l'azienda, noi il progetto",
  },
  {
    label: "Dopo l'approvazione",
    without: "Rendicontazione incerta, rischio restituzione",
    withCivika: "Accompagnamento fino all'ultimo euro erogato",
  },
] as const;

export function ComparisonSection() {
  return (
    <SectionWrapper id="confronto" bg="darker">
      <Container>
        <SectionHeader
          overline="Il confronto"
          title="Da solo vs con Civika"
          subtitle="La differenza tra provare a vincere un bando e avere un sistema progettato per farlo."
        />

        <Card variant="glass" hover={false} className="p-0 sm:p-0 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Area
            </div>
            <div className="hidden md:block text-xs font-semibold uppercase tracking-wider text-red-400/70">
              Da solo
            </div>
            <div className="hidden md:block text-xs font-semibold uppercase tracking-wider text-accent-400/70">
              Con Civika
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
