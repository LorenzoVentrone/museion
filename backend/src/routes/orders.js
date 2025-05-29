const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { authenticateToken } = require('../middlewares/authenticate');

// Route to create a new order (requires authentication)
router.post('/createOrders', authenticateToken, ordersController.createOrder);

// Route to get all orders for the authenticated user
router.get('/getOrders', authenticateToken, ordersController.getOrders);

module.exports = router;