exports.seed = async function(knex) {
  // 1. Pulisci le tabelle nell'ordine corretto per rispettare i vincoli di foreign key
  await knex('orders').del();
  await knex('availability').del();
  await knex('items').del();
  await knex('users').del();

  // 2. Inserisci utenti di test
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
  await knex('users').insert(users);

  // 3. Inserisci biglietti (category: 'ticket')
  const ticketTypes = [
    { category: 'ticket', type: "Intero", price: 20 },
    { category: 'ticket', type: "Ridotto", price: 15 },
    { category: 'ticket', type: "VIP", price: 30 },
    { category: 'ticket', type: "Gruppi", price: 15 }
  ];

  // 4. Genera tutte le combinazioni di magliette e cappelli (category: 'merch')
  const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'];
  const logos = ['banner1', 'banner2', 'banner3', 'banner4'];
  
  const shirts = [];
  const hats = [];
  colors.forEach(color => {
    logos.forEach(logo => {
      shirts.push({
        category: 'merch',
        type: 'shirt',
        color,
        logo,
        price: 25
      });
      hats.push({
        category: 'merch',
        type: 'hat',
        color,
        logo,
        price: 18
      });
    });
  });

  // 5. Inserisci tutti gli item (biglietti + merch)
  const items = [
    ...ticketTypes,
    ...shirts,
    ...hats
  ];
  const insertedItems = await knex('items').insert(items).returning(['item_id']);

  // 6. Inserisci disponibilità per tutti gli item (sia ticket che merch)
  const availabilityEntries = insertedItems.map(itemObj => ({
    item_id: itemObj.item_id,
    date: '2025-06-01',
    availability: 100
  }));
  await knex('availability').insert(availabilityEntries);

};