const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

// Route to get availability for all items (tickets and merch) for a given date
router.get('/', availabilityController.getAvailability);

module.exports = router;