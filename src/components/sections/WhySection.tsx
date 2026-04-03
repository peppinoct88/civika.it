"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/* ── Component — Chi è Giuseppe (layout card scura su sfondo chiaro) ── */

export function WhySection() {
  return (
    <section id="chi-sono" className="relative bg-neutral-50 py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeUp>
          {/* ── Card scura ── */}
          <div className="relative rounded-2xl bg-neutral-900 overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">

            {/* ── Foto — posizionata a sinistra ── */}
            <div className="relative lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[45%]">
              <img
                src="/giuseppe-spalletta.webp"
                alt="Giuseppe Spalletta — Fondatore di Civika"
                className="w-full h-full object-cover object-top lg:object-center"
              />
              {/* Gradient fade verso la card scura */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-900 hidden lg:block"
                aria-hidden="true"
              />
              {/* Gradient fade mobile — verso il basso */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent lg:hidden"
                aria-hidden="true"
              />
            </div>

            {/* ── Testo — posizionato a destra ── */}
            <div className="relative lg:ml-[42%] px-6 pb-10 pt-6 sm:px-10 sm:pb-14 lg:py-16 lg:px-14 lg:pr-12">
              <p className="text-base font-semibold italic text-neutral-200 mb-2">
                Mi presento:
              </p>

              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-gold-400 sm:text-4xl lg:text-5xl mb-6">
                Sono Giuseppe{"\u00A0"}Spalletta.
              </h2>

              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg mb-5 max-w-lg">
                Ho passato anni a lavorare con enti pubblici e istituzioni,
                vedendo dall&apos;interno come funziona il mondo dei finanziamenti.
                Una cosa mi ha sempre colpito:{" "}
                <strong className="text-white">
                  i fondi ci sono, ma le imprese non li raggiungono.
                </strong>
              </p>

              <p className="text-base leading-relaxed text-neutral-300 max-w-lg">
                Non per mancanza di merito, ma per mancanza di chi sappia fare
                il ponte tra il bando e il progetto. Ho creato Civika con una
                missione precisa: sbloccare i fondi per chi li merita.
              </p>
            </div>

            {/* ── Sottile linea gold decorativa in alto ── */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
              aria-hidden="true"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
