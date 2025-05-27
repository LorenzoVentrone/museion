exports.up = function(knex) {
  return knex.schema.createTable('availability', table => {
    table.integer('item_id').unsigned().notNullable();
    table.date('date').notNullable();

    // Aggiungi il constraint di CHECK (disponibilità non negativa)
    table.integer('availability').notNullable();

    // Definisci la chiave primaria composta da item_id e date
    table.primary(['item_id', 'date']);

    // Imposta la foreign key su item_id che fa riferimento ad 'items'
    table.foreign('item_id').references('item_id').inTable('items').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('availability');
};