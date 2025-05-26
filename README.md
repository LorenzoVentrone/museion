## ✅ TODO futuro
- Composizione "volante" della scena ✅
- Aggiungere modelli e statue + descrizioni varie
- footer + Design ShopPage + AboutPage


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

## ⚙️ Setup del database con Docker

Per avviare solamente il servizio del database PostgreSQL:

### 1. Avvio del database

```bash
docker-compose up -d
```

### 2. Accesso al database

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

Se sono necessarie modifiche al db eseguire questi comandi:

Naviga nella directory /backend
```bash
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run
```
Per l'inizializzazione dei dati della tabella availability eseguire:
```bash
docker exec -i postgres_db psql -U museion_user -d museion_db < init.sql
```

# Avvio Backend

Naviga nella directory /backend ed esegui:
```bash
npm i
npm run dev
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

## ✅ To Do (per prossime fasi)

* [ ] Aggiungere container per il backend in `docker-compose.yml`
* [ ] Integrazione frontend (Next.js)
* [ ] Endpoint autenticazione e validazione
* [ ] Gestione ordini e disponibilità biglietti

---
