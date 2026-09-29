import type { VoceRegistro } from "@/components/registro";
import type { ChiaveScatto } from "@/lib/immagini";

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
  /** Fotografia d'archivio gia disponibile per questa sezione, se c'e. */
  scatto?: ChiaveScatto;
  /** Materiale che serve, quando la fotografia non c'e ancora. */
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
    scatto: "pilotinaInServizio",
    mediaServe: "",
  },
  {
    slug: "port-series",
    nome: "Port Series",
    sottotitolo: "I porti, uno per uno",
    introduzione: { daFornire: "quali porti compongono la serie e con che criterio" },
    registro: ["Serie a porti", { daFornire: "elenco dei porti gia usciti" }],
    scatto: "imboccaturaAlCrepuscolo",
    mediaServe: "",
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

/** Chiave di una fotografia reale gia presente in public/immagini.
 *  La pagina la traduce in un import statico: serve per lasciare questo file
 *  senza import, e perche l'import statico e cio che permette a next/image di
 *  generare da se la miniatura sfocata. */
export type ChiaveImmagine =
  | "prua-al-tramonto"
  | "barcarizzo"
  | "pilotina-dal-ponte";

export type VoceJournal = {
  slug: string;
  titolo: string;
  occhiello: string;
  estratto: string;
  registro: VoceRegistro[];
  /** Fotografia dell'archivio, se c'e. Altrimenti si dichiara cosa serve. */
  scatto?: ChiaveScatto;
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
    slug: "sotto-la-prua",
    titolo: "Sotto la prua",
    occhiello: "Dall'archivio",
    estratto:
      "La pilotina corre sotto la prua di una nave al tramonto. Il testo che accompagna la fotografia non e ancora scritto, i dati non ancora raccolti.",
    registro: [],
    scatto: "pruaAlTramonto",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "bellatrix",
    titolo: "Bellatrix",
    occhiello: "Le unita",
    estratto:
      "Una delle pilotine, fotografata al tramonto con le navi alla fonda sullo sfondo. Il nome si legge sulla timoneria.",
    registro: [],
    scatto: "bellatrixAlTramonto",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "mare-formato",
    titolo: "Mare formato",
    occhiello: "Dall'archivio",
    estratto:
      "Il servizio non si ferma quando il mare monta: si esce lo stesso. Questa e una delle fotografie che lo mostrano senza doverlo spiegare.",
    registro: [],
    scatto: "pilotinaNelMareFormato",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "telegrafo-di-macchina",
    titolo: "Il telegrafo di macchina",
    occhiello: "Oggetti",
    estratto:
      "AVANTI TUTTA, MEZZA, ADAGIO, FERMO. Gli ordini alla macchina passano ancora da un quadrante illuminato, con le stesse parole di sempre.",
    registro: [],
    scatto: "telegrafoDiMacchina",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "dal-ponte",
    titolo: "Dal ponte",
    occhiello: "Dall'archivio",
    estratto:
      "La pilotina vista dall'alto, con la biscaglina calata in primo piano. E il punto di vista di chi sta per scendere.",
    registro: [],
    scatto: "pilotinaDalPonte",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "imboccatura",
    titolo: "L'imboccatura, al crepuscolo",
    occhiello: "Il porto",
    estratto:
      "Il faro acceso, i lampioni sulla diga, il canale scuro. E il tratto che ogni nave percorre con il pilota a bordo.",
    registro: [],
    scatto: "imboccaturaAlCrepuscolo",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "il-barcarizzo",
    titolo: "Il barcarizzo",
    occhiello: "Dall'archivio",
    estratto:
      "La scala reale calata sulla banchina, le cime d'ormeggio tese, un uomo che lavora sotto. Il mestiere visto dall'alto.",
    registro: [],
    scatto: "barcarizzo",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "il-porto-dalla-coperta",
    titolo: "Il porto, dalla coperta",
    occhiello: "Il porto",
    estratto:
      "Cataste di container e, oltre, il canale con le banchine e i serbatoi. La vista che si ha arrivando, dall'alto di una portacontainer.",
    registro: [],
    scatto: "portoDiRavenna",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "prua-nell-onda",
    titolo: "Dalla timoneria",
    occhiello: "A bordo",
    estratto:
      "La prua affronta un'onda alta quanto la barca. Fotografia scattata da dentro, dal posto di guida: e il punto di vista di chi ci lavora, non di chi guarda.",
    registro: [],
    scatto: "pruaNellOnda",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "due-unita",
    titolo: "Due unita",
    occhiello: "Le unita",
    estratto:
      "Due pilotine affiancate in navigazione, viste dall'alto. Sulla poppa della prima si legge il nome.",
    registro: [],
    scatto: "pilotineAffiancate",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "la-fiancata",
    titolo: "La fiancata",
    occhiello: "Le navi",
    estratto:
      "Lo scafo di una nave da carico visto dall'acqua al tramonto. E la parete lungo la quale passa la biscaglina.",
    registro: [],
    scatto: "fiancataAlTramonto",
    mediaServe: "",
    esempioDiFormato: false,
  },
  {
    slug: "piroscafo-grazia",
    titolo: "Il piroscafo Grazia",
    occhiello: "Archivio storico",
    estratto:
      "Affondato nel 1939 al largo dell'Inghilterra. Esempio di formato per una scheda d'archivio: un fatto, una data, un luogo, e il documento che lo prova.",
    registro: [
      "1939",
      "Al largo dell'Inghilterra",
      { daFornire: "una fotografia o un documento: cercata, non ne esiste nessuna verificabile in pubblico dominio" },
    ],
    mediaServe:
      "documento o fotografia d'archivio del piroscafo, con fonte — la ricerca su Wikimedia Commons non ha prodotto nulla di attribuibile con certezza a questa nave",
    esempioDiFormato: true,
  },
  {
    slug: "rex",
    titolo: "Il Rex",
    occhiello: "Archivio storico",
    estratto:
      "Fotografato nel 1932 sulla linea Genova-New York, al primo viaggio. La fotografia e in pubblico dominio e la fonte e dichiarata nel registro: e cosi che una scheda storica diventa controllabile.",
    registro: [],
    scatto: "rex",
    mediaServe: "",
    esempioDiFormato: true,
  },
  {
    slug: "conte-di-savoia",
    titolo: "Il Conte di Savoia",
    occhiello: "Archivio storico",
    estratto:
      "Il transatlantico del Lloyd Sabaudo in navigazione. Anche qui la fonte e la licenza compaiono sotto l'immagine, non in una nota a pie di pagina.",
    registro: [],
    scatto: "conteDiSavoia",
    mediaServe: "",
    esempioDiFormato: true,
  },
];
