import Link from "next/link";
import { Container } from "@/components/container";
import { LogoPlaceholder } from "@/components/logo-placeholder";

const navigazione = [
  { href: "/collezioni", label: "Collezioni" },
  { href: "/journal", label: "Journal" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--rule)]">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" aria-label="Harbour Pilot, torna alla home">
          <LogoPlaceholder variant="lockup" />
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
