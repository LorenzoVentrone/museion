exports.up = function(knex) {
  return knex.schema.createTable('tickets', table => {
    table.increments('ticket_id').primary();
    table.string('type').notNullable();
    table.decimal('price',10,2).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets');
};