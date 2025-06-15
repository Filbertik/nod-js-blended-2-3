import express from 'express';
import * as productsController from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(productsController.getAllProducts));
router.get('/:productId', ctrlWrapper(productsController.getProductById));
router.post('/', ctrlWrapper(productsController.createProduct));
router.patch('/:productId', ctrlWrapper(productsController.updateProduct));
router.delete('/:productId', ctrlWrapper(productsController.deleteProduct));

export default router;
