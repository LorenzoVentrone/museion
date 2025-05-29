import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET missing');

export const generateToken = (user) =>
  jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

export const verifyToken = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, JWT_SECRET, (err, dec) => (err ? rej(err) : res(dec)))
  );
