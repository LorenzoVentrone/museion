exports.up = function(knex) {
  return knex.schema.createTable('availability', table => {
    table.integer('ticket_id').notNullable();
    table.date('date').notNullable();
    table.integer('availability').notNullable();
    
    // Definisci la chiave primaria composta da ticket_id e date
    table.primary(['ticket_id', 'date']);
    
    // Imposta la foreign key su ticket_id che fa riferimento ad 'tickets'
    table.foreign('ticket_id')
         .references('ticket_id')
         .inTable('tickets')
         .onDelete('CASCADE');
  })
  .then(() => {
    // Aggiungi il constraint di CHECK (disponibilità non negativa)
    return knex.raw(`
      ALTER TABLE availability
      ADD CONSTRAINT availability_check CHECK (availability >= 0)
    `);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('availability');
};