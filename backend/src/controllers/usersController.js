const knex = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');


const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto'; // Usa dotenv

// Sign Up
async function signup(req, res) {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  try {
    const pw_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const [user] = await knex('users')
      .insert({ email, pw_hash, first_name, last_name })
      .returning(['user_id', 'email', 'first_name', 'last_name']);

    res.status(201).json(user);

  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // Unique violation (PostgreSQL)
      res.status(409).json({ error: 'Email già registrata' });
    } else {
      res.status(500).json({ error: 'Errore nel signup' });
    }
  }
}

// Sign In
async function signin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password obbligatorie' });
  }

  try {
    const user = await knex('users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.pw_hash))) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const token = generateToken(user);

    res.status(201).json({ token, user: { user_id: user.user_id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel login' });
  }
}

// Logout (stateless, lato client)
function logout(req, res) {
  // !! TODO!! ELIMINARE IL TOKEN NELLA PARTE CLIENT PER IL LOGOUT
  res.status(200).json({ message: 'Logout effettuato (client side)' });
}


module.exports = {
  signup,
  signin,
  logout
};
