## ✅ TODO futuro
- Composizione "volante" della scena ✅
- Aggiungere modelli e statue + descrizioni varie
- Homepage e footer (Design da vedere insieme) + ShopPage + AboutPage (?)
- la navbar a me piace, fatemi sapere la vostra e come la vorreste

# Tour Update (11/05)

Ho creato i modelli con Blender, per poi importarli nella scena. 
Ancora non sono felice di alcuni dettagli, devono essere curati meglio.
Ho aggiunto un effetto noise, se non siete convinti l'effetto e' governato da `<EffectComposer>`, in `MainScene.jsx`.

## Issues
- Non ho curato il comportamento con il mouse, e' ancora da vedere (non funziona in questa implementazione)

## TODO
- Implementazione composizione "volante";
- Migliorare le luci (vorrei un effetto realistico).

***
## Update 15/05
Ho aggiunto una funzione seno che gestisce il bob destra-sinistra mentre si scorre
nella RectangleRoom. Ho aggiunto una prima versione delle info dopo aver cliccato sulla statua, mostrando info relative alla statua, autore, materiale etc.
Ho aggiunto un nuovo modellino (brutto e messo male, era per testare).

Il pannello delle informazioni scompare onWheel, ma ho dimiuito il sample per questioni di efficienza

## Issues
Scorrendo vicino alla nuova statua, ci sono problemi di efficienza, lagga.

## TODO
- Rivedere il comportamento della sidebar,
- Cercare di ridurre qualcosa per migliorare l'efficienza

***
# Update 18/05

Nato dal problema di ordine di rendering (l'InfoPanel e' un DOM element, le statue sono three.js elements, i DOM elements hanno precedenza)
ho trovato un nuovo modo per la sezione info: al click sulla statua, vengono lanciate n immagini della statua, con linguaggio di design concorde al pannello info
e spostamento lerpato.

Sto ancora lavorando sull'effetto di selezione (outline) delle statue quando l'user fa hover, ci sono quasi ma non viene renderizzato. Attenzione perche' il codice e' ancora 'zozzo' di parti di codice relativi all'outline.
Cerco di implementarlo tra stasera e domani.


## Issues
- Le immagini nelle cards dell'info panel non vengno renderizzate correttamente, ci sono dei piccoli problemi di dimensioni. Risolvero' velocemente, non dovrebbe essere un grande problema.
- L'outline su hover non viene renderizzato
- Problemi di performance sulla statua di Seymour (la prima sulla circonferenza), provero' a degradare la qualita' del modello


# Backend - Ticketing App

Questo progetto rappresenta il backend di un sistema per la gestione di biglietti con disponibilità giornaliere, realizzato in Node.js e con database PostgreSQL.

## 📁 Struttura del progetto

```
backend/
├── src/
│   ├── controllers/      # Logica di gestione delle rotte
│   ├── models/           # Query e accesso al DB
│   ├── routes/           # Definizione delle rotte API
│   ├── middleware/       # Middleware (es. autenticazione)
│   └── app.js            # Entry point dell'applicazione
├── .env                  # Variabili di ambiente (non incluso nel repo)
├── package.json
└── Dockerfile
db/
│   ├── migrations/       # Migrazioni del database
│   ├── seeds/            # Seed iniziali
│   └── knexfile.js       # Configurazione Knex
```

## ⚙️ Setup del database con Docker

Per avviare solamente il servizio del database PostgreSQL:

### 1. File `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:13
    container_name: postgres_db
    environment:
      POSTGRES_USER: museion_user
      POSTGRES_PASSWORD: pwd
      POSTGRES_DB: museion_db
    volumes:
      - ./db/data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - ticketing_network
    restart: always

networks:
  ticketing_network:
    driver: bridge
```

### 2. Avvio del database

```bash
docker-compose up -d
```

### 3. Accesso al database

```bash
docker exec -it postgres_db psql -U museion_user -d museion_db
```
Per vedere le tabelle:
```bash
museion_db=# \dt
```


## 🌱 Migrazioni con Knex

Assicurati di avere Knex installato globalmente o tramite npx:

```bash
npx knex migrate:latest
```

## 🔐 Variabili di ambiente

Il file `.env` (non incluso nel repository) dovrebbe contenere:

```
DB_HOST=postgres
DB_PORT=5432
DB_USER=museion_user
DB_PASSWORD=pwd
DB_NAME=museion_db
```

## 📦 Dipendenze principali

* `express`
* `knex`
* `pg`
* `dotenv`

## ✅ To Do (per prossime fasi)

* [ ] Aggiungere container per il backend in `docker-compose.yml`
* [ ] Integrazione frontend (Next.js)
* [ ] Endpoint autenticazione e validazione
* [ ] Gestione ordini e disponibilità biglietti

---
