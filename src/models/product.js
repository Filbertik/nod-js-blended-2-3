// unit 3 5
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Product', productSchema);
