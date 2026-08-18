import { cn } from "@/lib/utils";

/**
 * Blocco di pagina. `ground` sceglie il fondo.
 *
 * L'alternanza cream/navy non e decorativa: e cio che impedisce alla homepage
 * di leggersi come "prima sito personale, poi negozio". Il navy non segue la
 * storia, la interrompe.
 *
 * "inverse" attiva la classe .on-inverse, che ribalta i token semantici
 * (ink, rule, marker) invece di riscrivere i colori nei figli.
 */
export function Section({
  ground = "cream",
  children,
  className,
  id,
}: {
  ground?: "cream" | "inverse" | "marker";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--space-section)] lg:py-[var(--space-section-lg)]",
        ground === "inverse" && "on-inverse",
        ground === "marker" &&
          "bg-[var(--marker)] text-[var(--on-fill)] [--ink:var(--on-fill)] [--ink-muted:var(--on-fill)] [--rule:color-mix(in_srgb,var(--on-fill)_35%,transparent)] [--registro-fg:var(--on-fill)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
