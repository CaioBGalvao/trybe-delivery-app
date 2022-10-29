const CryptoJS = require('crypto-js/md5');

const passwordValidator = ({ userPassword, dbPassword }) => {
  const decryptedPassword = CryptoJS(userPassword);
  if (dbPassword !== decryptedPassword.toString()) {
    throw new Error('Incorrect email or password&404');
  }
  return true;
};

module.exports = { passwordValidator };