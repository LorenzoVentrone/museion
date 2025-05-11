exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
      table.increments('order_id').primary();
      table.integer('user_id').unsigned().notNullable()
           .references('user_id').inTable('users').onDelete('CASCADE');
      table.integer('ticket_id').unsigned().notNullable()
           .references('ticket_id').inTable('ticket_availability').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('total_price', 10, 2).notNullable();
      table.timestamp('order_date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
  };
  
