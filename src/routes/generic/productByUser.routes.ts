import productByUserController from '@controller/product/ProductByUserController';
import authenticated from '@middlewares/authenticatedMid';
import ProductByUserValidationAdapter from '@validators/product/ProductByUserValidationAdapter';
import { Router } from 'express';

const productByUserRouter = Router();

productByUserRouter
  .route('/')
  .get(
    authenticated,
    ProductByUserValidationAdapter.index,
    productByUserController.index
  );

productByUserRouter
  .route('/:id')

  .get(
    authenticated,
    ProductByUserValidationAdapter.show,
    productByUserController.show
  );

export default productByUserRouter;
