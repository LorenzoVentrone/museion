const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticateToken } = require('../middlewares/authenticate');

// Route for user registration (sign up)
router.post('/signup', usersController.signup);

// Route for user login (sign in)
router.post('/login', usersController.signin);

// Route for user logout (stateless, handled on client side)
router.post('/logout', usersController.logout);

// Route for updating user profile information (requires authentication)
router.put('/profileUpdate', authenticateToken, usersController.profileUpdate);

// Route for changing user password (requires authentication)
router.patch('/changePassword', authenticateToken, usersController.changePassword);

// Route for validating JWT token and returning user info (requires authentication)
router.get('/validate', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;