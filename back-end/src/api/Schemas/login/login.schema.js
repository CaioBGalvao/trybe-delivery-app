const Joi = require('joi');

const loginSchema = Joi.object({
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
});

const validateLogin = (userObject) => {
  const { error, value } = loginSchema.validate(userObject);

  if (error) {
    throw error;
  }

  return value;
};

export default validateLogin;