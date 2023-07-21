import orderByUserController from '@controller/order/OrderByUserController';
import authenticated from '@middlewares/authenticatedMid';
import OrderByUserValidationAdapter from '@validators/order/OrderByUserValidationAdapter';
import { Router } from 'express';

const currentOrderByUserRouter = Router();

currentOrderByUserRouter
  .route('/')
  .get(authenticated, orderByUserController.getCurrent)
  .delete(authenticated, orderByUserController.deleteCurrent);

currentOrderByUserRouter
  .route('/item')
  .put(
    authenticated,
    OrderByUserValidationAdapter.item,
    orderByUserController.item
  );

export default currentOrderByUserRouter;
