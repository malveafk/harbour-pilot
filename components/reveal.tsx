"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Comparsa allo scorrimento, livello "sottile": opacita + 12px di traslazione,
 * 350ms, easing in uscita.
 *
 * Volutamente NON c'e parallasse, niente scroll-scrub, niente transizioni di
 * pagina: un'animazione che non trasporta informazione e decorazione, e qui
 * la decorazione e il difetto specifico da evitare.
 *
 * Senza JavaScript il contenuto resta visibile: lo stato nascosto e applicato
 * solo sotto .js (classe messa dallo script inline nel layout, prima del
 * primo paint, quindi senza sfarfallio).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="pending"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
