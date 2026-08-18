import { cn } from "@/lib/utils";

/** Contenitore della griglia editoriale: 12 colonne, gutter da token,
 *  larghezza massima 1440px. Le immagini a tutta larghezza escono da qui
 *  di proposito: e il contrasto pieno/vuoto a fare il ritmo. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--grid-max)] px-4 md:px-[var(--gutter)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Griglia a 12 colonne. Divisioni ammesse: 8/4 e 7/5.
 *  La divisione 6/6 e esclusa per scelta: legge come sito aziendale. */
export function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-12 md:gap-x-[var(--gutter)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
