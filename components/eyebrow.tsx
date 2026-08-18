import { cn } from "@/lib/utils";

/** Occhiello di sezione. Oswald 500, corpo piccolo, tracking largo:
 *  il tracking scala all'inverso del corpo. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-sm font-medium uppercase tracking-label text-[var(--marker)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
