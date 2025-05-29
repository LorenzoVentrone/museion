import knex from 'knex';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL env var is missing');
}

// Aggiungiamo l'opzione SSL necessaria per Neon
const poolOptions = { 
  connectionString,
  ssl: { rejectUnauthorized: false }
};

export const db = knex({
  client: 'pg',
  connection: new Pool(poolOptions),
  pool: { min: 0, max: 10 },
  migrations: { tableName: 'knex_migrations' }
});