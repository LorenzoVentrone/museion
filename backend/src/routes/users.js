const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Esempio di endpoint per recuperare gli ordini
router.get('/', usersController.getUsers);

// Endpoint per creare un nuovo ordine
router.post('/', usersController.createUser);

module.exports = router;