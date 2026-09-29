# scroll-journey — setup e guida d'uso

Skill per **Claude Code** (non claude.ai): genera siti hero a scorrimento video
in autonomia (Gemini per l'immagine, Veo per i due clip, ffmpeg per i frame,
template.html per il sito finale).

## Struttura (già pronta in questo pacchetto)

```
tuo-progetto/
├── .env                              # ← da creare tu, vedi sotto (NON committare)
├── .claude/
│   └── skills/
│       └── scroll-journey/
│           ├── SKILL.md              # definizione della skill, letta da Claude Code
│           └── scripts/
│               ├── build.py          # script che orchestra tutto
│               └── template.html     # template del sito, DEVE stare qui vicino a build.py
└── .tmp/                             # output generato, creato automaticamente
```

Importante: `build.py` cerca `template.html` nella propria stessa cartella
(`scripts/`), non nella root della skill. La struttura sopra è quella corretta
— non spostare `template.html` fuori da `scripts/`.

## Checklist da fare ORA (costo zero)

1. **Copia la cartella `.claude/` nella root del tuo repo** (quello dove lavori
   con Claude Code). Se hai già una cartella `.claude/skills/`, unisci solo la
   sottocartella `scroll-journey/`.
2. **Installa ffmpeg** e verifica che sia nel PATH:
   ```bash
   ffmpeg -version
   ```
   Se manca: `brew install ffmpeg` (Mac) o `sudo apt install ffmpeg` (Linux/WSL).
3. **Installa la dipendenza Python**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Prepara il `.env`**: rinomina `.env.example` in `.env`, mettilo nella root
   del progetto. Lascialo con la chiave vuota per ora — lo riempi solo quando
   sei pronto a spendere.
5. **Verifica che Claude Code veda la skill**: apri il progetto in Claude Code
   e chiedi "che skill hai disponibili?" — dovrebbe comparire `scroll-journey`
   nella lista, con la sua description (i trigger sono: "scroll journey",
   "scroll site", "cinematic scroll", "scrollytelling", o `/scroll-journey`).

Con questi 5 passi il pacchetto è "armato": manca solo la chiave API per
partire, il giorno che vuoi spendere i $2-4 a run.

## Quando avrai budget: flusso d'uso perfetto

1. **Ottieni una `GEMINI_API_KEY`** da Google AI Studio (serve una chiave con
   accesso a `gemini-3-pro-image` e `veo-3.1-fast-generate-preview` — verifica
   che il tuo piano/billing li abilita, Veo di solito richiede billing attivo).
2. **Incollala nel `.env`**.
3. **Chiedi a Claude Code il sito** in linguaggio naturale, es:
   > "Fammi uno scroll journey su un orologio di lusso, tono elegante nero e oro"

   Claude Code, seguendo `SKILL.md`, farà il lavoro creativo lui stesso:
   scriverà `spec.json` in `.tmp/scroll-journey/<slug>/spec.json` con i prompt
   per immagine e i due clip, scegliendo un colore accent coerente col mood.
   Tu puoi guidarlo dando: soggetto, mood/colore, 3 headline se le vuoi
   specifiche, altrimenti le inventa lui.
4. **Claude Code lancia il build**:
   ```bash
   source .env 2>/dev/null; export GEMINI_API_KEY
   python3 .claude/skills/scroll-journey/scripts/build.py \
     --spec .tmp/scroll-journey/<slug>/spec.json \
     --out  .tmp/scroll-journey/<slug>
   ```
   Ci mette 2-4 minuti: immagine → clip1 (arriva al soggetto) → clip2
   (incatenato dall'ultimo frame di clip1, finale/reveal) → estrazione frame
   → `index.html` compilato.
5. **Verifica automatica**: se hai il MCP chrome-devtools collegato, Claude
   Code apre `index.html`, simula lo scroll e controlla che l'avanzamento dei
   frame sia continuo (~1 frame ogni 19px, nessun salto, nessuno scatto sulla
   giunzione tra i due clip) e che le reveal di testo arrivino al punto giusto.
   Senza quel MCP, apri tu manualmente `file://.../index.html` in Chrome e
   scrolla per controllare a occhio.
6. **Se qualcosa non torna**: non serve rigenerare i video. Le uniche cose da
   aggiustare sono le frazioni della timeline dentro `index.html` generato
   (`0.07` entrata card, `0.42` headline1, `0.84` headline finale) — sono
   percentuali del viaggio totale, indipendenti dal numero di frame.
7. **Output finale**: `.tmp/scroll-journey/<slug>/index.html` più gli asset
   (`images/`, `flythrough1.mp4`, `flythrough2.mp4`). La cartella `.tmp/` è
   pensata per essere gitignored — se vuoi tenere un sito, spostalo fuori da lì.

## Cose a cui stare attento

- **Costo**: ~$2-4 a run (1 immagine + 2 clip Veo-fast). Ogni volta che rigeneri
  perché non ti piace il risultato, riparte il costo pieno — per questo conviene
  curare bene lo `spec.json` prima di lanciare (soprattutto i prompt dei due
  clip: devono essere "continuous single shot, no cuts" e il primo deve
  esplicitamente "arrivare" al soggetto entro la fine).
- **Tempi di generazione Veo**: lo script fa polling ogni 10s fino a 15 minuti
  (90 tentativi); se scade va in timeout, ma non consuma credito già speso per
  l'immagine.
- **`.env` mai su Git**: il `.gitignore` incluso lo esclude già.
