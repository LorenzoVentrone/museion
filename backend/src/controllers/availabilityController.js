const knex = require('../db');

/**
 * Returns the availability of all items (tickets and merch) for a given date.
 * If you want only tickets or only merch, you can filter by category on the client side or add a where clause here.
 */
async function getAvailability(req, res) {
  const { date } = req.query;

  // Return error if date is missing in the request
  if (!date) return res.status(400).json({ message: 'Missing required date' });

  try {
    // Query the availability table joined with items to get all relevant info for the given date
    const availability = await knex('availability as a')
      .join('items as i', 'a.item_id', 'i.item_id')
      .select(
        'a.item_id',
        'i.category',    // 'ticket' or 'merch'
        'i.type',        // ticket type or merch type
        'i.logo',        // only for merch
        'i.color',       // only for merch
        'i.price',
        'a.availability',
        'a.date'
      )
      .where('a.date', date);

    // Return the availability data as JSON
    res.json(availability);
  } catch (error) {
    // Log and return internal server error
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAvailability };