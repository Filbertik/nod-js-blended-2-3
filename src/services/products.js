import { Product } from '../db/productModel.js';

export const getAll = async () => {
  return await Product.find();
};

export const getById = async (id) => {
  return await Product.findById(id);
};

export const create = async (productData) => {
  return await Product.create(productData);
};

export const update = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

export const remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};
