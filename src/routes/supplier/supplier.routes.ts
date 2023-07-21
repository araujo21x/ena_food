import { Router } from 'express';
import productBySupplierRouter from './productBySupplier.routes';
import orderBySupplierRouter from './orderBySupplier.routes';

const supplierRouter = Router();

supplierRouter.use('/product', productBySupplierRouter);
supplierRouter.use('/order', orderBySupplierRouter);

export default supplierRouter;
