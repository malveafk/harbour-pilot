"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
import { scatti } from "@/lib/immagini";

/* ============================================================================
   L'APERTURA — LA SALITA A BORDO

   384 fotogrammi disegnati su un canvas mentre si scorre. Non e un video con
   il tempo agganciato allo scroll: e una sequenza di immagini, e a ogni
   posizione corrisponde un fotogramma preciso.

   PERCHE I FOTOGRAMMI E NON UN <video>. Scrubbare un video spostando
   currentTime dipende dai keyframe della codifica: se sono radi, il browser
   deve decodificare all'indietro e lo scorrimento singhiozza — su Safari in
   modo vistoso. Con i fotogrammi ogni posizione e un disegno diretto, e la
   fluidita non dipende piu dal codec.

   Il prezzo e il peso: 384 file WebP, 9 MB. E per questo che sotto i 768px e
   a movimento ridotto non si scarica niente e si mostra un fermo immagine.
   ========================================================================= */

const FOTOGRAMMI = 288;
/* La corsa. Allungarla rallenta la manovra senza ritoccare i fotogrammi.
   Da sola pero renderebbe il movimento piu scattoso, non piu lento: e per
   questo che va insieme alla dissolvenza in `disegna`. */
const SCHERMATE = 8;

/* Quanto il disegno insegue lo scorrimento. Senza, la sequenza segue gli
   scatti della rotella; con un valore troppo basso resta indietro. */
const REATTIVITA = 7;

const percorso = (n: number) =>
  `/journey/f_${String(n).padStart(3, "0")}.webp`;

/* --------------------------------------------------------------------------
   LA FIRMA

   Durante la manovra non compare nessun testo: la ripresa deve reggere da
   sola. L'unica scritta arriva alla fine, sul canale, insieme al marchio.
   ----------------------------------------------------------------------- */
/* Dove finisce la firma d'apertura. Oltre questa frazione di corsa il marchio
   al centro e sparito e resta solo la ripresa. */
const FINE_APERTURA = 0.05;

export function ScrollJourney() {
  const sezione = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const testi = useRef<(HTMLDivElement | null)[]>([]);
  const immagini = useRef<HTMLImageElement[]>([]);

  const [ammesso, setAmmesso] = useState(false);
  const [caricati, setCaricati] = useState(0);
  const [pronto, setPronto] = useState(false);

  /* Si parte sempre dal fermo immagine: e cio che il server prerenderizza e
     cio che resta se il JavaScript non arriva. La sequenza e un miglioramento
     che si innesta dopo, non il pavimento. */
  useEffect(() => {
    const grande = window.matchMedia("(min-width: 768px)");
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decidi = () => setAmmesso(grande.matches && !calmo.matches);
    decidi();
    grande.addEventListener("change", decidi);
    calmo.addEventListener("change", decidi);
    return () => {
      grande.removeEventListener("change", decidi);
      calmo.removeEventListener("change", decidi);
    };
  }, []);

  /* Precaricamento. Si aspetta l'intera sequenza prima di mostrarla: se si
     cominciasse a meta, scorrendo veloce si arriverebbe a un fotogramma non
     ancora scaricato e la scena si fermerebbe di colpo. */
  useEffect(() => {
    if (!ammesso) return;
    let vivo = true;
    let fatti = 0;
    const lista: HTMLImageElement[] = [];

    for (let i = 1; i <= FOTOGRAMMI; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = percorso(i);
      const segna = () => {
        if (!vivo) return;
        fatti += 1;
        setCaricati(fatti);
        if (fatti === FOTOGRAMMI) setPronto(true);
      };
      img.onload = segna;
      img.onerror = segna;
      lista[i - 1] = img;
    }
    immagini.current = lista;

    return () => {
      vivo = false;
    };
  }, [ammesso]);

  /* Disegno e testi, un frame alla volta. */
  useEffect(() => {
    if (!ammesso || !pronto) return;
    const c = canvas.current;
    const ctx = c?.getContext("2d", { alpha: false });
    if (!c || !ctx) return;

    let corrente = 0;
    let animazione = 0;
    let ultimoDisegnato = -1;
    let ultimoVelo = -1;

    /* Il canvas va dimensionato a mano: se la pagina si carica mentre non e
       visibile, il contenitore misura zero e resterebbe alla taglia di
       default. Stessa trappola gia vista con la scena 3D. */
    const dimensiona = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const l = c.clientWidth || window.innerWidth;
      const h = c.clientHeight || window.innerHeight;
      if (l === 0 || h === 0) return;
      c.width = Math.round(l * dpr);
      c.height = Math.round(h * dpr);
      ultimoDisegnato = -1;
    };

    /* I fotogrammi sono 16:9, la finestra quasi mai: si riempie il quadro e si
       taglia il resto, come farebbe object-fit: cover. */
    const disegnaUno = (n: number) => {
      const img = immagini.current[n];
      if (!img || !img.naturalWidth) return;
      const sc = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const l = img.naturalWidth * sc;
      const h = img.naturalHeight * sc;
      ctx.drawImage(img, (c.width - l) / 2, (c.height - h) / 2, l, h);
    };

    /* PERCHE DUE DISEGNI E NON UNO.
       Agganciare il fotogramma intero piu vicino fa avanzare la sequenza a
       scatti, e lo scatto si vede tanto di piu quanto piu si scorre piano —
       cioe proprio quando si vorrebbe la resa migliore. Qui si disegna il
       fotogramma precedente e sopra il successivo, con l'opacita pari alla
       parte decimale della posizione: fra due fotogrammi il quadro non salta,
       si trasforma. Costa una seconda drawImage e niente altro, e slega la
       fluidita dal numero di fotogrammi. */
    const disegna = (pos: number) => {
      const a = Math.floor(pos);
      const t = pos - a;
      disegnaUno(a);
      if (t > 0.01 && a + 1 < FOTOGRAMMI) {
        ctx.globalAlpha = t;
        disegnaUno(a + 1);
        ctx.globalAlpha = 1;
      }
    };

    const passo = () => {
      const el = sezione.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const corsa = r.height - window.innerHeight;
      const bersaglio =
        corsa <= 0 ? 0 : Math.min(Math.max(-r.top / corsa, 0), 1);

      corrente += (bersaglio - corrente) * (1 - Math.exp(-REATTIVITA / 60));

      /* PERCHE UNA CURVA E NON UNA PROPORZIONE DIRETTA.
         I primi fotogrammi sono la nave vista da lontano: cambiano pochissimo
         l'uno dall'altro. Con una mappatura lineare la prima schermata di
         scorrimento ne consumava una trentina su 384, e il risultato era una
         fotografia ferma. L'esponente sotto l'uno fa correre l'avvicinamento e
         lascia la lentezza dove succede qualcosa. */
      const avanzamento = Math.pow(corrente, 0.75);

      const pos = Math.min(
        FOTOGRAMMI - 1,
        Math.max(0, avanzamento * (FOTOGRAMMI - 1)),
      );
      if (Math.abs(pos - ultimoDisegnato) > 0.01) {
        disegna(pos);
        ultimoDisegnato = pos;
      }

      /* La firma d'apertura: piena all'inizio, sparita dopo una frazione di
         schermata. L'opacita si scrive direttamente sul nodo — passare da
         useState a 60 fotogrammi al secondo rirenderizzerebbe l'albero React
         sessanta volte per cambiare un numero. */
      const velo = Math.max(0, 1 - corrente / FINE_APERTURA);
      const nodo = testi.current[0];
      if (nodo) nodo.style.opacity = String(velo);

      /* E il marchio della testata fa il contrario: sta nascosto finche quello
         grande e in campo, poi prende il suo posto. Due marchi sulla stessa
         schermata si annullerebbero a vicenda. */
      if (velo !== ultimoVelo) {
        document.documentElement.style.setProperty(
          "--marchio-testata",
          String(1 - velo),
        );
        ultimoVelo = velo;
      }

      animazione = requestAnimationFrame(passo);
    };

    dimensiona();
    animazione = requestAnimationFrame(passo);
    window.addEventListener("resize", dimensiona);
    return () => {
      cancelAnimationFrame(animazione);
      window.removeEventListener("resize", dimensiona);
      document.documentElement.style.removeProperty("--marchio-testata");
    };
  }, [ammesso, pronto]);

  /* --- Il fermo immagine: telefono, movimento ridotto, niente JavaScript --- */
  if (!ammesso) {
    return (
      <section
        aria-label="Salire a bordo"
        data-fondo-scuro
        className="on-inverse relative -mt-[5.5rem] min-h-svh"
      >
        <Image
          src={scatti.pruaAlTramonto.file}
          alt={scatti.pruaAlTramonto.alt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ground-inverse)] via-transparent to-[color-mix(in_srgb,var(--ground-inverse)_70%,transparent)]" />
        <Container className="relative flex min-h-svh flex-col justify-end pb-16 pt-[5.5rem]">
          <Logo variante="chiaro" className="w-32 sm:w-40" />
          <p className="mt-7 font-display text-[clamp(2rem,9vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-hero">
            Harbour-made.
            <br />
            Street-worn.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sezione}
      aria-label="Salire a bordo"
      style={{ height: `${SCHERMATE * 100}svh` }}
      className="relative -mt-[5.5rem]"
    >
      <div
        data-fondo-scuro
        className="on-inverse sticky top-0 h-svh overflow-hidden bg-[var(--ground-inverse)]"
      >
        <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />

        {/* Descrizione testuale della sequenza: il canvas e decorativo per un
            lettore di schermo, e senza questa il blocco sarebbe muto. */}
        <p className="sr-only">
          Sequenza filmata in tre riprese: una pilotina si accosta alla fiancata
          di una nave da carico al tramonto, dove pende una biscaglina; dal ponte
          della pilotina un pilota si aggrappa alla scaletta e la ripresa lo
          supera salendo; la camera prosegue da sola lungo la lamiera, scavalca
          il parapetto e si apre sulla coperta e sul canale del porto illuminato.
        </p>

        {!pronto && (
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-12">
              <p className="font-data text-[0.6875rem] uppercase tracking-data text-[var(--ink-muted)]">
                {Math.round((caricati / FOTOGRAMMI) * 100)}% · sequenza in
                caricamento
              </p>
            </Container>
          </div>
        )}

        {/* I tre testi. L'opacita la scrive il ciclo di disegno direttamente
            sul nodo: passare da useState a 60 fotogrammi al secondo
            rirenderizzerebbe l'albero React sessanta volte per cambiare un
            numero. */}
        {/* La firma. L'opacita la scrive il ciclo di disegno direttamente sul
            nodo: passare da useState a 60 fotogrammi al secondo
            rirenderizzerebbe l'albero React sessanta volte per cambiare un
            numero. */}
        <div className="pointer-events-none absolute inset-0">
          <div
            ref={(n) => {
              testi.current[0] = n;
            }}
            className="flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <Logo variante="chiaro" className="w-40 lg:w-56" titolo="" />
            <p className="mt-8 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-semibold uppercase leading-[1] tracking-hero">
              Harbour-made.
              <br />
              Street-worn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
