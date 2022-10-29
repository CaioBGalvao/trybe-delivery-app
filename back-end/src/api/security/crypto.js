const CryptoJs = require('crypto-js/md5');

const passwordValidator = ({ userPassword, dbPassword }) => {
  const decryptedPassword = CryptoJs(userPassword);
  if (dbPassword !== decryptedPassword.toString()) {
    throw new Error('Incorrect email or password&401');
  }
  return true;
};

module.exports = { passwordValidator };