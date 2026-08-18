import { cn } from "@/lib/utils";

/**
 * Segnaposto per fotografia o video reale non ancora disponibile.
 *
 * Riserva sempre lo spazio con aspect-ratio: il sito e fatto di immagini
 * grandi e senza spazio riservato ogni caricamento sposterebbe la pagina.
 * Il testo non e generico: dichiara quale materiale serve, cosi il segnaposto
 * funziona da richiesta di fornitura invece che da riempitivo.
 */
export function MediaPlaceholder({
  serve,
  ratio = "16 / 9",
  className,
}: {
  /** Che materiale reale va messo qui. Scritto come richiesta, non come didascalia. */
  serve: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Segnaposto immagine. Materiale da fornire: ${serve}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full items-end border border-[var(--rule)] bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] p-4 md:p-6",
        className,
      )}
    >
      <p className="max-w-prose font-data text-[0.6875rem] uppercase leading-relaxed tracking-data text-[var(--ink-muted)]">
        <span className="text-[var(--marker)]">segnaposto immagine</span>
        <br />
        da fornire: {serve}
      </p>
    </div>
  );
}
