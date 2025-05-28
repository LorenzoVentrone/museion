const knex = require('../db');

async function createOrder(req, res) {
  const userId = req.user?.user_id;
  const { items } = req.body;
  
  
  /* DEBUGGING PURPOSES */
  /* console.log('ORDINE RICEVUTO DAL FRONTEND:', JSON.stringify(req.body, null, 2)); */

  if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Ordine vuoto' });
  }

  const trx = await knex.transaction();

  try {
    // Verifica e aggiorna disponibilità per ciascun item
    for (const item of items) {
      const { item_id, date, quantity, type } = item;
      
      /* -------------------------------------------- */
      /* i'm lazy, non mi va di andare nel frontend, tanto ho solo sue tipi, quindi se è uno di 
      questi allora è un merch, altrimenti è un tickets (see attribute category in table items) 
      Potremmo avere problemi se aggiungiamo più item ma sticazzi*/
      /* -------------------------------------------- */
      const isMerch = type === 'hat' || type === 'shirt';

      // Se è merch (category === 'merch'), la data NON è obbligatoria
      if (!item_id || !quantity || quantity <= 0 || (!isMerch && !date)) {
        await trx.rollback();
        return res.status(400).json({ error: 'Dati ordine non validi' });
      }
      // Controlla che l'item esista
      const itemExists = await trx('items')
        .where({ item_id })
        .first();
    
      if (!itemExists) {
        await trx.rollback();
        return res.status(404).json({ error: `Item ID ${item_id} non trovato` });
      }
    
      // SOLO PER I TICKET controllo disponibilità, per il merch non c'è bisogno, see isMerch and the relative if above
      if (!isMerch) {
        const availability = await trx('availability')
          .where({ item_id, date })
          .first();

        if (!availability || availability.availability < quantity) {
          await trx.rollback();
          return res.status(400).json({
            error: `Disponibilità insufficiente per l'item ${item_id} alla data ${date}`,
          });
        }
      }
    }

    // Inserimento dell'ordine principale
    const [orderRow] = await trx('orders')
      .insert({
        user_id: userId,
        item_id: items[0].item_id,
        quantity: items[0].quantity,
        date: items[0].date,
        color: items[0].color || null,
        logo: items[0].logo || null,
        type: items[0].type || null
      })
      .returning(['order_id', 'order_date']);

    const { order_id } = orderRow;

    // Inserimento degli ulteriori item se presenti
    const additionalItems = items.slice(1).map(item => ({
      order_id,
      user_id: userId,
      item_id: item.item_id,
      quantity: item.quantity,
      date: item.date,
      color: item.color || null,
      logo: item.logo || null,
      type: item.type || null
    }));

    if (additionalItems.length > 0) {
      await trx('orders').insert(additionalItems);
    }

    await trx.commit();

    res.status(201).json({ order_id });

  } catch (err) {
    await trx.rollback();
    console.error('Errore nella creazione ordine:', err);
    res.status(500).json({ error: 'Errore nella creazione dell’ordine.' });
  }
}

async function getOrders(req, res) {
  const userId = req.user.user_id;

  try {
    const orders = await knex('orders as o')
      .join('items as i', 'o.item_id', 'i.item_id')
      .where({ 'o.user_id': userId })
      .select(
        'o.order_id',
        'i.item_id',
        'i.type',
        'i.category',
        'o.quantity',
        'o.order_date',
        'i.price',
        'o.date',
        'o.color',
        'o.logo'
      );

    const infoDashBoard = await knex('users')
      .select('*').where({ user_id: userId });

    res.status(200).json({ "orders": orders, "infoUser": infoDashBoard });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero degli ordini' });
  }
}

module.exports = {
  createOrder,
  getOrders
};