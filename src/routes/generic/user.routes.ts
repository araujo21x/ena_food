import supplierByUserController from '@controller/user/SupplierByUserController';
import userByUserController from '@controller/user/UserByUserController';
import authenticated from '@middlewares/authenticatedMid';
import UserByUserValidationAdapter from '@validators/user/UserByUserValidationAdapter';
import { Router } from 'express';
import productByUserRouter from './productByUser.routes';

const userRouter = Router();

userRouter
  .route('/supplier')
  .get(
    authenticated,
    UserByUserValidationAdapter.index,
    supplierByUserController.index
  );

userRouter
  .route('/self')
  .get(authenticated, userByUserController.showSelf)
  .patch(
    authenticated,
    UserByUserValidationAdapter.editSelf,
    userByUserController.editSelf
  );

userRouter.use('/product', productByUserRouter);

userRouter
  .route('/supplier/:id')
  .get(
    authenticated,
    UserByUserValidationAdapter.show,
    supplierByUserController.show
  );

export default userRouter;
