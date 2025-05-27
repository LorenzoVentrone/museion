exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('item_id').primary();
    table.string('category').notNullable(); // 'ticket' o 'merch'
    table.string('type').notNullable();     // 'Intero', 'Ridotto', 'shirt', 'hat', ecc.
    table.string('logo');                   // solo per merch
    table.string('color');                  // solo per merch
    table.decimal('price', 10, 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};