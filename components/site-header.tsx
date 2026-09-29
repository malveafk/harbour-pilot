"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

const navigazione = [
  { href: "/collezioni", label: "Collezioni" },
  { href: "/journal", label: "Journal" },
];

/* ============================================================================
   L'INTESTAZIONE

   Di norma e una barra cream con un filetto sotto, in flusso come tutto il
   resto. Sopra un blocco a fondo scuro a piena finestra — oggi la scena della
   nave — quella barra spezzerebbe in due l'immagine: allora l'intestazione si
   toglie il fondo e resta la sola tipografia, sospesa sopra la scena.

   Il blocco scuro si dichiara da se con `data-fondo-scuro`; l'intestazione non
   sa niente della nave ne del 3D, guarda solo se un fondo scuro le sta
   passando dietro. Il giorno che un'altra pagina apre con un blocco scuro a
   piena finestra, le basta esporre lo stesso attributo — e annunciarsi con
   l'evento qui sotto, perche un blocco puo comparire dopo l'intestazione:
   la scena 3D, per esempio, si monta solo dopo aver misurato la finestra.
   ========================================================================= */

/* Deve restare allineata all'altezza reale della barra: e la fascia entro cui
   si controlla che cosa sta scorrendo dietro. 5.5rem e la stessa misura gia
   usata in pagina per le altezze a piena finestra. */
const FASCIA = 88;

export const EVENTO_FONDO_SCURO = "harbour:fondo-scuro";

export function SiteHeader() {
  const [sopraFondoScuro, setSopraFondoScuro] = useState(false);

  useEffect(() => {
    let inCoda = false;

    const misura = () => {
      inCoda = false;
      /* Cercato a ogni misura, non una volta sola al montaggio: il blocco
         scuro puo non esistere ancora quando l'intestazione si monta. */
      const scuro = document.querySelector("[data-fondo-scuro]");
      if (!scuro) {
        setSopraFondoScuro(false);
        return;
      }
      const r = scuro.getBoundingClientRect();
      /* Vero finche una porzione del blocco scuro occupa la fascia in cui
         l'intestazione e disegnata. */
      setSopraFondoScuro(r.top < FASCIA && r.bottom > 0);
    };

    /* Il rinvio al frame successivo serve solo allo scroll, che arriva a
       raffica. Le occasioni rare — il montaggio, la comparsa di un blocco
       scuro — misurano subito: se la prima misura dipendesse da un frame, una
       pagina aperta in una scheda in secondo piano (dove il browser non
       programma frame) resterebbe con l'intestazione sbagliata fino al primo
       scorrimento. */
    const allaProssimaOccasione = () => {
      if (inCoda) return;
      inCoda = true;
      requestAnimationFrame(misura);
    };

    misura();
    window.addEventListener("scroll", allaProssimaOccasione, { passive: true });
    window.addEventListener("resize", misura);
    window.addEventListener(EVENTO_FONDO_SCURO, misura);
    return () => {
      window.removeEventListener("scroll", allaProssimaOccasione);
      window.removeEventListener("resize", misura);
      window.removeEventListener(EVENTO_FONDO_SCURO, misura);
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-colors duration-[var(--motion-hover)]",
        sopraFondoScuro
          ? /* on-inverse ribalta i token semantici: e cosi che il progetto
               ottiene il contesto scuro, invece di riscrivere i colori qui. */
            "on-inverse border-transparent bg-transparent"
          : "border-[var(--rule)] bg-[var(--ground)]",
      ].join(" ")}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" aria-label="Harbour Pilot, torna alla home">
          {/* Il marchio cambia variante col fondo: su navy la sola versione
              ammessa e la monocromatica chiara (teal e maroon su navy stanno
              sotto soglia di contrasto). Il nome accessibile e gia sul Link,
              quindi qui il marchio e decorativo. */}
          <span
            /* Sulla home il valore lo scrive la sequenza d'apertura: il
               marchio della testata resta fuori finche quello grande e al
               centro. Altrove la variabile non esiste e vale 1. */
            style={{ opacity: "var(--marchio-testata, 1)" }}
            className="block transition-opacity duration-[var(--motion-hover)]"
          >
            <Logo
              variante={sopraFondoScuro ? "chiaro" : "primario"}
              titolo=""
              className="h-10 w-auto md:h-12"
            />
          </span>
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          <nav aria-label="Principale">
            <ul className="flex items-center gap-6 md:gap-8">
              {navigazione.map((voce) => (
                <li key={voce.href}>
                  <Link
                    href={voce.href}
                    className="font-display text-sm font-medium uppercase tracking-label text-[var(--nav-fg)] transition-colors duration-[var(--motion-hover)] hover:text-[var(--nav-fg-active)]"
                  >
                    {voce.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="hidden font-data text-[0.6875rem] uppercase tracking-data text-[var(--ink-muted)] lg:block">
            Ravenna · Est. 2012
          </p>
        </div>
      </Container>
    </header>
  );
}
