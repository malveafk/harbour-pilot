import Link from "next/link";
import { Container, Grid } from "@/components/container";
import { LogoPlaceholder } from "@/components/logo-placeholder";
import { Registro } from "@/components/registro";

export function SiteFooter() {
  return (
    <footer className="on-inverse">
      <Container className="py-[var(--space-section)]">
        <Grid>
          <div className="col-span-4 md:col-span-4">
            <LogoPlaceholder className="max-w-52" />
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-6">
            <h2 className="font-display text-base font-medium uppercase tracking-sub">
              Naviga
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/collezioni", label: "Collezioni" },
                { href: "/journal", label: "Harbour Journal" },
              ].map((voce) => (
                <li key={voce.href}>
                  <Link
                    href={voce.href}
                    className="font-display text-sm uppercase tracking-label transition-colors duration-[var(--motion-hover)] hover:text-[var(--marker)]"
                  >
                    {voce.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <h2 className="font-display text-base font-medium uppercase tracking-sub">
              Contatti
            </h2>
            <Registro
              className="mt-5"
              voci={[{ daFornire: "indirizzo email di contatto" }]}
            />
            <Registro
              className="mt-3"
              voci={[{ daFornire: "profili social attivi" }]}
            />
          </div>
        </Grid>

        <div className="mt-16 border-t border-[var(--rule)] pt-6">
          <Registro
            voci={[
              "Harbour Pilot Originals",
              "Ravenna",
              "Est. 2012",
              { daFornire: "ragione sociale e partita IVA" },
            ]}
          />
          <p className="mt-4 font-data text-[0.6875rem] uppercase tracking-data text-[var(--marker)]">
            Bozza esplorativa — contenuti e immagini sono segnaposto, nessun
            testo in questa pagina e definitivo
          </p>
        </div>
      </Container>
    </footer>
  );
}
