import type { Metadata } from "next";
import { Container, Grid } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Foto } from "@/components/foto";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Registro } from "@/components/registro";
import { scatti } from "@/lib/immagini";
import { Reveal } from "@/components/reveal";
import { vociJournal } from "@/lib/contenuti";

export const metadata: Metadata = {
  title: "Harbour Journal",
  description:
    "Fotografie, materiale d'archivio e racconti dal porto. Nome provvisorio.",
};

/* ============================================================================
   HARBOUR JOURNAL — nome provvisorio

   Griglia editoriale asimmetrica: una voce dominante e voci minori. Non una
   lista uniforme, che appiattirebbe tutto sullo stesso peso e renderebbe il
   Journal un blog.

   Le voci con fotografia reale portano gia il loro peso; quelle storiche sono
   marcate come esempi di formato e non sono pubblicabili: i fatti sono
   verificabili ma il taglio editoriale non e stato confermato.
   ========================================================================= */

function Copertina({
  voce,
  priorita = false,
}: {
  voce: (typeof vociJournal)[number];
  priorita?: boolean;
}) {
  if (!voce.scatto) {
    return <MediaPlaceholder ratio="3 / 2" serve={voce.mediaServe} />;
  }
  return (
    <Foto
      scatto={voce.scatto}
      ratio="3 / 2"
      priorita={priorita}
      sizes="(min-width: 768px) 46vw, 100vw"
      senzaRegistro
    />
  );
}

export default function PaginaJournal() {
  /* La voce dominante e sempre la prima con una fotografia reale, mai un
     esempio di formato: il posto d'onore non puo andare a qualcosa che poi
     va tolto. Se un giorno le foto reali finiscono in fondo all'elenco, la
     regola regge lo stesso perche non dipende dall'ordine. */
  const principale =
    vociJournal.find((v) => v.scatto && !v.esempioDiFormato) ?? vociJournal[0];
  const altre = vociJournal.filter((v) => v.slug !== principale.slug);

  return (
    <>
      <section className="py-[var(--space-section)] lg:py-[var(--space-section-lg)]">
        <Container>
          <Reveal>
            <Eyebrow>Dal porto</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] tracking-section">
              Harbour Journal
            </h1>
            <p className="mt-8 max-w-[var(--measure)] text-lg text-[var(--ink-muted)]">
              Fotografie fatte durante il lavoro, materiale d&apos;archivio di
              famiglia, documenti. Non un blog: un archivio che si puo
              controllare. Il nome e provvisorio.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container>
        {/* La voce dominante: due terzi di larghezza, per dire che non tutte
            le voci pesano uguale. */}
        <article className="border-t border-[var(--rule)] pt-12">
          <Reveal>
            <Grid className="items-start">
              <div className="col-span-4 md:col-span-8">
                <Copertina voce={principale} priorita />
              </div>
              <div className="col-span-4 md:col-span-4">
                <p className="font-display text-sm uppercase tracking-label text-[var(--marker)]">
                  {principale.occhiello}
                </p>
                <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-sub">
                  {principale.titolo}
                </h2>
                <p className="mt-5 text-base text-[var(--ink-muted)]">
                  {principale.estratto}
                </p>
                {principale.scatto ? (
                  <Registro
                    className="mt-6"
                    voci={scatti[principale.scatto].registro}
                  />
                ) : (
                  <Registro className="mt-6" voci={principale.registro} />
                )}
              </div>
            </Grid>
          </Reveal>
        </article>

        <Grid className="mt-20 gap-y-16">
          {altre.map((voce, i) => (
            <article
              key={voce.slug}
              className="col-span-4 border-t border-[var(--rule)] pt-8 md:col-span-6"
            >
              <Reveal delay={(i % 2) * 80}>
                <Copertina voce={voce} />
                <p className="mt-6 font-display text-sm uppercase tracking-label text-[var(--marker)]">
                  {voce.occhiello}
                </p>
                <h2 className="mt-3 text-xl tracking-sub">{voce.titolo}</h2>
                <p className="mt-4 max-w-[var(--measure)] text-base text-[var(--ink-muted)]">
                  {voce.estratto}
                </p>
                <Registro
                  className="mt-5"
                  voci={voce.scatto ? scatti[voce.scatto].registro : voce.registro}
                />

                {voce.esempioDiFormato && (
                  <p className="mt-5 inline-block bg-[var(--accent-brand)] px-3 py-1.5 font-data text-[0.625rem] uppercase tracking-data text-[var(--on-fill)]">
                    Esempio di formato — non pubblicabile
                  </p>
                )}
              </Reveal>
            </article>
          ))}
        </Grid>
      </Container>

      <div className="h-[var(--space-section)] lg:h-[var(--space-section-lg)]" />
    </>
  );
}
