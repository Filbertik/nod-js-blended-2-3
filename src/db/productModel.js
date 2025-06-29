import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      default: 'other',
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true },
);

export const Product = model('Product', productSchema);
