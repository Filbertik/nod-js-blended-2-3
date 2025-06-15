import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';

import { env } from './utils/env.js';
import productsRouter from './routers/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/products', productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
