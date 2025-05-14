const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

/**
 * Genera un token JWT per l'utente autenticato.
 * @param {Object} user - Oggetto utente con almeno user_id ed email.
 * @returns {string} token firmato
 */
function generateToken(user) {
  return jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

/**
 * Verifica un token JWT e restituisce il payload se valido.
 * @param {string} token - Token JWT da verificare.
 * @returns {Object|null} payload decodificato o null in caso di errore.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
