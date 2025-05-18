# Frontend - Prima versione del tour virtuale
Ingresso in una stanza rettangolare (il soffitto viene tagliato sopra per avere un feedback sulla luminosita,
in futuro sarebbe figo avere luce filtrante gia' dalla prima sezione)
Dopo l'ingresso arriviamo al *Pantheon* dove ci saranno tutte le statue.

Mi piacerebbe mettere luce filtrante da un oculus in alto, altrimenti giochiamo con le luci.

***
## ⚠️ Issues
Il movimento *lerpato* tra la prima sezione e la seconda ha rotto la possibilita' di fare panning con il mouse. Devo risolverlo.
Le pareti della prima stanza rettangolare entrano nel *Pantheon*. Dobbiamo trovare un modo per rendere carina la transizione da stanza rettangolare a Pantheon, magari una stanza purgatorio?
**Le pareti laterali del Pantheon e la cupola non fanno un seal perfetto**, anche quello va rivisto

*** 
Versione pre-alfa, fa schifo ma potrebbe essere una base di partenza.
*** 

## ✅ TODO futuro
- Composizione "volante" della scena

***

# Tour Update (11/05)

Ho creato i modelli con Blender, per poi importarli nella scena. 
Ancora non sono felice di alcuni dettagli, devono essere curati meglio.
Ho aggiunto un effetto noise, se non siete convinti l'effetto e' governato da `<EffectComposer>`, in `MainScene.jsx`.
## Issues
- Non ho curato il comportamento con il mouse, e' ancora da vedere (non funziona in questa implementazione)

## TODO
- Implementazione composizione "volante";
- Migliorare le luci (vorrei un effetto realistico).
=======
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

Naviga nella directory /backend: ```cd backend``` ed esegui:

```bash
npx knex migrate:latest
npx knex seed:run   
```

## 🔐 Variabili di ambiente

Il file `.env` (non incluso nel repository) dovrebbe contenere:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=museion_user
DB_PASSWORD=pwd
DB_NAME=museion_db
SALT=10 #modifica il salt per l'autenticazione
JWT_SECRET=supersegreto
PORT=3001
```

## 📦 Dipendenze principali

* `express`
* `knex`
* `pg`
* `dotenv`

## ✅ To Do (per prossime fasi)

* [ ] Aggiungere container per il backend in `docker-compose.yml`
* [ ] Integrazione frontend (Next.js)
* [ ] Validazione dell'input (ATTENZIONE scadenza carta)
* [ ] TEST SU BIGLIETTI DI DATE DIVERSE LO STESSO GIORNO

---
