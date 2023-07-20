import productBySupplierController from '@controller/product/ProductBySupplierController';
import authenticated from '@middlewares/authenticatedMid';
import ProductBySupplierValidationAdapter from '@validators/product/ProductBySupplierValidationAdapter';
import { Router } from 'express';

const productBySupplierRouter = Router();

productBySupplierRouter
  .route('/')
  .post(
    authenticated,
    ProductBySupplierValidationAdapter.create,
    productBySupplierController.create
  )
  .get(
    authenticated,
    ProductBySupplierValidationAdapter.index,
    productBySupplierController.index
  );

productBySupplierRouter
  .route('/:id')
  .patch(
    authenticated,
    ProductBySupplierValidationAdapter.edit,
    productBySupplierController.edit
  )
  .get(
    authenticated,
    ProductBySupplierValidationAdapter.show,
    productBySupplierController.show
  );

export default productBySupplierRouter;
