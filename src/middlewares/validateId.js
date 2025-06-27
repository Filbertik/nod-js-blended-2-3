// unit 3
const mongoose = require('mongoose');
const createError = require('http-errors');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, 'Invalid ID'));
  }
  next();
};

module.exports = validateId;
