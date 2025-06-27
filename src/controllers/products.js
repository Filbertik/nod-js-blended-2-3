import * as productsService from '../services/products.js';
import createError from 'http-errors';

export const getAllProducts = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await productsService.getById(productId);
  if (!product) {
    throw createError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProduct = async (req, res) => {
  const newProduct = await productsService.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = await productsService.update(productId, req.body);
  if (!updatedProduct) {
    throw createError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await productsService.remove(productId);
  if (!deletedProduct) {
    throw createError(404, 'Product not found');
  }
  res.status(204).send();
};

// unit 3 2
async function getAll(req, res, next) {
  const { category, minPrice, maxPrice } = req.query;
  const filter = { userId: req.user._id };
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = parseFloat(minPrice);
  if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  const products = await Product.find(filter);
  res.json({ status: 'success', data: products });
}

// const getProducts = async (req, res, next) => {
//   try {
//     const { category, minPrice, maxPrice } = req.query;
//     const filter = { userId: req.user._id };
//     if (category) filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = +minPrice;
//       if (maxPrice) filter.price.$lte = +maxPrice;
//     }
//     const products = await Product.find(filter);
//     res.json({ status: 'success', data: products });
//   } catch (err) {
//     next(err);
//   }
// };

// unit 3 5
async function create(req, res, next) {
  const data = { ...req.body, userId: req.user._id };
  const product = await Product.create(data);
  res.status(201).json({ status: 'success', data: product });
}
