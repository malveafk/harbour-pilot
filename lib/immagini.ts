import type { StaticImageData } from "next/image";
import type { VoceRegistro } from "@/components/registro";

import archivioBiscaglina from "@/public/immagini/archivio-biscaglina.jpg";
import archivioTimoneria from "@/public/immagini/archivio-timoneria.jpg";
import barcarizzo from "@/public/immagini/barcarizzo.jpg";
import bellatrixAlTramonto from "@/public/immagini/bellatrix-al-tramonto.jpg";
import fiancataAlTramonto from "@/public/immagini/fiancata-al-tramonto.jpg";
import imboccaturaAlCrepuscolo from "@/public/immagini/imboccatura-al-crepuscolo.jpg";
import pilotaBiscaglina from "@/public/immagini/pilota-biscaglina.jpg";
import pilotinaDalPonte from "@/public/immagini/pilotina-dal-ponte.jpg";
import pilotinaInServizio from "@/public/immagini/pilotina-in-servizio.jpg";
import pilotinaNelMareFormato from "@/public/immagini/pilotina-nel-mare-formato.jpg";
import pilotineAffiancate from "@/public/immagini/pilotine-affiancate.jpg";
import portoDiRavenna from "@/public/immagini/porto-di-ravenna.jpg";
import pruaAlTramonto from "@/public/immagini/prua-al-tramonto.jpg";
import pruaNellOnda from "@/public/immagini/prua-nell-onda.jpg";
import salitaABordo from "@/public/immagini/salita-a-bordo.jpg";
import telegrafoDiMacchina from "@/public/immagini/telegrafo-di-macchina.jpg";
import cabanBlu from "@/public/capi/72718-blu.jpg";
import cabanNero from "@/public/capi/72727-nero.jpg";
import soprabitoBlu from "@/public/capi/72709-blu.jpg";
import girocolloNidoDApe from "@/public/capi/jb2601-blu.jpg";
import girocolloMelangeBlu from "@/public/capi/jb2603-blu.jpg";
import girocolloAvorio from "@/public/capi/jb2603-avorio.jpg";
import dolcevitaBlu from "@/public/capi/jb2609-blu.jpg";
import dolcevitaAvorio from "@/public/capi/jb2609-avorio.jpg";
import rex1932 from "@/public/immagini/rex-1932.jpg";
import conteDiSavoia1934 from "@/public/immagini/conte-di-savoia-1934.jpg";

/* ============================================================================
   L'ARCHIVIO FOTOGRAFICO

   Un posto solo dove stanno file, testo alternativo e metadati di registro.
   Sparsi nelle pagine, una didascalia finirebbe per divergere dall'altra e i
   dati mancanti non si troverebbero piu.

   SUL TESTO ALTERNATIVO: descrive cosa si vede, non cosa significa. Chi usa
   un lettore di schermo deve poter ricostruire l'immagine, non ricevere il
   commento.

   SUI METADATI: ogni scatto porta le voci che il layer di registro mostrera.
   Quelle che non sappiamo restano dichiarate con { daFornire }. Non si
   riempiono a stima: un metadato inventato distrugge esattamente cio che il
   registro serve a dimostrare.

   NOTA SULLA RISOLUZIONE: sono tutte passate da WhatsApp, massimo 1600 px sul
   lato lungo. Bastano per griglie e colonne; per un'immagine a piena finestra
   su schermo retina servono gli originali.
   ========================================================================= */

export type Scatto = {
  file: StaticImageData;
  alt: string;
  registro: VoceRegistro[];
  /** true = materiale storico, non una fotografia recente. */
  archivio?: boolean;
  /** Presente solo per il materiale che NON viene dall'archivio di famiglia:
   *  dice da dove arriva e con che licenza. Finisce a schermo nel registro,
   *  perche una fonte citata e cio che rende l'immagine verificabile quanto
   *  il testo che le sta accanto. */
  provenienza?: { fonte: string; licenza: string; url: string };
};

export const scatti = {
  /* --- Il gesto, due volte, a generazioni di distanza --------------------- */
  pilotaBiscaglina: {
    file: pilotaBiscaglina,
    alt: "Un pilota sale la biscaglina lungo la fiancata di una nave, in controluce, con la propria ombra proiettata sullo scafo arrugginito.",
    /* Chi sia questo pilota non lo sa nessuno in famiglia. Non e Stefano.
       Finche resta senza nome non va pubblicata: e la fotografia di una
       persona reale e non identificata. */
    registro: [
      "Salita a bordo",
      { daFornire: "porto" },
      { daFornire: "anno" },
      { daFornire: "nave" },
    ],
  },
  archivioBiscaglina: {
    file: archivioBiscaglina,
    alt: "Fotografia d'epoca, viraggio seppia: un pilota in divisa con berretto sale una biscaglina lungo la fiancata di una nave; sopra di lui un secondo uomo.",
    registro: [
      "Archivio di famiglia",
      /* Parentela confermata dalla famiglia: padre della nonna, quindi nonno
         materno di Stefano Stagnaro. NON si chiama Stagnaro — quel cognome
         arriva dal ramo paterno — e il nome proprio non e ancora stato dato.
         Fino ad allora qui resta la parentela, che e cio che sappiamo. */
      "Nonno materno di Stefano Stagnaro",
      { daFornire: "nome e cognome" },
      { daFornire: "anno" },
      { daFornire: "porto" },
    ],
    archivio: true,
  },
  archivioTimoneria: {
    file: archivioTimoneria,
    alt: "Fotografia d'epoca: un uomo con berretto e pipa, di profilo, guarda il mare dalla timoneria.",
    registro: [
      "Archivio di famiglia",
      "Andrea Stagnaro",
      { daFornire: "anno" },
    ],
    archivio: true,
  },
  salitaABordo: {
    file: salitaABordo,
    alt: "Vista dall'alto: un pilota con giubbotto ad alta visibilita sale a bordo mentre la pilotina corre affiancata alla nave.",
    registro: [
      "Stefano Stagnaro",
      { daFornire: "porto" },
      { daFornire: "data" },
    ],
  },

  /* --- Le pilotine ------------------------------------------------------- */
  bellatrixAlTramonto: {
    file: bellatrixAlTramonto,
    alt: "La pilotina Bellatrix al tramonto, con la scritta PILOTA sulla fiancata; all'orizzonte navi alla fonda con le luci accese.",
    registro: [
      "Bellatrix",
      { daFornire: "porto" },
      { daFornire: "data" },
    ],
  },
  pilotinaInServizio: {
    file: pilotinaInServizio,
    alt: "Una pilotina con scritta PILOTA e sigla RA 3867 naviga a velocita sostenuta accanto a una boa di canale.",
    registro: [
      "Altair · RA 3867",
      { daFornire: "porto" },
      { daFornire: "data" },
    ],
  },
  pilotinaNelMareFormato: {
    file: pilotinaNelMareFormato,
    alt: "Una pilotina attraversa un'onda con mare formato; lo spruzzo copre quasi interamente lo scafo.",
    registro: ["Mare formato", { daFornire: "porto" }, { daFornire: "data" }],
  },
  pilotineAffiancate: {
    file: pilotineAffiancate,
    alt: "Due pilotine affiancate in navigazione, viste dall'alto; sulla poppa della prima si legge Bellatrix.",
    registro: ["Bellatrix", { daFornire: "seconda unita" }, { daFornire: "data" }],
  },
  pilotinaDalPonte: {
    file: pilotinaDalPonte,
    alt: "La pilotina vista dal ponte della nave, affiancata in navigazione, con la biscaglina calata in primo piano.",
    registro: [
      "Dal ponte",
      { daFornire: "porto" },
      { daFornire: "data" },
      { daFornire: "chi ha scattato" },
    ],
  },
  pruaNellOnda: {
    file: pruaNellOnda,
    alt: "Dalla timoneria: la prua della pilotina affronta un'onda alta quanto la barca.",
    registro: ["A bordo", { daFornire: "porto" }, { daFornire: "data" }],
  },

  /* --- Le navi e il porto ------------------------------------------------ */
  pruaAlTramonto: {
    file: pruaAlTramonto,
    alt: "La pilotina corre sotto la prua di una nave al tramonto; in primo piano i salvagenti e la scia.",
    registro: [{ daFornire: "porto" }, { daFornire: "data" }, { daFornire: "nave" }],
  },
  fiancataAlTramonto: {
    file: fiancataAlTramonto,
    alt: "La fiancata arrugginita di una nave da carico vista dall'acqua al tramonto, con il cielo arancione all'orizzonte.",
    registro: [{ daFornire: "porto" }, { daFornire: "data" }, { daFornire: "nave" }],
  },
  barcarizzo: {
    file: barcarizzo,
    alt: "La scala reale calata dalla nave sulla banchina, vista dall'alto, con le cime d'ormeggio tese lungo la fiancata.",
    registro: [{ daFornire: "porto" }, { daFornire: "data" }],
  },
  imboccaturaAlCrepuscolo: {
    file: imboccaturaAlCrepuscolo,
    alt: "L'imboccatura del porto al crepuscolo: il faro acceso, i lampioni sulla diga e il canale scuro.",
    registro: [{ daFornire: "porto" }, { daFornire: "data" }],
  },
  portoDiRavenna: {
    file: portoDiRavenna,
    alt: "Dalla coperta di una portacontainer: cataste di container e, oltre, il canale del porto con le banchine, i serbatoi e le ciminiere.",
    registro: [{ daFornire: "porto" }, { daFornire: "data" }, { daFornire: "nave" }],
  },

  /* --- Dettagli ---------------------------------------------------------- */
  telegrafoDiMacchina: {
    file: telegrafoDiMacchina,
    alt: "Il telegrafo di macchina illuminato al buio: STOP, STAND BY, DEAD SLOW, SLOW, HALF, FULL, sui settori avanti e indietro.",
    registro: ["Telegrafo di macchina", { daFornire: "nave" }, { daFornire: "data" }],
  },
  /* --- Materiale storico di terzi, in pubblico dominio --------------------
     Non viene dall'archivio di famiglia: la fonte e la licenza vanno
     dichiarate, e compaiono nel registro sotto l'immagine. Verificate una per
     una tramite l'API di Wikimedia Commons, non dedotte dal nome del file. */
  rex: {
    file: rex1932,
    alt: "Fotografia del 1932: il transatlantico italiano Rex in navigazione, ripreso di tre quarti sulla linea Genova-New York.",
    registro: [
      "Rex",
      "1932",
      "Primo viaggio Genova-New York",
      "Bibliotheque nationale de France",
      "Pubblico dominio",
    ],
    archivio: true,
    provenienza: {
      fonte: "Agence Planet News / Bibliotheque nationale de France",
      licenza: "Pubblico dominio",
      url: "https://commons.wikimedia.org/wiki/File:Le_paquebot_italien_Rex_faisant_la_ligne_G%C3%AAnes-New_York_-_le_1er_voyage_-_btv1b9036580r.jpg",
    },
  },
  conteDiSavoia: {
    file: conteDiSavoia1934,
    alt: "Fotografia degli anni Trenta: il transatlantico Conte di Savoia del Lloyd Sabaudo in navigazione, ripreso di fianco.",
    registro: [
      "Conte di Savoia",
      "Lloyd Sabaudo",
      "1934",
      "A. Mondadori, Milano",
      "Pubblico dominio",
    ],
    archivio: true,
    provenienza: {
      fonte: "«Le navi tricolori sui mari del mondo», in «Genti e paesi», vol. 6, A. Mondadori, Milano",
      licenza: "Pubblico dominio",
      url: "https://commons.wikimedia.org/wiki/File:Conte_Savoia.jpg",
    },
  },

  /* --- I capi -----------------------------------------------------------
     Scatti di showroom su fondo a fiori, non fotografie di prodotto: servono
     a vedere l'impaginazione, non a stare online. Il registro lo dichiara a
     schermo come provvisorio, cosi nessuno le scambia per definitive e nessuno
     le lascia li per distrazione. Quando arrivano gli scatti veri si sostituisce
     il file e si toglie la dicitura.
     ------------------------------------------------------------------ */
  cabanBlu: {
    file: cabanBlu,
    alt: "Caban doppiopetto blu in tessuto a coste, sei bottoni, collo ampio a revers e polsini con martingala.",
    registro: [
      "72718 · Blu",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  cabanNero: {
    file: cabanNero,
    alt: "Caban doppiopetto nero in panno, sei bottoni, revers profilati e tasche a filetto.",
    registro: [
      "72727 · Nero",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  soprabitoBlu: {
    file: soprabitoBlu,
    alt: "Soprabito blu al ginocchio con fodera trapuntata a vista, colletto a camicia e quattro bottoni.",
    registro: [
      "72709 · Blu",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  girocolloNidoDApe: {
    file: girocolloNidoDApe,
    alt: "Maglia girocollo blu a punto nido d'ape, coste a collo, polsi e fondo.",
    registro: [
      "JB2601 · Blu",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  girocolloMelangeBlu: {
    file: girocolloMelangeBlu,
    alt: "Maglia girocollo blu melange a punto fitto, coste a collo, polsi e fondo.",
    registro: [
      "JB2603 · Blu",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  girocolloAvorio: {
    file: girocolloAvorio,
    alt: "Maglia girocollo avorio a punto fitto, coste a collo, polsi e fondo.",
    registro: [
      "JB2603 · Avorio",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  dolcevitaBlu: {
    file: dolcevitaBlu,
    alt: "Dolcevita blu a maglia strutturata, collo alto a coste larghe.",
    registro: [
      "JB2609 · Blu",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
  dolcevitaAvorio: {
    file: dolcevitaAvorio,
    alt: "Dolcevita avorio a maglia strutturata, collo alto a coste larghe.",
    registro: [
      "JB2609 · Avorio",
      "Immagine provvisoria",
      { daFornire: "nome e materiale" },
    ],
  },
} satisfies Record<string, Scatto>;

export type ChiaveScatto = keyof typeof scatti;
