
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary(); // Chiave primaria auto-incrementante
      table.string('email').notNullable().unique(); // Email unica e obbligatoria
      table.string('pw_hash').notNullable(); // Hash della password
      table.string('first_name').notNullable(); // Nome
      table.string('last_name').notNullable(); // Cognome
    });
  };
  
exports.down = function(knex) {
return knex.schema.dropTableIfExists('users');
};

  
