const CryptoJs = require('crypto-js/md5');

const passwordValidator = ({ userPassword, dbPassword }) => {
  const encriptedPassword = CryptoJs(userPassword);
  if (dbPassword !== encriptedPassword.toString()) {
    throw new Error('Incorrect email or password&404');
  }
  return true;
};

const encriptPassword = (newUserPassword) => {
  const encriptedPassword = CryptoJs(newUserPassword);
  return encriptedPassword.toString();
};

module.exports = { passwordValidator, encriptPassword };