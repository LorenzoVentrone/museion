const knex = require('../db');

/**
 * Creates a new order for the authenticated user.
 * Checks item existence and availability (for tickets), then inserts the order and its items.
 */
async function createOrder(req, res) {
  const userId = req.user?.user_id;
  const { items } = req.body;

  // Uncomment for debugging
  // console.log('ORDER RECEIVED FROM FRONTEND:', JSON.stringify(req.body, null, 2));

  // User must be authenticated
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  // Order must contain at least one item
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Empty order' });
  }

  // Start transaction
  const trx = await knex.transaction();

  try {
    // Check and update availability for each item
    for (const item of items) {
      const { item_id, date, quantity, type } = item;

      // Quick check: if type is 'hat' or 'shirt', it's merch; otherwise, it's a ticket
      // (see 'category' attribute in items table)
      // This is a shortcut and may need to be updated if more item types are added
      const isMerch = type === 'hat' || type === 'shirt';

      // For merch (category === 'merch'), date is NOT required
      if (!item_id || !quantity || quantity <= 0 || (!isMerch && !date)) {
        await trx.rollback();
        return res.status(400).json({ error: 'Invalid order data' });
      }

      // Check if the item exists
      const itemExists = await trx('items')
        .where({ item_id })
        .first();

      if (!itemExists) {
        await trx.rollback();
        return res.status(404).json({ error: `Item ID ${item_id} not found` });
      }

      // For tickets only: check availability (not needed for merch)
      if (!isMerch) {
        const availability = await trx('availability')
          .where({ item_id, date })
          .first();

        if (!availability || availability.availability < quantity) {
          await trx.rollback();
          return res.status(400).json({
            error: `Insufficient availability for item ${item_id} on date ${date}`,
          });
        }
      }
    }

    // Insert the main order (first item)
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

    // Insert additional items if present
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
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Error creating order.' });
  }
}

/**
 * Retrieves all orders for the authenticated user, joining with item info.
 * Also returns user dashboard info.
 */
async function getOrders(req, res) {
  const userId = req.user.user_id;

  try {
    // Get all orders for the user, joined with item info
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

    // Get user dashboard info
    const infoDashBoard = await knex('users')
      .select('*').where({ user_id: userId });

    res.status(200).json({ "orders": orders, "infoUser": infoDashBoard });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
}

module.exports = {
  createOrder,
  getOrders
};