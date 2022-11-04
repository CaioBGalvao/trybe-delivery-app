const Joi = require('joi');

const checkoutSchema = Joi.object({
  userId: Joi.string().pattern(/^[0-9]+$/).empty('').required()
  .messages({
    'string.pattern.base': 'userId must be a string of numbers&400',
    'string.empty': 'userId is required&400',
    'any.required': 'userId is required&400',
  }),
  sellerId: Joi.string().pattern(/^[0-9]+$/).empty('').required()
  .messages({
    'string.pattern.base': 'sellerId must be a string of numbers&400',
    'string.empty': 'sellerId is required&400',
    'any.required': 'sellerId is required&400',
  }),
  salesProducts: Joi.array().items(Joi.object({
    productId: Joi.string().pattern(/^[0-9]+$/).empty('').required()
    .messages({
      'string.pattern.base': 'productId must be a string of numbers&400',
      'string.empty': 'productId is required&400',
      'any.required': 'productId is required&400',
    }),
    quantity: Joi.string().pattern(/^[0-9]+$/).empty('').required()
    .messages({
      'string.pattern.base': 'quantity must be a string of numbers&400',
      'string.empty': 'quantity is required&400',
      'any.required': 'quantity is required&400',
    }),
  })).empty().required()
  .messages({
    'array.empty': 'salesProducts is required&400',
    'any.required': 'salesProducts is required&400',
  }),
  deliveryAddress: Joi.string().empty('').required().messages({
    'string.empty': 'deliveryAddress is required&400',
    'any.required': 'deliveryAddress is required&400',
  }),
  deliveryNumber: Joi.string().pattern(/^[0-9]+$/).empty('').required()
  .messages({
    'string.pattern.base': 'deliveryNumber must be a string of numbers&400',
    'string.empty': 'deliveryNumber is required&400',
    'any.required': 'deliveryNumber is required&400',
  }),
  totalPrice: Joi.string().pattern(/^\d+(.\d{2,2})?$/).empty('').required()
  .messages({
    'string.pattern.base': 'totalPrice must be a string of numbers&400',
    'string.empty': 'totalPrice is required&400',
    'any.required': 'totalPrice is required&400',
  }),
});

const validateSales = (objSale) => {
  const { error, value } = checkoutSchema.validate(objSale);

  if (error) {
    throw error;
  }

  return value;
};

module.exports = validateSales;