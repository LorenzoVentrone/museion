/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // 1. Svuota tutte le tabelle (attenzione all'ordine per vincoli FK)
  await knex('orders').del();
  await knex('ticket_availability').del();
  await knex('users').del();

  // 2. Inserisci un utente di esempio
  const inserted_user = await knex('users')
    .insert({
      email: 'user@example.com',
      pw_hash: '$2b$10$Xqz0fakeHashvalue1DqIUuMUbXnYy23gvs9z', // hash fittizio
      first_name: 'Mario',
      last_name: 'Rossi'
    })
    .returning('user_id');
    const user_id = inserted_user[0].user_id

  // 3. Inserisci disponibilità biglietti
  const inserted_ticket = await knex('ticket_availability')
  .insert([
    { date: '2025-06-01', ticket_available: 100, ticket_sold: 0 },
    { date: '2025-06-02', ticket_available: 80, ticket_sold: 0 }
  ])
  .returning('ticket_id');

  const ticket1 = inserted_ticket[0].ticket_id;
  const ticket2 = inserted_ticket[1].ticket_id;

  

  // 4. Inserisci un ordine fittizio
  await knex('orders').insert({
    user_id: user_id,
    ticket_id: ticket1,
    quantity: 2,
    total_price: 24.00, // 12€ * 2
    order_date: knex.fn.now()
  });
};

