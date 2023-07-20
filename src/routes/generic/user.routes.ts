import supplierByUserController from '@controller/user/SupplierByUserController';
import userByUserController from '@controller/user/UserByUserController';
import authenticated from '@middlewares/authenticatedMid';
import UserByUserValidationAdapter from '@validators/user/UserByUserValidationAdapter';
import { Router } from 'express';

const userRouter = Router();

userRouter
  .route('/supplier')
  .get(authenticated, supplierByUserController.index);

userRouter
  .route('/self')
  .get(authenticated, userByUserController.showSelf)
  .patch(
    authenticated,
    UserByUserValidationAdapter.editSelf,
    userByUserController.editSelf
  );

userRouter
  .route('/supplier/:id')
  .get(authenticated, supplierByUserController.show);

export default userRouter;
