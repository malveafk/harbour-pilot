import type { Metadata } from "next";
import { Container, Grid } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Foto } from "@/components/foto";
import { NavCollezioni } from "@/components/nav-collezioni";
import { Registro, Mancante } from "@/components/registro";
import { Reveal } from "@/components/reveal";
import { collezioni } from "@/lib/contenuti";

export const metadata: Metadata = {
  title: "Collezioni",
  description:
    "Originals, Technical, Port Series, Harbour Swallow e l'edizione speciale Ravenna 2026.",
};

/* ============================================================================
   COLLEZIONI — una pagina sola, cinque sezioni

   Non cinque pagine separate: con poche immagini reali disponibili, cinque
   pagine sarebbero cinque stanze quasi vuote. Una pagina unica le mette in
   sequenza e lascia che si sostengano a vicenda; la navigazione laterale
   sostituisce il menu che altrimenti servirebbe.

   RAVENNA 2026 e l'unica sezione con il maroon come superficie piena. Il
   maroon e l'accento raro del sistema, e questa e l'edizione speciale: il
   colore marca la rarita invece di descriverla. Usato ovunque, non
   significherebbe piu niente.
   ========================================================================= */

export default function PaginaCollezioni() {
  const voci = collezioni.map((c) => ({ id: c.slug, nome: c.nome }));

  return (
    <>
      <section className="py-[var(--space-section)] lg:py-[var(--space-section-lg)]">
        <Container>
          <Reveal>
            <Eyebrow>Collezioni</Eyebrow>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] tracking-section">
              Cinque linee, una pagina sola
            </h1>
            <p className="mt-8 max-w-[var(--measure)] text-lg text-[var(--ink-muted)]">
              Nessun prezzo e nessun carrello: questa non e ancora una
              vetrina di vendita. Le schede sono gia sagomate per riceverli.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Grid className="items-start">
          <aside className="col-span-4 hidden md:col-span-3 md:block">
            <NavCollezioni voci={voci} />
          </aside>

          <div className="col-span-4 md:col-span-9">
            {collezioni.map((collezione, i) => {
              const speciale = collezione.slug === "ravenna-2026";
              return (
                <section
                  key={collezione.slug}
                  id={collezione.slug}
                  /* scroll-mt: l'intestazione e sticky, e senza questo
                     l'ancora porterebbe il titolo sotto la barra. */
                  className="scroll-mt-32 border-t border-[var(--rule)] py-16 first:border-t-0 first:pt-0 lg:py-24"
                >
                  <Reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                      <div>
                        <p className="font-data text-[0.6875rem] uppercase tracking-data text-[var(--marker)]">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] leading-none tracking-section">
                          {collezione.nome}
                        </h2>
                      </div>
                      <p className="font-display text-base uppercase tracking-sub text-[var(--ink-muted)]">
                        {collezione.sottotitolo}
                      </p>
                    </div>

                    <div className="mt-8 max-w-[var(--measure)] text-lg">
                      {typeof collezione.introduzione === "string" ? (
                        <p>{collezione.introduzione}</p>
                      ) : (
                        <p className="text-[var(--ink-muted)]">
                          <Mancante cosa={collezione.introduzione.daFornire} />
                        </p>
                      )}
                    </div>

                    <div
                      className={
                        speciale
                          ? "mt-10 bg-[var(--accent-brand)] p-4 text-[var(--on-fill)] [--registro-fg:var(--on-fill)] [--rule:color-mix(in_srgb,var(--on-fill)_35%,transparent)] md:p-6"
                          : "mt-10 bg-[var(--card-product-bg)] p-4 md:p-6"
                      }
                    >
                      {collezione.scatto ? (
                        <>
                          <Foto
                            scatto={collezione.scatto}
                            ratio="16 / 9"
                            sizes="(min-width: 768px) 62vw, 100vw"
                            senzaRegistro
                          />
                          <Registro className="mt-5" voci={collezione.registro} />
                        </>
                      ) : (
                        <>
                          <MediaPlaceholder
                            ratio="16 / 9"
                            serve={collezione.mediaServe}
                            className={speciale ? "border-[var(--rule)]" : undefined}
                          />
                          <Registro className="mt-5" voci={collezione.registro} />
                        </>
                      )}
                    </div>

                    {collezione.slug === "technical" && (
                      <div className="mt-8 border-l-2 border-[var(--marker)] py-1 pl-5">
                        <p className="font-display text-sm uppercase tracking-label text-[var(--marker)]">
                          Scheda tecnica
                        </p>
                        <p className="mt-3 max-w-[var(--measure)] text-base text-[var(--ink-muted)]">
                          La struttura della scheda c&apos;e, i valori no. Il
                          modello della pilotina non e stato verificato da
                          fonte esterna e le indicazioni in nostro possesso
                          sono in conflitto fra loro: finche non e accertato,
                          qui non compare nessun numero.
                        </p>
                        <Registro
                          className="mt-4"
                          voci={[
                            { daFornire: "modello e anno della pilotina, con fonte" },
                          ]}
                        />
                      </div>
                    )}
                  </Reveal>
                </section>
              );
            })}
          </div>
        </Grid>
      </Container>

      <div className="h-[var(--space-section)] lg:h-[var(--space-section-lg)]" />
    </>
  );
}
