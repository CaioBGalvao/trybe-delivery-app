const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const jwtSecret = fs
  .readFileSync(path
    .join(__dirname, '..', '..', '..', 'jwt.evaluation.key'), 'utf8');
const jwtOptions = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => jwt.sign(payload, jwtSecret, jwtOptions);

const validateTokenParams = (doINeedEmail = false) => {
  const validateToken = (req, _res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Token not found&401');
    }

    try {
      const email = jwt.verify(authorization, jwtSecret);
      if (doINeedEmail) {
        req.headers.email = email;
      }
    } catch (err) {
      throw new Error(`${err.message}&401`);
    }

    next();
  };
  return validateToken;
};

module.exports = { createToken, validateTokenParams };