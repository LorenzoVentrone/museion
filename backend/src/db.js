const environment = process.env.NODE_ENV || 'development';
const knexfile = require('../knexfile');
const config = knexfile[environment] || knexfile.development;
const knex = require('knex')(config);

module.exports = knex;