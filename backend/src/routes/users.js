const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../utils/jwt');

router.post('/signup', usersController.signup);
router.post('/login', usersController.signin);
router.post('/logout', usersController.logout); // anche GET se preferisci

router.get('/validate', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Token non valido o scaduto' });
  }

  res.json({ success: true, user: payload });
});

module.exports = router;
