const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Esempio di endpoint per recuperare gli ordini
router.get('orders/getOrders', ordersController.getOrders);

// Endpoint per creare un nuovo ordine
router.post('orders/createOrders', ordersController.createOrder);

module.exports = router;