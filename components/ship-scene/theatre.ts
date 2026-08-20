"use client";

import { getProject, types, val } from "@theatre/core";
import statoCamera from "./stato-camera.json";

/* ============================================================================
   IL PONTE FRA THEATRE.JS E LA SCENA

   Theatre.js qui fa una cosa sola: tenere i keyframe. Non muove niente da se.
   La sequenza non "va avanti nel tempo" — la sua testina di lettura viene
   posizionata a mano a ogni frame in funzione di quanto si e scrollato
   (vedi `usaSequenzaDalloScroll`). Scrollare all'indietro riavvolge.

   PERCHE NON @theatre/r3f. Il pacchetto e fermo a maggio 2024 e dichiara
   `@react-three/fiber: ^8.13.6`, che a sua volta vuole React < 19: questo
   progetto e su React 19, quindi npm rifiuta l'installazione. Non e un
   capriccio del range: il bundle di @theatre/r3f entra negli interni privati
   di r3f (`__r3f`, `_roots`, `react-reconciler`) che sono proprio le parti
   riscritte nel passaggio a r3f 9 / React 19. Forzarlo con --legacy-peer-deps
   comprerebbe un errore a runtime al posto di un errore in installazione.

   Cio che @theatre/r3f avrebbe dato in piu e il gizmo trascinabile dentro la
   vista 3D. Cio che resta — ed e il grosso — e lo Studio: pannello dei valori,
   timeline, keyframe, curve di easing, esportazione dello stato. Il legame fra
   i valori e la camera sono le venti righe di `usaCameraDaTheatre`.
   ========================================================================= */

/* Lo stato salvato e sempre passato, anche in sviluppo: senza, @theatre/core
   avverte che il progetto parte vuoto.

   IL TRANELLO, verificato sul campo. Quando lo Studio e caricato, tiene una
   PROPRIA copia dello stato in localStorage (chiave "theatre-0.4.persistent")
   e quella copia vince sul file. Conseguenza: modificare stato-camera.json a
   mano non si vede in sviluppo — la pagina continua a mostrare i keyframe che
   lo Studio ha in memoria, e sembra che il file venga ignorato.

   Il giro completo e:
     1. autori i keyframe nello Studio;
     2. dal menu del progetto, "Export" -> scarichi il JSON;
     3. sostituisci stato-camera.json e committi.
   E per rileggere il file dopo averlo cambiato a mano:
     localStorage.removeItem("theatre-0.4.persistent") e ricarichi. */
const progetto = getProject("Harbour Pilot", { state: statoCamera });

export const foglio = progetto.sheet("Scena");

/* I nomi degli oggetti e delle proprieta devono combaciare con le chiavi di
   stato-camera.json: e cosi che i keyframe salvati trovano casa. */
export const oggettoCamera = foglio.object("Camera", {
  position: { x: types.number(0), y: types.number(0), z: types.number(0) },
  /* Un punto guardato, non una rotazione in radianti: authoring molto piu
     leggibile — "guarda la prua" invece di tre angoli di Eulero da indovinare. */
  sguardo: { x: types.number(0), y: types.number(0), z: types.number(0) },
  fov: types.number(50, { range: [10, 120] }),
});

/* La dissolvenza verso la fotografia e un valore keyframato come gli altri:
   il momento del passaggio si sposta nella timeline, non nel codice. */
export const oggettoSoglia = foglio.object("Soglia", {
  dissolvenza: types.number(0, { range: [0, 1] }),
});

export const lunghezzaSequenza = () => val(foglio.sequence.pointer.length);

/* ---------------------------------------------------------------------------
   LO STUDIO — SOLO IN SVILUPPO

   Il confronto con "development" e volutamente la prima riga: in build
   `process.env.NODE_ENV` diventa la costante "production", la condizione e
   falsa staticamente e il bundler elimina tutto cio che segue. L'`import()`
   dinamico sparisce con lei, quindi il chunk di @theatre/studio (circa 700 kB
   non minificati) non viene mai emesso, non solo mai eseguito.

   Un `if (NODE_ENV === "development") { ... }` che avvolge un import STATICO
   in cima al file non otterrebbe lo stesso: l'import statico entra nel grafo
   dei moduli comunque.
   ------------------------------------------------------------------------ */
export function avviaStudio() {
  if (process.env.NODE_ENV !== "development") return;

  void import("@theatre/studio").then(({ default: studio }) => {
    studio.initialize();
  });
}
