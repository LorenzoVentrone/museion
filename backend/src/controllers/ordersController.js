const knex = require('../db');

exports.getOrders = async (req, res) => {
  try {
    const orders = await knex('orders').select('*');
    res.json(orders);
  } catch (error) {
    console.error('Errore durante il recupero degli ordini:', error);
    res.status(500).json({ error: 'Errore durante il recupero degli ordini' });
  }
};

exports.createOrder = async (req, res) => {

  try {
    const ticket_price = 14.99;
    // Estrai i dati necessari dal body
    const { user_id, ticket_id, quantity} = req.body;
    
    // Validazione minima
    if (!user_id || !ticket_id || !quantity) {
        return res.status(400).json({ error: 'Dati mancanti. Assicurati di inviare user_id, ticket_id, quantity e total_paid.' });
    }

    const availabilityData = await knex('ticket_availability')
        .select('ticket_available')
        .where('ticket_id', ticket_id)
        .first();

    console.log(availabilityData);
    
    if (!availabilityData || availabilityData.ticket_available < quantity) {
        return res.status(400).json({ 
            error: 'Disponibilità insufficiente per il ticket richiesto.' 
        });
    }

    const total_price = quantity * ticket_price
    
    
    // Inserisci il nuovo ordine
    // Nota: assicurati che la tabella orders abbia le colonne indicate (user_id, ticket_id, quantity, total_paid, etc.)
    const [newOrder] = await knex('orders')
      .insert({ user_id, ticket_id, quantity, total_price, order_date: new Date() })
      .returning('*');
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error);
    res.status(500).json({ error: 'Errore durante la creazione dell\'ordine' });
  }
};