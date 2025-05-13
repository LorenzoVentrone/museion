exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('user_id').primary();
      table.string('email', 255).notNullable().unique();
      table.string('pw_hash', 255).notNullable();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  

  
