import supplierByUserController from '@controller/user/SupplierByUserController';
import authenticated from '@middlewares/authenticatedMid';
import UserByUserValidationAdapter from '@validators/user/UserByUserValidationAdapter';
import { Router } from 'express';

const supplierByUserRouter = Router();

supplierByUserRouter
  .route('/')
  .get(
    authenticated,
    UserByUserValidationAdapter.index,
    supplierByUserController.index
  );

supplierByUserRouter
  .route('/:id')
  .get(
    authenticated,
    UserByUserValidationAdapter.show,
    supplierByUserController.show
  );

export default supplierByUserRouter;
