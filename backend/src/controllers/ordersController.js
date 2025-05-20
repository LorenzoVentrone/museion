const knex = require('../db');

async function createOrder(req, res) {
  const userId = req.user?.user_id;
  const { items } = req.body;

  if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Ordine vuoto' });
  }

  const trx = await knex.transaction();

  try {
    // Verifica e aggiorna disponibilità per ciascun item
    for (const item of items) {
      const { ticket_id, date, quantity } = item;

      if (!ticket_id || !date || !quantity || quantity <= 0) {
        await trx.rollback();
        return res.status(400).json({ error: 'Dati ordine non validi' });
      }

      // Controlla che il ticket esista
      const ticketExists = await trx('tickets')
        .where({ ticket_id })
        .first();

      if (!ticketExists) {
        await trx.rollback();
        return res.status(404).json({ error: `Ticket ID ${ticket_id} non trovato` });
      }

      // Verifica disponibilità per il ticket alla data scelta
      const availability = await trx('availability')
        .where({ ticket_id, date })
        .first();

      if (!availability || availability.quantity < quantity) {
        await trx.rollback();
        return res.status(400).json({
          error: `Disponibilità insufficiente per il ticket ${ticket_id} alla data ${date}`,
        });
      } 
    }

    // Inserimento dell'ordine: usiamo il campo "date" per indicare il giorno scelto
    const [orderRow] = await trx('orders')
      .insert({
        user_id: userId,
        ticket_id: items[0].ticket_id,
        quantity: items[0].quantity,
        date: items[0].date  // Usa il campo "date" per il giorno scelto
      })
      .returning(['order_id', 'order_date']);

    const { order_id } = orderRow;

    // Inserimento degli ulteriori item se presenti
    const additionalItems = items.slice(1).map(item => ({
      order_id,
      user_id: userId,
      ticket_id: item.ticket_id,
      quantity: item.quantity,
      date: item.date  // Usa il campo "date" per ogni item
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
    const orders = await knex('orders as o').join('tickets as t', 'o.ticket_id', 't.ticket_id')
      .where({ user_id: userId })
      .select('order_id', 't.type', 'quantity', 'order_date','t.price','o.date');

    const infoDashBoard = await knex('users')
      .select('*').where({user_id: userId})

    res.status(200).json({ "orders": orders, "infoUser": infoDashBoard });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero degli ordini' });
  }
}


module.exports = {
  createOrder,getOrders
};
