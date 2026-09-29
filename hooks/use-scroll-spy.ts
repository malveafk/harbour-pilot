"use client";

import { useEffect, useState } from "react";

/* ============================================================================
   QUALE SEZIONE STO GUARDANDO

   Serve alla navigazione laterale della pagina Collezioni: mentre si scorre,
   la voce corrispondente alla sezione in vista si accende.

   PERCHE NON SI USA LO SCROLL. La strada ovvia — leggere scrollY e confrontarlo
   con l'offset di ogni sezione — costringe a ricalcolare gli offset a ogni
   ridimensionamento e a ogni immagine che finisce di caricarsi, e sbaglia
   ogni volta che qualcosa sopra cambia altezza. IntersectionObserver osserva
   gli elementi, non la pagina: il browser aggiorna da se quando la geometria
   cambia.

   LA FASCIA DI ATTENZIONE. rootMargin taglia il viewport a una banda
   orizzontale nel terzo superiore. Senza, con sezioni piu alte della finestra
   ne risulterebbero due "visibili" insieme e la voce attiva sfarfallerebbe.
   ========================================================================= */
export function useScrollSpy(ids: string[], fascia = "-12% 0px -72% 0px") {
  const [attiva, setAttiva] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const nodi = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodi.length === 0) return;

    const osservatore = new IntersectionObserver(
      (voci) => {
        /* Puo intersecare piu di una sezione: si prende quella piu in alto,
           cioe quella in cui la lettura sta effettivamente entrando. */
        const dentro = voci
          .filter((v) => v.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (dentro[0]) setAttiva(dentro[0].target.id);
      },
      { rootMargin: fascia, threshold: 0 },
    );

    nodi.forEach((n) => osservatore.observe(n));
    return () => osservatore.disconnect();
  }, [ids, fascia]);

  return attiva;
}
