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



=======
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
