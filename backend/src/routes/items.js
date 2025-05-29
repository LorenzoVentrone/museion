/* -------------------------------------------- */
/* This route is used for the checkout process  */
/* -------------------------------------------- */

const express = require('express');
const router = express.Router();
const knex = require('../db');

// Route to get all merchandise items (category: 'merch')
router.get('/merch', async (req, res) => {
  try {
    const merch = await knex('items').where({ category: 'merch' });
    res.json(merch);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving merch items' });
  }
});

module.exports = router;