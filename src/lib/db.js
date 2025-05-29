/* eslint-disable no-var */
import knex from 'knex';
import { Pool } from '@neondatabase/serverless';

/** Connection string impostata in .env (.local) e su Vercel */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL env var is missing');
}

/**
 * In dev Next ri-importa il modulo a ogni hot-reload.
 * Salviamo l’istanza in una variabile globale per non
 * creare nuovi pool a ripetizione.
 */
var globalForKnex = globalThis;

// Utilizziamo sempre la stessa configurazione senza distinzioni per production
const poolOptions = { connectionString };

export const db =
  globalForKnex.__knex ??
  knex({
    client: 'pg',
    connection: new Pool(poolOptions),
    pool: { min: 0, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  });

if (process.env.NODE_ENV !== 'production') {
  globalForKnex.__knex = db;
}