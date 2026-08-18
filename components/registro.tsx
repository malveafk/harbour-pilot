import { cn } from "@/lib/utils";

export type VoceRegistro =
  | string
  | {
      /** Cosa manca, scritto come richiesta precisa a chi fornisce i dati. */
      daFornire: string;
    };

/**
 * IL LAYER DI REGISTRO.
 *
 * Il secondo livello tipografico del sito: monospace, maiuscolo, spaziato.
 * Porta i dati concreti di ogni cosa mostrata — data, banchina, nave, tiratura.
 *
 * Non e un ornamento. E il dispositivo che rende visibile "autenticita
 * verificabile" invece di dichiararla a parole: se un blocco non ha metadati
 * reali da mostrare, quel blocco non e pronto per andare online.
 *
 * Le voci mancanti si dichiarano con { daFornire: "..." } e restano visibili
 * a schermo come richieste esplicite. Non vanno riempite con testo inventato.
 */
export function Registro({
  voci,
  className,
  as: Tag = "p",
}: {
  voci: VoceRegistro[];
  className?: string;
  as?: "p" | "div" | "figcaption";
}) {
  return (
    <Tag
      className={cn(
        "font-data text-[0.8125rem] uppercase leading-[1.4] tracking-data text-[var(--registro-fg)]",
        className,
      )}
    >
      {voci.map((voce, i) => (
        <span key={i}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {typeof voce === "string" ? (
            voce
          ) : (
            <span className="underline decoration-dotted underline-offset-4">
              [da fornire: {voce.daFornire}]
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
