// Migration to create the 'availability' table
exports.up = function(knex) {
  return knex.schema.createTable('availability', table => {
    table.integer('item_id').unsigned().notNullable();        // Foreign key: references item_id in 'items'
    table.date('date').notNullable();                         // Date for which availability is set

    table.integer('availability').notNullable();              // Number of available items (must be non-negative)

    table.primary(['item_id', 'date']);                       // Composite primary key: item_id + date

    table.foreign('item_id').references('item_id').inTable('items').onDelete('CASCADE'); // Foreign key constraint
  });
};

// Migration to drop the 'availability' table (rollback)
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('availability');
};