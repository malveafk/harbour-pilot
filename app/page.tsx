import Link from "next/link";
import { Container, Grid } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Registro, Mancante } from "@/components/registro";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { prodottiInVetrina, vociJournal } from "@/lib/contenuti";

/* ============================================================================
   HOMEPAGE — sette blocchi, nell'ordine deciso dal committente.

   Cio che il layout aggiunge all'ordine e il FONDO di ciascun blocco.
   L'alternanza cream / navy e cio che impedisce alla pagina di leggersi come
   "prima sito personale, poi negozio": il navy non segue la storia, la
   interrompe due volte, e il prodotto sta in mezzo alle due interruzioni.

   01 porto        immagine
   02 claim        navy
   03 il mestiere  cream
   04 prodotto     cream
   05 Stefano      navy
   06 dal porto    cream
   07 capsule      teal
   ========================================================================= */

export default function Home() {
  return (
    <>
      {/* 01 — Il porto. Nessun claim sopra: la prima cosa che si vede e il
          posto, non il marchio. */}
      <section aria-label="Il porto di Ravenna">
        <MediaPlaceholder
          fill
          serve="video o fotografia reale del porto di Ravenna, orizzontale, senza persone in primo piano"
          className="min-h-[calc(100svh-5.5rem)] border-x-0 border-t-0"
        />
      </section>

      {/* 02 — La frase identitaria. Blocco navy pieno, sola tipografia. */}
      <Section ground="inverse">
        <Container>
          <Reveal>
            <p className="font-display text-[clamp(3rem,11vw,9rem)] font-semibold uppercase leading-[0.92] tracking-hero">
              Not Fashion.
              <br />
              Identity.
            </p>
            <Registro
              className="mt-10"
              voci={["Harbour Pilot Originals", "Ravenna", "Est. 2012"]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 03 — Cosa fa un pilota. Il blocco che guadagna il nome del marchio. */}
      <Section>
        <Container>
          <Grid className="items-start">
            <div className="col-span-4 md:col-span-7">
              <Reveal>
                <Eyebrow>Il mestiere</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  Cosa fa un pilota del porto
                </h2>
                <div className="mt-8 max-w-[var(--measure)] space-y-5 text-lg">
                  <p>
                    Il pilota sale a bordo di una nave che non ha mai comandato,
                    in un canale che conosce a memoria, e la porta in banchina.
                    Non e il comandante — il comando resta a bordo — e non e un
                    rimorchiatore.
                  </p>
                  <p>
                    E la persona che conosce quell&apos;acqua: profondita reali,
                    correnti, come il vento prende le sovrastrutture, quanto
                    spazio c&apos;e davvero fra una fiancata e la banchina. Sale
                    con qualsiasi tempo, anche di notte, e scende quando la nave
                    e ferma.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="col-span-4 md:col-span-5">
              <Reveal delay={80}>
                <figure>
                  <MediaPlaceholder
                    ratio="4 / 5"
                    serve="fotografia documentaria del mestiere: salita a bordo dalla biscaglina, o la plancia durante una manovra"
                  />
                  <Registro
                    as="figcaption"
                    className="mt-4"
                    voci={[
                      { daFornire: "luogo" },
                      { daFornire: "data" },
                      { daFornire: "nave" },
                    ]}
                  />
                </figure>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* 04 — Prodotto. Griglia asimmetrica 2 + 1: due capi affiancati e uno a
          piena larghezza, non tre schede uguali. Nessun prezzo: non e ancora
          e-commerce, ma la scheda e gia sagomata per riceverne uno. */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>Collezione</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
              I capi
            </h2>
          </Reveal>

          <Grid className="mt-14">
            {prodottiInVetrina.slice(0, 2).map((prodotto, i) => (
              <article key={prodotto.slug} className="col-span-4 md:col-span-6">
                <Reveal delay={i * 80}>
                  <div className="bg-[var(--card-product-bg)] p-4 md:p-6">
                    <MediaPlaceholder
                      ratio="4 / 5"
                      serve={prodotto.mediaServe}
                      className="border-[var(--card-product-rule)]"
                    />
                  </div>
                  <h3 className="mt-5 text-xl tracking-sub">
                    {typeof prodotto.nome === "string" ? (
                      prodotto.nome
                    ) : (
                      <Mancante cosa={prodotto.nome.daFornire} />
                    )}
                  </h3>
                  <Registro className="mt-3" voci={prodotto.registro} />
                </Reveal>
              </article>
            ))}

            <article className="col-span-4 md:col-span-12">
              <Reveal>
                <div className="bg-[var(--card-product-bg)] p-4 md:p-6">
                  <MediaPlaceholder
                    ratio="21 / 9"
                    serve={prodottiInVetrina[2].mediaServe}
                    className="border-[var(--card-product-rule)]"
                  />
                </div>
                <h3 className="mt-5 text-xl tracking-sub">
                  {typeof prodottiInVetrina[2].nome === "string" ? (
                    prodottiInVetrina[2].nome
                  ) : (
                    <Mancante cosa={prodottiInVetrina[2].nome.daFornire} />
                  )}
                </h3>
                <Registro className="mt-3" voci={prodottiInVetrina[2].registro} />
              </Reveal>
            </article>
          </Grid>
        </Container>
      </Section>

      {/* 05 — Stefano e la famiglia. Seconda interruzione navy, formato ad
          archivio. E la sezione dove "verificabile" deve essere letteralmente
          vero: qui il layer di registro fa il lavoro piu pesante. */}
      <Section ground="inverse">
        <Container>
          <Grid className="items-start">
            <div className="col-span-4 md:col-span-5">
              <Reveal>
                <figure>
                  <MediaPlaceholder
                    ratio="4 / 5"
                    serve="fotografia dall'archivio di famiglia — Stefano al lavoro, oppure una foto storica di famiglia"
                  />
                  <Registro
                    as="figcaption"
                    className="mt-4"
                    voci={[
                      { daFornire: "chi e ritratto" },
                      { daFornire: "anno" },
                      { daFornire: "luogo" },
                    ]}
                  />
                </figure>
              </Reveal>
            </div>

            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <Reveal delay={80}>
                <Eyebrow>2012</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  Stefano Stagnaro
                </h2>
                <div className="mt-8 max-w-[var(--measure)] space-y-5 text-lg">
                  <p>
                    Harbour Pilot nasce nel 2012 da Stefano Stagnaro, pilota del
                    porto di Ravenna, in una famiglia legata al mare.
                  </p>
                  <p className="text-[var(--ink-muted)]">
                    <Mancante cosa="il racconto in prima persona: com'e nato il marchio nel 2012, cosa c'era prima, perche" />
                  </p>
                  <p className="text-[var(--ink-muted)]">
                    <Mancante cosa="i nomi e i ruoli reali della famiglia, con anni e porti, verificabili" />
                  </p>
                </div>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* 06 — Dal porto. Anteprima del Journal: rimanda, non racconta. */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <div>
                <Eyebrow>Dal porto</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  Harbour Journal
                </h2>
              </div>
              <Link
                href="/journal"
                className="font-display text-sm uppercase tracking-label text-[var(--marker)] underline underline-offset-8 transition-opacity duration-[var(--motion-hover)] hover:opacity-70"
              >
                Tutte le voci
              </Link>
            </div>
          </Reveal>

          <Grid className="mt-14">
            {vociJournal.map((voce, i) => (
              <article key={voce.slug} className="col-span-4 md:col-span-4">
                <Reveal delay={i * 80}>
                  <MediaPlaceholder ratio="3 / 2" serve={voce.mediaServe} />
                  <Registro className="mt-4" voci={voce.registro} />
                  <h3 className="mt-3 text-lg tracking-sub">{voce.titolo}</h3>
                  <p className="mt-3 text-base text-[var(--ink-muted)]">
                    {voce.estratto}
                  </p>
                </Reveal>
              </article>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 07 — Le capsule. Unico blocco teal pieno: e l'unico punto della
          homepage con una funzione di navigazione dichiarata, e il colore
          lo segnala. */}
      <Section ground="marker" className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <Grid className="items-end">
              <div className="col-span-4 md:col-span-7">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  Cinque linee,
                  <br />
                  una pagina sola
                </h2>
                <p className="mt-6 max-w-[var(--measure)] text-lg">
                  Originals, Technical, Port Series, Harbour Swallow e
                  l&apos;edizione speciale Ravenna 2026.
                </p>
              </div>
              <div className="col-span-4 md:col-span-4 md:col-start-9">
                <Link
                  href="/collezioni"
                  className="inline-block border border-current px-8 py-4 font-display text-base uppercase tracking-label transition-colors duration-[var(--motion-hover)] hover:bg-[var(--on-fill)] hover:text-[var(--marker)]"
                >
                  Vai alle collezioni
                </Link>
              </div>
            </Grid>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
