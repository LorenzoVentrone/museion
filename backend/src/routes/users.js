const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Esempio di endpoint per recuperare gli ordini
router.post('/users/signup', usersController.signup);

// Endpoint per creare un nuovo ordine
router.post('/users/login', usersController.login);

module.exports = router;