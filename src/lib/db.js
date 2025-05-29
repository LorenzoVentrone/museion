import knex from 'knex';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.STORAGE_2_DATABASE_URL;
if (!connectionString) {
  throw new Error('STORAGE_2_DATABASE_URL env var is missing');
}


export const db = knex({
  client: 'pg',
  connection: connectionString,
  pool: { min: 0, max: 10 },
  migrations: { tableName: 'knex_migrations' }
});