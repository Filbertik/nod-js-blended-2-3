// unit 3
const createError = require('http-errors');
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
});

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) next(createError(400, error.message));
    else next();
  };
}

module.exports = { validateBody, productSchema };

// const createError = require('http-errors');

// const validateBody = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return next(
//         createError(400, error.details.map((d) => d.message).join(', ')),
//       );
//     }
//     next();
//   };
// };

// module.exports = validateBody;
