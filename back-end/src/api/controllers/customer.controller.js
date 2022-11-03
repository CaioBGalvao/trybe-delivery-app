const { customerServices } = require('../services');

const checkout = async (req, res) => {
  console.log(req.body);
  await customerServices.checkout(req.body);
  res.status(200).json({ message: 'Checkout!' });
};

module.exports = { checkout };
