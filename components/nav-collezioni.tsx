"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

/* Navigazione laterale della pagina Collezioni. Sta ferma mentre il contenuto
   scorre e segnala dove ci si trova: su una pagina unica con cinque sezioni
   lunghe, senza questa si perde l'orientamento e il lettore non sa quante
   linee restano. */
export function NavCollezioni({
  voci,
}: {
  voci: { id: string; nome: string }[];
}) {
  const attiva = useScrollSpy(voci.map((v) => v.id));

  return (
    <nav aria-label="Le collezioni" className="sticky top-32">
      <p className="font-data text-[0.6875rem] uppercase tracking-data text-[var(--ink-muted)]">
        Cinque linee
      </p>
      <ul className="mt-5 space-y-3 border-l border-[var(--rule)]">
        {voci.map((voce) => {
          const corrente = attiva === voce.id;
          return (
            <li key={voce.id}>
              <a
                href={`#${voce.id}`}
                aria-current={corrente ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l-2 pl-4 font-display text-sm uppercase tracking-label transition-colors duration-[var(--motion-hover)]",
                  corrente
                    ? "border-[var(--marker)] text-[var(--marker)]"
                    : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                {voce.nome}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
