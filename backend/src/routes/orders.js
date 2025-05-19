const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const {authenticateToken} = require('../middlewares/authenticate');

router.post('/createOrders', authenticateToken,ordersController.createOrder);

router.get('/getOrders', authenticateToken, ordersController.getOrders);

module.exports = router;
