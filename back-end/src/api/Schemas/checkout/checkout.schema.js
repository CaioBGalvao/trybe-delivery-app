const Joi = require('joi');

const checkoutSchema = Joi.object({
  userId: Joi.string().pattern(/^[0-9]+$/).empty('').required()
  .messages({
    'string.pattern.base': 'userId must be a string of numbers&400',
    'string.empty': 'userId is required&400',
    'any.required': 'userId is required&400',
  }),
  sellerId: Joi.string().pattern(/^[0-9]+$/).required(),
  salesProducts: Joi.array().items(Joi.object({
    productId: Joi.string().pattern(/^[0-9]+$/).required(),
    quantity: Joi.string().pattern(/^[0-9]+$/).required(),
  })).required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().pattern(/^[0-9]+$/).required(),
  totalPrice: Joi.string().pattern(/^\d+(.\d{2,2})?$/).required(),
});

const validateSales = (objSale) => {
  const { error, value } = checkoutSchema.validate(objSale);

  if (error) {
    throw error;
  }

  return value;
};

module.exports = validateSales;