exports.seed = async function(knex) {
  // 1. Pulizia delle tabelle (attenzione all'ordine: orders e availability dipendono da items e users)
  await knex('orders').del();
  await knex('availability').del();
  await knex('items').del();
  await knex('users').del();

  // 2. Inserimento degli utenti di test
  const users = [
    {
      user_id: 0,
      email: 'Guest',
      pw_hash: 'Guest',
      first_name: 'Guest',
      last_name: 'Guest'
    }
  ];
  await knex('users').insert(users);

  // 3. Inserimento dei ticket (categoria: 'ticket')
  const ticketTypes = [
    { category: 'ticket', type: "Full", price: 20 },
    { category: 'ticket', type: "Reduced", price: 15 },
    { category: 'ticket', type: "VIP", price: 30 },
    { category: 'ticket', type: "Group", price: 15 }
  ];

  // 4. Generazione di combinazioni per shirt e hat (categoria: 'merch')
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

  // 5. Inserimento di tutti gli items (ticket + merch)
  const items = [
    ...ticketTypes,
    ...shirts,
    ...hats
  ];
  const insertedItems = await knex('items').insert(items).returning(['item_id']);

  // 6. Inserimento della disponibilità per ogni item per ogni giorno di giugno 2025 (dal 1° al 30)
  const availabilityEntries = [];
  // Recupera tutti gli id degli items (se non usi returning puoi fare una select su items)
  const allItems = await knex('items').select('item_id');

  for (const item of allItems) {
    for (let i = 0; i < 30; i++) {
      const d = new Date('2025-06-01');
      d.setDate(d.getDate() + i);
      // Formattiamo la data in YYYY-MM-DD
      const formattedDate = d.toISOString().split('T')[0];
      availabilityEntries.push({
          item_id: item.item_id,
          date: formattedDate,
          availability: 100
      });
    }
  }
  await knex('availability').insert(availabilityEntries);
};