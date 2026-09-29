import Image from "next/image";
import { Registro } from "@/components/registro";
import { scatti, type ChiaveScatto } from "@/lib/immagini";
import { cn } from "@/lib/utils";

/* ============================================================================
   UNA FOTOGRAFIA DELL'ARCHIVIO, CON IL SUO REGISTRO

   Immagine e didascalia non si separano mai: e il patto del sito. Una
   fotografia senza i suoi dati e un'illustrazione; con i dati e un documento.
   Tenerle in un componente solo impedisce che qualcuno, un giorno, metta la
   prima senza la seconda.
   ========================================================================= */

export function Foto({
  scatto,
  ratio = "3 / 2",
  priorita = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
  senzaRegistro = false,
}: {
  scatto: ChiaveScatto;
  ratio?: string;
  priorita?: boolean;
  sizes?: string;
  className?: string;
  senzaRegistro?: boolean;
}) {
  const s = scatti[scatto];
  /* `satisfies` conserva il tipo letterale di ogni voce, quindi le voci senza
     `archivio` non hanno proprio quella proprieta: va controllata, non letta. */
  const eArchivio = "archivio" in s && s.archivio === true;

  return (
    <figure className={className}>
      <div
        style={{ aspectRatio: ratio }}
        className="relative overflow-hidden bg-[color-mix(in_srgb,var(--ink)_8%,transparent)]"
      >
        <Image
          src={s.file}
          alt={s.alt}
          fill
          priority={priorita}
          placeholder="blur"
          sizes={sizes}
          className={cn(
            "object-cover",
            /* Il materiale storico non viene ritoccato per "sembrare" d'epoca:
               e gia d'epoca. Ma il viraggio originale e molto caldo e su fondo
               cream si impasta, quindi gli si da un filo di contrasto in piu
               per staccarlo dalla pagina. */
            eArchivio && "contrast-[1.08] saturate-[0.92]",
          )}
        />
      </div>
      {!senzaRegistro && (
        <Registro as="figcaption" className="mt-4" voci={s.registro} />
      )}
    </figure>
  );
}
