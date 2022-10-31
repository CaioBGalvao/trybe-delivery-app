const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret_key';
const jwtOptions = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => jwt.sign(payload, jwtSecret, jwtOptions);

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Token not found&401');
  }

  try {
    jwt.verify(authorization, jwtSecret);
  } catch (err) {
    throw new Error(`${err.message}&401`);
  }

  next();
};

module.exports = { createToken, validateToken };