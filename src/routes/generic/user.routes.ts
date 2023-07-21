import { Router } from 'express';
import productByUserRouter from './productByUser.routes';
import supplierByUserRouter from './supplierByUser.routes';
import userSelfRouter from './userSelf.routes';
import orderByUserRouter from './orderByUser.routes';

const userRouter = Router();

userRouter.use('/self', userSelfRouter);
userRouter.use('/product', productByUserRouter);
userRouter.use('/supplier', supplierByUserRouter);
userRouter.use('/order', orderByUserRouter);

export default userRouter;
