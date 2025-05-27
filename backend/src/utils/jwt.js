const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

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


module.exports = {
  generateToken,
};
