import Link from "next/link";
import { Container, Grid } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Registro, Mancante } from "@/components/registro";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Foto } from "@/components/foto";
import { scatti } from "@/lib/immagini";
import { ScrollJourney } from "@/components/scroll-journey";
import { Reveal } from "@/components/reveal";
import { vociJournal } from "@/lib/contenuti";

/* ============================================================================
   HOMEPAGE — sette blocchi, nell'ordine deciso dal committente.

   Cio che il layout aggiunge all'ordine e il FONDO di ciascun blocco.
   L'alternanza cream / navy e cio che impedisce alla pagina di leggersi come
   "prima sito personale, poi negozio": il navy non segue la storia, la
   interrompe due volte, e il prodotto sta in mezzo alle due interruzioni.

   01 apertura     navy
   02 il mestiere  cream
   03 prodotto     cream
   04 Stefano      navy
   05 dal porto    cream
   06 capsule      teal
   ========================================================================= */

export default function Home() {
  return (
    <>
      {/* 01 — L'apertura: la salita a bordo.

          384 fotogrammi disegnati su un canvas mentre si scorre. La frase
          identitaria non sta all'inizio ma in cima alla salita: prima si fa la
          fatica, poi si ha il diritto di dirla.

          Su telefono e a movimento ridotto non si scarica nessun fotogramma e
          si serve la fotografia vera del pilota sulla biscaglina. */}
      <ScrollJourney />

      {/* 02 — I capi.

          Quattro schede uguali invece della griglia asimmetrica di prima: con
          fotografie vere il capo si guarda, e schede di misura diversa
          suggerirebbero una gerarchia fra i capi che non esiste.

          Le immagini sono piu piccole di prima di proposito. Sono scatti di
          showroom su fondo a fiori, non fotografie di prodotto: ingrandite
          portano dentro la pagina uno sfondo che contraddice tutto il resto.
          Quando arrivano gli scatti veri si puo tornare a farle grandi. */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <div>
                <Eyebrow>Collezione</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  I capi
                </h2>
              </div>
              <Link
                href="/collezioni"
                className="font-display text-sm uppercase tracking-label text-[var(--marker)] underline underline-offset-8 transition-opacity duration-[var(--motion-hover)] hover:opacity-70"
              >
                Tutte le linee
              </Link>
            </div>
          </Reveal>

          <Grid className="mt-14">
            {(
              [
                "soprabitoBlu",
                "cabanBlu",
                "dolcevitaAvorio",
                "girocolloNidoDApe",
              ] as const
            ).map((chiave, i) => (
              <article key={chiave} className="col-span-2 md:col-span-3">
                <Reveal delay={i * 80}>
                  <div className="bg-[var(--card-product-bg)] p-3">
                    <Foto
                      scatto={chiave}
                      ratio="3 / 4"
                      sizes="(min-width: 768px) 22vw, 45vw"
                      senzaRegistro
                    />
                  </div>
                  <Registro className="mt-4" voci={scatti[chiave].registro} />
                </Reveal>
              </article>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 03 — Le capsule.

          Unico blocco teal pieno: e l'unico punto della homepage con una
          funzione di navigazione dichiarata, e il colore lo segnala.

          SUL TESTO. La prima versione diceva "Cinque linee, una pagina sola":
          scritta quando il blocco chiudeva la homepage, suonava come un
          congedo. Spostata a meta pagina faceva credere che il sito finisse
          li. Qui il titolo apre invece di chiudere, e la riga sotto dice
          cosa si trova andando avanti. */}
      <Section ground="marker" className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <Grid className="items-end">
              <div className="col-span-4 md:col-span-7">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
                  Il resto
                  <br />
                  delle linee
                </h2>
                <p className="mt-6 max-w-[var(--measure)] text-lg">
                  Oltre ai capi qui sopra ci sono Originals, Technical, Port
                  Series, Harbour Swallow e l&apos;edizione speciale Ravenna
                  2026. Stanno tutte su una pagina sola.
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
      {/* 04 — Da pilota in pilota.

          PERCHE IL TITOLO NON E "CHI SIAMO". Fra i siti di marchi paragonabili
          nessuno intitola cosi il blocco in homepage: il soggetto e sempre il
          capo, il luogo o il mestiere, mai il fondatore in prima persona. E
          proprio quella formula a produrre la lettura "sito personale prima,
          negozio dopo" che il brief vieta. Qui il soggetto e il mestiere che
          passa di mano.

          L'IDEA PORTANTE DEL BLOCCO. Non la biografia di una persona: la
          storia del marchio, raccontata attraverso le generazioni che stanno
          dietro al nome. Due documenti d'archivio, non due illustrazioni.

          E il punto in cui la tesi del sito si dimostra invece di dichiararsi:
          "autenticita verificabile" qui e letteralmente materiale di famiglia
          con sotto scritto cosa sappiamo e cosa no. Per questo i buchi restano
          a schermo: coprirli con prosa plausibile svuoterebbe il blocco. */}
      <Section ground="inverse">
        <Container>
          <Reveal>
            <Eyebrow>Est. 2012</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-section">
              Da pilota
              <br />
              in pilota
            </h2>
          </Reveal>

          <Grid className="mt-14 items-start">
            {/* UNA fotografia, non due.

                Ne avevo messe due affiancate, ma erano due uomini diversi in
                due momenti diversi, uno dei due nemmeno identificato con
                certezza: messe accanto si contendevano l'attenzione senza
                costruire un confronto. Qui il lavoro non lo fa la quantita di
                immagini, lo fa la riga di dati sotto — che nomina una persona
                vera. Una fotografia con un nome sotto vale piu di due senza. */}
            <div className="col-span-4 md:col-span-5">
              <Reveal>
                <Foto
                  scatto="archivioTimoneria"
                  ratio="4 / 5"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </Reveal>
            </div>

            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <Reveal delay={80}>
                <div className="max-w-[var(--measure)] space-y-4 text-lg">
                  <p>
                    Harbour Pilot nasce nel 2012 da Stefano Stagnaro, pilota del
                    porto di Ravenna, in una famiglia legata al mare da piu
                    generazioni.
                  </p>
                  <p className="text-[var(--ink-muted)]">
                    <Mancante cosa="la storia del marchio in prima persona: perche nel 2012, cosa c'era prima, da quale bisogno concreto e nato il primo capo" />
                  </p>
                  <p className="text-[var(--ink-muted)]">
                    <Mancante cosa="cosa vuol dire Street Heritage detto da voi, non come categoria di settore" />
                  </p>
                  <p className="text-[var(--ink-muted)]">
                    <Mancante cosa="anni e porti delle tre generazioni, verificabili uno per uno" />
                  </p>
                </div>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* 05 — Dal porto. Anteprima del Journal: rimanda, non racconta. */}
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
            {/* Tre, non tutte: la home rimanda al Journal, non lo sostituisce.
               Le altre voci restano in lib/contenuti.ts e vivono su /journal. */}
            {vociJournal.slice(0, 3).map((voce, i) => (
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

    </>
  );
}
