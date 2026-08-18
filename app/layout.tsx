import type { Metadata } from "next";
import { Oswald, Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* I tre ruoli tipografici della direzione di design.
   Display: Oswald, solo maiuscolo, per titoli ed elementi identitari.
   Testo:   Barlow, sorella non condensed di Barlow Condensed. Oswald da solo
            non regge i paragrafi (condensed, aperture strette).
   Registro: IBM Plex Mono, il layer dei metadati verificabili. */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Harbour Pilot — Originals",
    template: "%s · Harbour Pilot",
  },
  description:
    "Abbigliamento nato nel porto di Ravenna. Workwear portuale reale, heritage marittimo, dal 2012.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${oswald.variable} ${barlow.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-data focus:text-xs focus:uppercase focus:tracking-label focus:text-on-fill"
        >
          Salta al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
