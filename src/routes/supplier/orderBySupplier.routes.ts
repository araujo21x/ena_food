import orderBySupplierController from '@controller/order/OrderBySupplierController';
import authenticated from '@middlewares/authenticatedMid';
import OrderBySupplierValidationAdapter from '@validators/order/OrderBySupplierValidationAdapter';

import { Router } from 'express';

const orderBySupplierRouter = Router();

orderBySupplierRouter
  .route('/')
  .get(
    authenticated,
    OrderBySupplierValidationAdapter.index,
    orderBySupplierController.index
  );

orderBySupplierRouter
  .route('/:id')
  .patch(
    authenticated,
    OrderBySupplierValidationAdapter.edit,
    orderBySupplierController.edit
  )
  .get(
    authenticated,
    OrderBySupplierValidationAdapter.show,
    orderBySupplierController.show
  );

export default orderBySupplierRouter;
