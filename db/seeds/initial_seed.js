exports.seed = async function(knex) {
  // 1. Pulisci le tabelle: assicurati di rispettare l'ordine dei vincoli FK
  await knex('orders').del();
  await knex('availability').del();
  await knex('tickets').del();
  await knex('users').del();

  // 2. Inserisci 3 utenti
  const users = [
    {
      email: 'user1@example.com',
      pw_hash: '$2b$10$fakehash1', // hash fittizio per test
      first_name: 'Mario',
      last_name: 'Rossi'
    },
    {
      email: 'user2@example.com',
      pw_hash: '$2b$10$fakehash2',
      first_name: 'Luigi',
      last_name: 'Verdi'
    },
    {
      email: 'user3@example.com',
      pw_hash: '$2b$10$fakehash3',
      first_name: 'Anna',
      last_name: 'Bianchi'
    },
    {
      user_id: 0,
      email: 'Guest',
      pw_hash: 'Guest',
      first_name: 'Guest',
      last_name: 'Guest'
    }
  ];
  const insertedUsers = await knex('users')
    .insert(users)
    .returning('user_id'); 

  // 3. Inserisci 4 biglietti
  const tickets = [
    { type: "Intero", price: 20 },
    { type: "Ridotto", price: 15 },
    { type: "VIP", price: 30 },
    { type: "Gruppi", price: 15 }
  ];
  const insertedTickets = await knex('tickets')
    .insert(tickets)
    .returning('ticket_id');

  // 4. Imposta le disponibilità giornaliere per una data fissa (es. 2025-06-01)
  // Per ogni biglietto, inserisce una riga di disponibilità
  const availabilityEntries = insertedTickets.map(ticketObj => ({
    ticket_id: ticketObj.ticket_id,
    date: '2025-06-01',
    // Qui puoi personalizzare il valore di disponibilità: ad esempio, 100 per tutti
    availability: 100
  }));

  await knex('availability').insert(availabilityEntries);

};