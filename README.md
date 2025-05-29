## How to Run the Project (First Time Setup)

This project is a web application with:
- **Backend:** Node.js (Express)
- **Frontend:** Next.js
- **Database:** PostgreSQL (started via Docker Compose)
- **ORM:** Knex.js

Follow these steps to set up and run the project for the first time:

---

### 1. Start the Database with Docker Compose, Set Up the Database Schema and Seed Data

Open a terminal in the project root and run:

```bash
docker-compose up -d
cd backend
npx knex migrate:latest
npx knex seed:run
cd ..
docker exec -i postgres_db psql -U museion_user -d museion_db < init.sql
```

---

### 3. Test the Database Connection

You can check if the database is running and the tables are created:

```bash
docker exec -it postgres_db psql -U museion_user -d museion_db
```

Once inside the database shell, list the tables:

```bash
museion_db=# \dt
```

---

### 4. Start the Application

#### Open two terminals:

**First terminal (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

**Second terminal (Backend):**
```bash
cd backend
npm install
npm run dev
```

---

### 5. Open the App

Visit [http://localhost:3000/](http://localhost:3000/) in your browser.

---

### 6. Environment Variables

Create a `.env` file (not included in the repository) with the following content:

```
DB_HOST=postgres
DB_PORT=5432
DB_USER=museion_user
DB_PASSWORD=pwd
DB_NAME=museion_db
```

---
