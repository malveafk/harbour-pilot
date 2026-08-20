"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { EVENTO_FONDO_SCURO } from "@/components/site-header";
import { Soglia } from "./ship-scene/soglia";

/* ============================================================================
   L'INGRESSO DELLA SCENA 3D

   Questo file e leggero di proposito: e cio che finisce nel bundle della
   homepage. Tutto il peso vero — three, r3f, drei, il modello — sta dietro
   l'import dinamico qui sotto e viene scaricato solo se la scena serve
   davvero.

   NOTA SU next/dynamic. La richiesta era di importare la scena con ssr:false
   "nella page che la usa". In Next 16 non e possibile: `ssr: false` e vietato
   dentro un Server Component, e app/page.tsx lo e. Il confine client va messo
   da qualche parte, ed e questo file: page.tsx importa <ShipScrollScene />
   come un componente qualsiasi, e l'ssr:false vive dove e legale.
   ========================================================================= */

const Scena = dynamic(() => import("./ship-scene/scena"), {
  ssr: false,
  loading: () => null,
});

/* Quattro schermate di scorrimento per quattro checkpoint. Alzarlo rallenta
   il volo (piu scroll per lo stesso tratto), abbassarlo lo accelera. */
const SCHERMATE = 5;

/* --------------------------------------------------------------------------
   IL FALLBACK
   Sotto i 768px e a movimento ridotto la scena non viene nemmeno scaricata.
   Non e solo una questione di frame rate: e rete e batteria: il GLB da solo
   pesa circa 19 MB.

   `video` e il gancio gia predisposto — il giorno che esiste il rendering
   pre-calcolato della stessa camera, si passa la sorgente e questo componente
   smette di essere un'immagine ferma senza toccare altro.
   ----------------------------------------------------------------------- */
function HeroStatico({ video }: { video?: { src: string; poster: string } }) {
  if (video) {
    return (
      <video
        className="h-[calc(100svh-5.5rem)] w-full object-cover"
        src={video.src}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="La nave entra nel porto di Ravenna"
      />
    );
  }

  return (
    <MediaPlaceholder
      fill
      serve="fermo immagine della nave che entra in porto — e cio che vede chi sta su telefono o ha chiesto meno movimento, quindi deve reggere da sola, senza il volo"
      className="min-h-[calc(100svh-5.5rem)] border-x-0 border-t-0"
    />
  );
}

export function ShipScrollScene() {
  const contenitore = useRef<HTMLDivElement>(null);
  const stratoSoglia = useRef<HTMLDivElement>(null);

  /* Si parte SEMPRE dal fallback, anche su desktop. Due ragioni: e cio che il
     server prerenderizza, quindi non c'e divergenza di idratazione; ed e cio
     che resta a schermo se il JavaScript non arriva mai. La scena 3D e un
     miglioramento che si innesta dopo, non il pavimento. */
  const [scenaAmmessa, setScenaAmmessa] = useState(false);

  useEffect(() => {
    const grande = window.matchMedia("(min-width: 768px)");
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decidi = () => setScenaAmmessa(grande.matches && !calmo.matches);
    decidi();

    grande.addEventListener("change", decidi);
    calmo.addEventListener("change", decidi);
    return () => {
      grande.removeEventListener("change", decidi);
      calmo.removeEventListener("change", decidi);
    };
  }, []);

  /* La scena compare o sparisce dopo che l'intestazione si e gia montata:
     glielo diciamo, cosi puo rimisurare che cosa le sta passando dietro. */
  useEffect(() => {
    window.dispatchEvent(new Event(EVENTO_FONDO_SCURO));
  }, [scenaAmmessa]);

  if (!scenaAmmessa) {
    return (
      <section aria-label="Il porto di Ravenna">
        <HeroStatico />
      </section>
    );
  }

  return (
    <section
      ref={contenitore}
      aria-label="Il porto di Ravenna"
      /* Il contenitore alto e cio che da corsa allo scroll; il figlio sticky e
         cio che tiene la scena ferma davanti agli occhi mentre quella corsa
         viene consumata. Nessun listener che blocca lo scroll: finita la
         corsa, la pagina prosegue da sola nel blocco successivo. */
      style={{ height: `${SCHERMATE * 100}svh` }}
      /* Il margine negativo tira la scena sotto l'intestazione, che e sticky e
         trasparente sopra un fondo scuro: la nave parte dal bordo alto della
         finestra e la barra ci galleggia sopra, invece di tagliarla con una
         fascia cream. Vale solo per il ramo 3D — nel fallback l'intestazione
         resta la barra normale, perche il segnaposto e chiaro. */
      className="relative -mt-[5.5rem]"
    >
      <div
        data-fondo-scuro
        className="sticky top-0 h-svh overflow-hidden bg-[var(--ground-inverse)]"
      >
        <Scena contenitore={contenitore} stratoSoglia={stratoSoglia} />
        <Soglia ref={stratoSoglia} />
      </div>
    </section>
  );
}
