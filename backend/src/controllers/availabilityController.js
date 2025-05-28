const knex = require('../db');

/**
 * Restituisce la disponibilità di tutti gli item (ticket e merch) per una certa data.
 * Se vuoi solo i ticket o solo il merch, puoi filtrare per category lato client o aggiungere una where qui.
 */
async function getAvailability(req, res) {
  const { date } = req.query;

  if (!date) return res.status(400).json({ message: 'Data richiesta mancante' });

  try {
    const availability = await knex('availability as a')
      .join('items as i', 'a.item_id', 'i.item_id')
      .select(
        'a.item_id',
        'i.category',    // 'ticket' o 'merch'
        'i.type',        // tipo biglietto o tipo merch
        'i.logo',        // solo per merch
        'i.color',       // solo per merch
        'i.price',
        'a.availability',
        'a.date'
      )
      .where('a.date', date);

    res.json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore interno' });
  }
}

module.exports = { getAvailability };
