/** @type {import('knex').Knex.Config} */
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './migrations' },   // <-- root paths
    seeds:      { directory: './seeds'      },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './migrations' },
    seeds:      { directory: './seeds'      },
  },
};
