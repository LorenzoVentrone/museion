// Migration to create the 'users' table
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary();           // Primary key: auto-incrementing user ID
    table.string('email', 255).notNullable().unique(); // User email, must be unique and not null
    table.string('pw_hash', 255).notNullable();        // Hashed password, not null
    table.string('first_name', 100).notNullable();     // User's first name, not null
    table.string('last_name', 100).notNullable();      // User's last name, not null
  });
};

// Migration to drop the 'users' table (rollback)
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};