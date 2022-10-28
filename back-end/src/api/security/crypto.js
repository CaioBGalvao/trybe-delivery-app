const CryptoJS = require('crypto-js/md5');

const passwordValidator = ({ userPassword, dbPassword }) => {
  const decryptedPassword = CryptoJS.MD5(dbPassword);
  if (userPassword !== decryptedPassword) {
    throw new Error('Incorrect email or password&401');
  }
  return true;
};

module.exports = { passwordValidator };