import type { VoceRegistro } from "@/components/registro";

/* ============================================================================
   CONTENUTI
   Nessun CMS in questa fase: i contenuti stanno qui, tipizzati.

   I tipi sono gia sagomati su "prodotto -> varianti -> media" perche l'innesto
   di un e-commerce futuro (Shopify o headless) sia un adattatore e non una
   riscrittura. Nessun e-commerce viene costruito ora: `prezzo` e `varianti`
   restano volutamente vuoti.

   REGOLA: niente contenuti inventati. Cio che non e stato fornito si dichiara
   con { daFornire: "..." } e resta visibile a schermo come richiesta.
   ========================================================================= */

export type SlugCollezione =
  | "originals"
  | "technical"
  | "port-series"
  | "harbour-swallow"
  | "ravenna-2026";

export type Collezione = {
  slug: SlugCollezione;
  nome: string;
  sottotitolo: string;
  /** Testo introduttivo, oppure la richiesta di fornirlo. */
  introduzione: string | { daFornire: string };
  registro: VoceRegistro[];
  /** Materiale fotografico che serve per questa sezione. */
  mediaServe: string;
};

export type Prodotto = {
  slug: string;
  nome: string | { daFornire: string };
  collezione: SlugCollezione;
  mediaServe: string;
  registro: VoceRegistro[];
  /** Fase vetrina: nessun prezzo, nessuna variante, nessun carrello. */
  prezzo: null;
  varianti: never[];
};

export const collezioni: Collezione[] = [
  {
    slug: "originals",
    nome: "Originals / Heritage",
    sottotitolo: "Il nucleo del marchio",
    introduzione: { daFornire: "cosa distingue la linea Originals dalle altre" },
    registro: ["Linea continuativa", "Dal 2012"],
    mediaServe: "scatto prodotto della linea Originals su fondo neutro",
  },
  {
    slug: "technical",
    nome: "Technical",
    sottotitolo: "Nelson Pilot",
    introduzione: {
      daFornire:
        "cosa rende tecnica questa linea, e i dati reali della pilotina",
    },
    registro: [
      "Serie tecnica",
      { daFornire: "modello esatto della pilotina — Nelson Pilot 38 o 40, da verificare" },
    ],
    mediaServe: "fotografia della pilotina in servizio, con data e luogo",
  },
  {
    slug: "port-series",
    nome: "Port Series",
    sottotitolo: "I porti, uno per uno",
    introduzione: { daFornire: "quali porti compongono la serie e con che criterio" },
    registro: ["Serie a porti", { daFornire: "elenco dei porti gia usciti" }],
    mediaServe: "scatto ambientato in banchina, con nome del porto e data",
  },
  {
    slug: "harbour-swallow",
    nome: "Harbour Swallow",
    sottotitolo: "Capsule",
    introduzione: { daFornire: "origine del nome e cosa comprende la capsule" },
    registro: ["Capsule", { daFornire: "periodo di uscita" }],
    mediaServe: "scatto prodotto della capsule Harbour Swallow",
  },
  {
    slug: "ravenna-2026",
    nome: "Ravenna 2026",
    sottotitolo: "Edizione speciale",
    introduzione: { daFornire: "occasione e contenuto dell'edizione speciale" },
    registro: [
      "Edizione speciale",
      "Ravenna",
      "2026",
      { daFornire: "tiratura" },
    ],
    mediaServe: "scatto dell'edizione speciale Ravenna 2026",
  },
];

/** Selezione mostrata in homepage. Nessun nome inventato: i nomi reali dei
 *  capi non sono stati forniti. */
export const prodottiInVetrina: Prodotto[] = [
  {
    slug: "vetrina-1",
    nome: { daFornire: "nome del capo principale della collezione" },
    collezione: "originals",
    mediaServe: "scatto principale del capo, fondo neutro freddo",
    registro: [{ daFornire: "materiale e grammatura" }, "Originals"],
    prezzo: null,
    varianti: [],
  },
  {
    slug: "vetrina-2",
    nome: { daFornire: "nome del secondo capo" },
    collezione: "port-series",
    mediaServe: "scatto del secondo capo, stessa luce del primo",
    registro: [{ daFornire: "materiale e grammatura" }, "Port Series"],
    prezzo: null,
    varianti: [],
  },
  {
    slug: "vetrina-3",
    nome: { daFornire: "nome del capo in evidenza" },
    collezione: "technical",
    mediaServe:
      "scatto ambientato del capo in evidenza, indossato in banchina o a bordo",
    registro: [{ daFornire: "materiale e grammatura" }, "Technical"],
    prezzo: null,
    varianti: [],
  },
];

export type VoceJournal = {
  slug: string;
  titolo: string;
  occhiello: string;
  estratto: string;
  registro: VoceRegistro[];
  mediaServe: string;
  /** true = contenuto usato solo per mostrare il formato, non pubblicabile. */
  esempioDiFormato: boolean;
};

/* Le tre voci qui sotto servono a far vedere come si comporta il layout con un
   testo storico vero. NON sono contenuti approvati per la pubblicazione: i
   fatti storici sono verificabili, ma la scelta di raccontarli e il taglio
   editoriale non sono stati confermati. */
export const vociJournal: VoceJournal[] = [
  {
    slug: "piroscafo-grazia",
    titolo: "Il piroscafo Grazia",
    occhiello: "Archivio",
    estratto:
      "Affondato nel 1939 al largo dell'Inghilterra. Esempio di formato per una scheda d'archivio: un fatto, una data, un luogo, e il documento che lo prova.",
    registro: ["1939", "Al largo dell'Inghilterra", "Esempio di formato"],
    mediaServe:
      "documento o fotografia d'archivio relativa al piroscafo, con fonte",
    esempioDiFormato: true,
  },
  {
    slug: "rex-conte-di-savoia",
    titolo: "Rex e Conte di Savoia",
    occhiello: "Archivio",
    estratto:
      "I due transatlantici italiani degli anni Trenta. Esempio di formato per una scheda lunga con piu immagini e una cronologia.",
    registro: ["Anni Trenta", "Transatlantici", "Esempio di formato"],
    mediaServe: "materiale d'archivio sui due transatlantici, con fonte",
    esempioDiFormato: true,
  },
  {
    slug: "una-giornata-in-banchina",
    titolo: "Una giornata in banchina",
    occhiello: "Dal porto",
    estratto:
      "Formato previsto per i contenuti reali: fotografie fatte durante il lavoro, con data, banchina e nave. E questo il tipo di materiale che regge il sito.",
    registro: [
      { daFornire: "data" },
      { daFornire: "banchina" },
      { daFornire: "nave" },
    ],
    mediaServe:
      "serie fotografica reale di una giornata di lavoro in porto, con metadati",
    esempioDiFormato: false,
  },
];
