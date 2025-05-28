const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../utils/jwt');
const {authenticateToken} = require('../middlewares/authenticate');

router.post('/signup', usersController.signup);
router.post('/login', usersController.signin);
router.post('/logout', usersController.logout);
router.put('/profileUpdate',authenticateToken,usersController.profileUpdate);
router.patch('/changePassword', authenticateToken,usersController.changePassword);

router.get('/validate', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
