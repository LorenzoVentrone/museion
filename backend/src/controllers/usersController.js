const knex = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto'; // Use dotenv

// User registration (Sign Up)
async function signup(req, res) {
  const { email, password, first_name, last_name } = req.body;

  // All fields are required
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const pw_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert the new user into the database
    const [user] = await knex('users')
      .insert({ email, pw_hash, first_name, last_name })
      .returning(['user_id', 'email', 'first_name', 'last_name']);

    res.status(201).json(user);

  } catch (err) {
    console.error(err);
    // Handle unique email violation (PostgreSQL error code 23505)
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Signup error' });
    }
  }
}

// User login (Sign In)
async function signin(req, res) {
  const { email, password } = req.body;

  // Email and password are required
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await knex('users').where({ email }).first();

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.pw_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ token, user: { user_id: user.user_id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login error' });
  }
}

// Logout (stateless, handled on client side)
function logout(req, res) {
  res.status(200).json({ message: 'Logout performed (client side)' });
}

// Update user profile information
async function profileUpdate(req, res) {
  const { first_name, last_name, email } = req.body;
  
  // All fields are required
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const userId = req.user && req.user.user_id;
  
  // User must be authenticated
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    // Update user info in the database
    const [updatedUser] = await knex('users')
      .update({ first_name, last_name, email })
      .where({ user_id: userId })
      .returning(['user_id', 'first_name', 'last_name', 'email']);
      
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    // Handle unique email violation
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Profile update error' });
  }
}

// Change user password
async function changePassword (req, res) {
  const userId = req.user?.user_id;
  const { old_password, new_password } = req.body;

  // User must be authenticated
  if (!userId)       return res.status(401).json({ error: 'Unauthorized' });
  // Both old and new passwords are required
  if (!old_password || !new_password)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    // Find user by ID and check old password
    const user = await knex('users').where({ user_id: userId }).first();
    if (!user || !(await bcrypt.compare(old_password, user.pw_hash))) {
      return res.status(403).json({ error: 'Old password is incorrect' });
    }

    // Hash and update the new password
    const newHash = await bcrypt.hash(new_password, SALT_ROUNDS);
    await knex('users')
      .where({ user_id: userId })
      .update({ pw_hash: newHash });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Password update failed' });
  }
}

// Logout (duplicate, but kept for compatibility)
function logout(req, res) {
  res.status(200).json({ message: 'Logout performed' });
}

module.exports = {
  signup,
  signin,
  logout,
  changePassword,
  profileUpdate
};