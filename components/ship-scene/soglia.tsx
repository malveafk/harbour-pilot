"use client";

import { forwardRef } from "react";
import { MediaPlaceholder } from "@/components/media-placeholder";

/* ============================================================================
   LA SOGLIA — il quarto checkpoint

   Lo strato che sta sopra il canvas e che a fine scroll prende il posto della
   scena 3D. La sua opacita non e decisa qui: la scrive frame per frame
   `usaDissolvenza` in scena.tsx, leggendo il valore keyframato in Theatre.

   PERCHE E UN FILE A SE. La scelta di chiudere con una fotografia invece che
   proseguendo in 3D dentro il negozio e reversibile: quando ci sara la
   geometria dell'interno, si sostituisce cio che questo componente disegna —
   la scena, la camera e i keyframe restano dove sono. E il punto di sutura
   dichiarato, non una decisione spalmata nella scena.
   ========================================================================= */

export const Soglia = forwardRef<HTMLDivElement>(function Soglia(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      /* Parte invisibile: il primo valore lo scrive il frame successivo. */
      style={{ opacity: 0, pointerEvents: "none" }}
      className="absolute inset-0 z-10"
    >
      <MediaPlaceholder
        fill
        serve="fotografia frontale della vetrina dello store, dalla soglia, ripresa all'altezza degli occhi — e l'immagine su cui la scena 3D si dissolve"
        className="h-full border-0 bg-[var(--ground-inverse)]"
      />
    </div>
  );
});
