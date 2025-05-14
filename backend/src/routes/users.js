const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/signup', usersController.signup);
router.post('/login', usersController.signin);
router.post('/logout', usersController.logout); // anche GET se preferisci

module.exports = router;
