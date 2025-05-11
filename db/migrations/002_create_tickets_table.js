exports.up = function(knex) {
    return knex.schema.createTable('ticket_availability', table => {
      table.increments('ticket_id').primary();
      table.date('date').notNullable().unique();
      table.integer('ticket_available').notNullable();
      table.integer('ticket_sold').notNullable().defaultTo(0);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ticket_availability');
  };