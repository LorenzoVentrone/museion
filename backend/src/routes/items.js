/* -------------------------------------------- */
/* I needed this route for the checkout */
/* -------------------------------------------- */


const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/merch', async (req, res) => {
  try {
    const merch = await knex('items').where({ category: 'merch' });
    res.json(merch);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei merch' });
  }
});

module.exports = router;