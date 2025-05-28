## ✅ TODO
- "On-the-fly" scene composition ✅
- Add models and statues + various descriptions ✅
- Footer + ShopPage Design + merch + mobile ✅
- Mouse behavior not handled yet, needs to be checked (does not work in this implementation)
- Try to optimize for better efficiency

## Issues
- Outline on hover is not rendered

## HOW TO RUN

```bash
docker-compose up -d
cd backend
npx knex migrate:latest
npx knex seed:run
cd ..
docker exec -i postgres_db psql -U museion_user -d museion_db < init.sql
```

### 2. Test to see if everything works

```bash
docker exec -it postgres_db psql -U museion_user -d museion_db
```
To view the tables:
```bash
museion_db=# \dt
```

## 3. If everything works you can now run the app:

### First terminal
```bash
cd frontend
npm i
npm run dev
```

### Second terminal
```bash
cd backend
npm i
npm run dev
```

## Enjoy at [http://localhost:3000/](http://localhost:3000/)

---

supersecret

## 🔐 Environment Variables

The `.env` file (not included in the repository) should contain:

```
DB_HOST=postgres
DB_PORT=5432
DB_USER=museion_user
DB_PASSWORD=pwd
DB_NAME=museion_db
```