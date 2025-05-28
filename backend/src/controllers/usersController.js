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
  res.status(200).json({ message: 'Logout effettuato (client side)' });
}

async function profileUpdate(req, res) {
  const { first_name, last_name, email } = req.body;
  
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const userId = req.user && req.user.user_id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const [updatedUser] = await knex('users')
      .update({ first_name, last_name, email })
      .where({ user_id: userId })
      .returning(['user_id', 'first_name', 'last_name', 'email']);
      
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') { // Violazione dell'unicità, ad es. email già in uso
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Profile update error' });
  }
}

async function changePassword (req, res) {
  const userId = req.user?.user_id;
  const { old_password, new_password } = req.body;

  if (!userId)       return res.status(401).json({ error: 'Unauthorized' });
  if (!old_password || !new_password)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const user = await knex('users').where({ user_id: userId }).first();
    if (!user || !(await bcrypt.compare(old_password, user.pw_hash))) {
      return res.status(403).json({ error: 'Old password is incorrect' });
    }

    const newHash = await bcrypt.hash(new_password, SALT_ROUNDS);
    await knex('users')
      .where({ user_id: userId })
      .update({ pw_hash: newHash });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Password update failed' });
  }
};

function logout(req, res) {
  res.status(200).json({ message: 'Logout effettuato' });
}



module.exports = {
  signup,
  signin,
  logout,
  changePassword,
  profileUpdate
};
