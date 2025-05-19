// controllers/availability.js
const knex = require('../db');

async function getAvailability(req, res) {
  const { date } = req.query;

  if (!date) return res.status(400).json({ message: 'Data richiesta mancante' });

  try {
    const availability = await knex('availability as a')
      .join('tickets as t', 'a.ticket_id', 't.ticket_id')
      .select(
        'a.ticket_id',
        't.type',
        't.price',
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
