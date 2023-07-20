import { Router } from 'express';
import productBySupplierRouter from './productBySupplier.routes';

const supplierRouter = Router();

supplierRouter.use('/product', productBySupplierRouter);

export default supplierRouter;
