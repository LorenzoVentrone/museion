// Migration to create the 'items' table
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('item_id').primary();              // Primary key: auto-incrementing item ID
    table.string('category').notNullable();             // 'ticket' or 'merch'
    table.string('type').notNullable();                 // 'Full', 'Reduced', 'shirt', 'hat', etc.
    table.string('logo');                               // Only for merch
    table.string('color');                              // Only for merch
    table.decimal('price', 10, 2).notNullable();        // Item price, not null
  });
};

// Migration to drop the 'items' table (rollback)
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};