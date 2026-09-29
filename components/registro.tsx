import { cn } from "@/lib/utils";

export type VoceRegistro =
  | string
  | {
      /** Cosa manca, scritto come richiesta precisa a chi fornisce i dati. */
      daFornire: string;
    }
  | {
      /** Dato che abbiamo ma che nessuno ha ancora verificato.
       *  NON e la stessa cosa di { daFornire }: li manca l'informazione, qui
       *  manca la prova. Tenerli distinti e il punto — un'attribuzione di
       *  famiglia data per certa e esattamente il modo in cui un archivio
       *  smette di essere verificabile. */
      daConfermare: string;
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
          ) : "daConfermare" in voce ? (
            <span className="underline decoration-dotted underline-offset-4">
              {voce.daConfermare} [da confermare]
            </span>
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

/**
 * Buco dichiarato dentro un testo.
 *
 * Serve a tenere il segnaposto leggibile come richiesta precisa
 * ("[da fornire: quale data]") invece che come riempitivo. Un segnaposto che
 * non dice cosa manca non aiuta nessuno a colmarlo.
 */
export function Mancante({ cosa }: { cosa: string }) {
  return (
    <span className="font-data text-[0.8125em] uppercase tracking-data text-[var(--registro-fg)] underline decoration-dotted underline-offset-4">
      [da fornire: {cosa}]
    </span>
  );
}
