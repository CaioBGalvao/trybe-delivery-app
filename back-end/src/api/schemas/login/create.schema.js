const Joi = require('joi');

const newUserSchema = Joi.object({
  name: Joi.string().empty('').required().messages({
    'string.base': 'Name need to be a string&400',
    'string.empty': 'Name is required&400',
    'any.required': 'Name is required&400',
  }),
  email: Joi.string().email().empty('').required()
    .messages({
      'string.base': 'Email need to be a string&400',
      'string.email': 'This email is not valid&400',
      'string.empty': 'Email is required&400',
      'any.required': 'Email is required&400',
    }),
  password: Joi.string().empty('').required()
    .messages({
      'string.base': 'Password need to be a string&400',
      'string.empty': 'Password is required&400',
      'any.required': 'Password is required&400',
    }),
  role: Joi.string().empty('').optional()
    .message('Role need to bem a string&400'),
});

const validateNewLogin = (newUserObject) => {
  const { error, value } = newUserSchema.validate(newUserObject);

  if (error) {
    throw error;
  }

  return value;
};

module.exports = validateNewLogin;