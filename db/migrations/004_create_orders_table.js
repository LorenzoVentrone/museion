exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
      table.increments('order_id').notNullable();
      table.integer('user_id').unsigned().notNullable()
           .references('user_id').inTable('users').onDelete('CASCADE');
      table.integer('ticket_id').unsigned().notNullable()
           .references('ticket_id').inTable('tickets').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.timestamp('order_date').defaultTo(knex.fn.now());

      table.primary(['order_id','ticket_id']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
  };

   
