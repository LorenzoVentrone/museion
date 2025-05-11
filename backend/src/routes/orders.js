const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Esempio di endpoint per recuperare gli ordini
router.get('/', ordersController.getOrders);

// Endpoint per creare un nuovo ordine
router.post('/', ordersController.createOrder);

module.exports = router;