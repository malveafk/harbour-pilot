import { cn } from "@/lib/utils";

/**
 * SEGNAPOSTO DEL LOGO — deliberatamente NON un logo.
 *
 * Il brief chiedeva di generare un segnaposto visivo con la skill `design`.
 * Non e stato fatto, di proposito: un marchio generato dall'AI, anche marcato
 * "provvisorio", tende a sopravvivere e finire in uso, e il vincolo di brand
 * dice che il marchio non si ridisegna ne si reinterpreta.
 *
 * Questo componente occupa l'ingombro corretto e usa i colori corretti, ma
 * dichiara a schermo di essere un buco in attesa dei vettoriali reali del
 * nuovo "HP Original". Va sostituito, non completato.
 */
export function LogoPlaceholder({
  variant = "badge",
  className,
}: {
  variant?: "badge" | "lockup";
  className?: string;
}) {
  if (variant === "lockup") {
    return (
      <span
        className={cn(
          "inline-flex flex-col justify-center border border-[var(--logo-ph-border)] px-3 py-1.5 leading-none",
          className,
        )}
      >
        <span className="font-data text-[0.5625rem] uppercase tracking-data text-[var(--marker)]">
          segnaposto
        </span>
        <span className="mt-1 font-display text-base font-semibold uppercase tracking-sub text-[var(--ink)]">
          Harbour Pilot
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex aspect-square w-full max-w-64 flex-col items-center justify-center gap-3 border border-[var(--logo-ph-border)] p-6 text-center",
        className,
      )}
    >
      <span className="font-display text-lg font-semibold uppercase tracking-sub text-[var(--ink)]">
        Harbour Pilot
        <br />
        Originals
      </span>
      <span className="font-data text-[0.625rem] uppercase leading-relaxed tracking-data text-[var(--marker)]">
        Segnaposto
        <br />
        vettoriale da fornire
      </span>
    </span>
  );
}
