exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('order_id').notNullable();
    
    table.integer('user_id').unsigned().notNullable()
         .references('user_id')
         .inTable('users')
         .onDelete('CASCADE');
    
    table.integer('item_id').unsigned().notNullable()
         .references('item_id')
         .inTable('items')
         .onDelete('CASCADE');

    // Campi aggiuntivi per tracciare la configurazione scelta
    table.string('color'); // solo per merch, null per ticket
    table.integer('logo'); // solo per merch, null per ticket
    table.string('type');  // opzionale: puoi salvare il tipo scelto (es: 'Intero', 'shirt', ecc.)
    

    table.integer('quantity').notNullable();
    table.timestamp('order_date').defaultTo(knex.fn.now());
    table.date('date').notNullable();
    

    table.foreign(['item_id', 'date'])
         .references(['item_id', 'date'])
         .inTable('availability')
         .onDelete('CASCADE');

    
    table.primary(['order_id', 'item_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};