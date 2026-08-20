"use client";

import React, { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  avviaStudio,
  foglio,
  lunghezzaSequenza,
  oggettoCamera,
  oggettoSoglia,
} from "./theatre";

/* ============================================================================
   LA SCENA 3D

   Questo modulo viene caricato solo dopo il montaggio, e solo su desktop:
   chi lo importa e components/ship-scroll-scene.tsx tramite next/dynamic con
   ssr:false. Qui dentro si puo dare per scontato il browser.
   ========================================================================= */

/* La nave viene normalizzata a runtime a questa lunghezza, centrata sull'asse
   e appoggiata sul pelo dell'acqua. E la ragione per cui i keyframe salvati
   restano validi anche se domani sostituisci il GLB con un modello di scala
   diversa: la camera e autorata contro una nave convenzionale lunga 100, non
   contro le unita che si e portato dietro Sketchfab. */
const LUNGHEZZA_NAVE = 100;

const MODELLO = "/models/cargo-ship.glb";

/* Il GLB e Draco-compresso: la geometria arriva codificata e va decodificata a
   runtime da un decoder wasm. drei di suo lo scarica dal CDN gstatic — ma vale
   qui la stessa regola dell'Environment piu sotto: niente dipendenze di rete
   fuori dal nostro dominio sul primo blocco. Percio il decoder e servito da
   /public/draco e lo passiamo a useGLTF come path esplicito (drei accetta una
   stringa come sorgente del decoder). */
const DECODER = "/draco/";

/* --------------------------------------------------------------------------
   PALETTE
   globals.css dice: "Nessun colore esadecimale va scritto nei componenti: si
   passa sempre di qui". WebGL non legge le variabili CSS, ma puo leggerle il
   documento: prendiamo i token dal :root una volta sola al montaggio, cosi la
   fonte di verita resta il sistema di token e non una copia dei valori.
   ----------------------------------------------------------------------- */
function usePalette() {
  return useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const token = (nome: string) => root.getPropertyValue(nome).trim();
    return {
      navy: new THREE.Color(token("--hp-navy-900")),
      teal: new THREE.Color(token("--hp-teal-600")),
      maroon: new THREE.Color(token("--hp-maroon-600")),
      cream: new THREE.Color(token("--hp-cream-100")),
    };
  }, []);
}

/* --------------------------------------------------------------------------
   LO SCORRIMENTO COMANDA LA TESTINA DELLA SEQUENZA
   Nessun hijack dello scroll: la pagina scorre normalmente, e la scena e
   incollata (sticky) dentro un contenitore alto. Il progresso e quanta parte
   di quel contenitore e gia passata sotto il bordo alto della finestra.
   ----------------------------------------------------------------------- */
function useSequenzaDalloScroll(contenitore: RefObject<HTMLElement | null>) {
  useFrame(() => {
    const elemento = contenitore.current;
    if (!elemento) return;

    const rect = elemento.getBoundingClientRect();
    const corsa = rect.height - window.innerHeight;
    const progresso = corsa <= 0 ? 0 : Math.min(Math.max(-rect.top / corsa, 0), 1);

    foglio.sequence.position = progresso * lunghezzaSequenza();
  });
}

/* --------------------------------------------------------------------------
   I VALORI DI THEATRE DIVENTANO LA CAMERA
   Questo e per intero cio che @theatre/r3f avrebbe fatto al posto nostro.
   ----------------------------------------------------------------------- */
function CameraDaTheatre() {
  /* La camera e dichiarata qui e tenuta per riferimento, invece di essere
     pescata dallo stato di r3f: e un oggetto che questo componente possiede,
     e possederlo e cio che rende lecito mutarlo a ogni frame. */
  const camera = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    const macchina = camera.current;
    if (!macchina) return;

    const v = oggettoCamera.value;

    macchina.position.set(v.position.x, v.position.y, v.position.z);
    macchina.lookAt(v.sguardo.x, v.sguardo.y, v.sguardo.z);

    /* updateProjectionMatrix e caro: si paga solo quando il fov cambia
       davvero, non a ogni frame in cui resta fermo fra due keyframe. */
    if (macchina.fov !== v.fov) {
      macchina.fov = v.fov;
      macchina.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={camera} makeDefault fov={50} near={0.5} far={1200} />;
}

/* La dissolvenza scrive direttamente sullo stile del nodo DOM invece di
   passare per useState: un setState a 60 fps rirenderizzerebbe l'albero React
   sessanta volte al secondo per cambiare un solo numero. */
function useDissolvenza(strato: RefObject<HTMLElement | null>) {
  useFrame(() => {
    const elemento = strato.current;
    if (!elemento) return;
    const { dissolvenza } = oggettoSoglia.value;

    /* react-hooks/immutability vieta di scrivere dentro qualcosa che arriva
       dalle props, e in generale ha ragione. Qui l'eccezione e il punto: lo
       strato della soglia e un nodo DOM fuori dal canvas, e scriverne lo stile
       a mano e cio che evita un setState a 60 fps. Il nodo non e stato di
       React — React non lo rilegge mai — quindi non c'e niente che possa
       desincronizzarsi. */
    // eslint-disable-next-line react-hooks/immutability
    elemento.style.opacity = String(dissolvenza);
    /* Sotto la soglia di visibilita lo strato non deve intercettare i click. */
    elemento.style.pointerEvents = dissolvenza > 0.99 ? "auto" : "none";
  });
}

/* --------------------------------------------------------------------------
   LA NAVE
   ----------------------------------------------------------------------- */
function Nave() {
  const gltf = useGLTF(MODELLO, DECODER);

  const modello = useMemo(() => {
    const oggetto = gltf.scene.clone(true);

    const scatola = new THREE.Box3().setFromObject(oggetto);
    const misura = scatola.getSize(new THREE.Vector3());
    const centro = scatola.getCenter(new THREE.Vector3());

    const fattore = LUNGHEZZA_NAVE / Math.max(misura.x, misura.y, misura.z);
    oggetto.scale.setScalar(fattore);
    /* Centrata su X e Z, ma appoggiata su Y: il piano y=0 e l'acqua. */
    oggetto.position.set(
      -centro.x * fattore,
      -scatola.min.y * fattore,
      -centro.z * fattore,
    );

    oggetto.traverse((nodo) => {
      if ((nodo as THREE.Mesh).isMesh) {
        nodo.castShadow = true;
        nodo.receiveShadow = true;
      }
    });

    return oggetto;
  }, [gltf]);

  return <primitive object={modello} />;
}

/* Il segnaposto richiesto per quando il GLB non c'e. Non e decorativo: ha le
   proporzioni di una portacontainer, cosi i keyframe si possono autorare
   anche prima che il modello vero sia disponibile. */
function NaveSegnaposto() {
  return (
    <mesh position={[0, LUNGHEZZA_NAVE * 0.07, 0]} castShadow receiveShadow>
      <boxGeometry
        args={[LUNGHEZZA_NAVE, LUNGHEZZA_NAVE * 0.14, LUNGHEZZA_NAVE * 0.16]}
      />
      <meshStandardMaterial color="#3a3a3a" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

/* Suspense copre il caricamento; questo copre il fallimento (GLB assente o
   corrotto). Senza, un 404 sul modello porta giu l'intera pagina. */
class SeIlModelloManca extends React.Component<
  { children: React.ReactNode },
  { caduto: boolean }
> {
  state = { caduto: false };
  static getDerivedStateFromError() {
    return { caduto: true };
  }
  render() {
    return this.state.caduto ? <NaveSegnaposto /> : this.props.children;
  }
}

/* --------------------------------------------------------------------------
   IL PORTO
   Regola di palette: teal e maroon stanno nell'atmosfera — nebbia, luci di
   banchina, controluce — non sullo scafo. Lo scafo lo illumina una chiave
   neutra, perche la nave deve restare documentaria e non diventare un oggetto
   colorato di brand.
   ----------------------------------------------------------------------- */
function Porto() {
  const { navy, teal, maroon, cream } = usePalette();

  return (
    <>
      <color attach="background" args={[navy]} />
      {/* La nebbia e cio che da la profondita: la nave larga in apertura sta
          dentro la foschia, la banchina ne esce. */}
      <fogExp2 attach="fog" args={[navy.getHex(), 0.0032]} />

      <ambientLight intensity={0.55} color={cream} />

      {/* Chiave neutra sullo scafo. */}
      <directionalLight
        position={[80, 120, 60]}
        intensity={2.6}
        color={cream}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Le luci del porto, dal lato acqua. Tenute basse di proposito: devono
          leggersi come lampade sulla banchina, non come un fondale colorato. */}
      <pointLight position={[-70, 22, 80]} intensity={5200} color={teal} distance={320} decay={2} />
      <pointLight position={[15, 14, 65]} intensity={2600} color={teal} distance={200} decay={2} />

      {/* Il maroon e l'accento raro del sistema di token, e raro deve restare:
          sta alto e dietro la nave, dove stacca il profilo dello scafo dal
          navy senza toccare l'acqua. Portato a terra diventava una pozza
          magenta che si prendeva mezza inquadratura. */}
      <spotLight
        position={[-120, 150, -130]}
        target-position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={9000}
        color={maroon}
        distance={420}
        decay={2}
      />

      {/* Ambiente costruito qui dentro, non un preset. I preset di drei
          scaricano una HDR da un CDN esterno a ogni caricamento: una
          dipendenza di rete fuori dal nostro dominio su un blocco che e la
          prima cosa che si vede. Questi pannelli danno allo scafo i riflessi
          che servono — la banchina calda, l'acqua fredda — restando dentro
          il bundle e dentro la palette. */}
      <Environment resolution={256} environmentIntensity={0.35}>
        <Lightformer
          form="rect"
          intensity={2}
          color={cream}
          position={[0, 60, -80]}
          scale={[120, 40, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color={teal}
          position={[-90, 15, 40]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[160, 30, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1.5}
          color={maroon}
          position={[90, 30, -60]}
          scale={[60, 60, 1]}
        />
      </Environment>

      {/* Il pelo dell'acqua: assorbe piu di quanto rifletta. Con metalness
          alta ogni luce di banchina ci sbocciava sopra come un alone; qui la
          superficie serve solo a dare un piano su cui la nave poggia e su cui
          cadono le ombre. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshStandardMaterial color={navy} roughness={0.78} metalness={0.18} />
      </mesh>
    </>
  );
}

function Contenuto({ contenitore }: { contenitore: RefObject<HTMLElement | null> }) {
  useSequenzaDalloScroll(contenitore);

  return (
    <>
      <CameraDaTheatre />
      <Porto />
      <SeIlModelloManca>
        <Suspense fallback={<NaveSegnaposto />}>
          <Nave />
        </Suspense>
      </SeIlModelloManca>
    </>
  );
}

export default function Scena({
  contenitore,
  stratoSoglia,
}: {
  contenitore: RefObject<HTMLElement | null>;
  stratoSoglia: RefObject<HTMLElement | null>;
}) {
  useEffect(avviaStudio, []);

  return (
    <Canvas
      shadows
      /* dpr limitato a 2: oltre non si vede la differenza e il costo per
         pixel cresce col quadrato. */
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Contenuto contenitore={contenitore} />
      <PonteDissolvenza strato={stratoSoglia} />
    </Canvas>
  );
}

/* Vive dentro il Canvas per avere useFrame, ma non disegna niente in 3D:
   il suo unico lavoro e portare il valore keyframato fuori, sul DOM. */
function PonteDissolvenza({ strato }: { strato: RefObject<HTMLElement | null> }) {
  useDissolvenza(strato);
  return null;
}

useGLTF.preload(MODELLO, DECODER);
