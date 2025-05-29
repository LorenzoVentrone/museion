// Migration to create the 'orders' table
exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('order_id').notNullable(); // Primary key: auto-incrementing order ID

    // Foreign key: references user_id in 'users' table
    table.integer('user_id').unsigned().notNullable()
         .references('user_id')
         .inTable('users')
         .onDelete('CASCADE');

    // Foreign key: references item_id in 'items' table
    table.integer('item_id').unsigned().notNullable()
         .references('item_id')
         .inTable('items')
         .onDelete('CASCADE');

    // Additional fields to track chosen configuration
    table.string('color'); // Only for merch, null for tickets
    table.string('logo');  // Only for merch, null for tickets
    table.string('type');  // Optional: can save the chosen type (e.g., 'Full', 'shirt', etc.)

    table.integer('quantity').notNullable(); // Quantity of items ordered
    table.timestamp('order_date').defaultTo(knex.fn.now()); // Order creation timestamp
    table.date('date').nullable(); // Nullable date allows merch to be sold at any time

    // Foreign key: references composite key (item_id, date) in 'availability' table
    table.foreign(['item_id', 'date'])
         .references(['item_id', 'date'])
         .inTable('availability')
         .onDelete('CASCADE');

    // Composite primary key: order_id + item_id
    table.primary(['order_id', 'item_id']);
  });
};

// Migration to drop the 'orders' table (rollback)
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};