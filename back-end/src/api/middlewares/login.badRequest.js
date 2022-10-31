const loginBodyVerify = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('All fields must be filled&400');
  }
  next();
};

const createBodyVerify = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    throw new Error('All fields must be filled&400');
  }

  if (role) {
    throw new Error('Role cannot be registered&400');
  }

  next();
};

module.exports = { loginBodyVerify, createBodyVerify };