const { MD5 } = require('crypto-js');

const passwordValidator = ({ userPassword, dbPassword }) => {
  const decryptedPassword = MD5(userPassword);
  if (dbPassword !== decryptedPassword.toString()) {
    throw new Error('Incorrect email or password&401');
  }
  return true;
};

module.exports = { passwordValidator };