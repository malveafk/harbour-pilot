import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* --------------------------------------------------------------------------
     PIPELINE IMMAGINI

     Il sito e fatto di fotografie grandi: la resa dell'ottimizzatore di
     next/image e il fattore che pesa di piu sul caricamento percepito.

     formats — AVIF per primo, WebP come ripiego. AVIF pesa mediamente il
     30-50% meno di WebP a parita di qualita percepita; il costo e una
     codifica piu lenta alla prima richiesta, ammortizzata dalla cache.

     deviceSizes — i tagli generati per le immagini responsive (quelle con
     `sizes` o `fill`). Nessun taglio oltre 1920: le fotografie del porto
     vanno servite grandi, non enormi, e ogni taglio in piu e tempo di
     codifica e spazio di cache.

     minimumCacheTTL — 30 giorni (2592000s). Gli scatti di prodotto e
     d'archivio non cambiano: rigenerarli piu spesso e lavoro sprecato.
     -------------------------------------------------------------------- */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
