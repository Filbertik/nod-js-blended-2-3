// unit 3 3
const Joi = require('joi');
const { validateBody } = require('./validateBody');

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateBody,
  userRegisterSchema,
  userLoginSchema,
};
