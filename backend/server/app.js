import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { verifyToken } from './middlewares/authMiddlewares';
import { NotFoundError } from './util/ExpressError';

// routes imports
import indexRouter from './routes/index';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import cartRouter from './routes/cartRoutes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(verifyToken);
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use((req, res, next) => {
  return next(new NotFoundError());
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong';
  return res.status(status).json({ status, message })
})

export default app;