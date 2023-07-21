import { Router } from 'express';
import authenticated from '@middlewares/authenticatedMid';
import OrderByUserValidationAdapter from '@validators/order/OrderByUserValidationAdapter';
import orderByUserController from '@controller/order/OrderByUserController';
import currentOrderByUserRouter from './currentOrderByUser.routes';

const orderByUserRouter = Router();

orderByUserRouter.use('/current', currentOrderByUserRouter);

orderByUserRouter
  .route('/')
  .get(
    authenticated,
    OrderByUserValidationAdapter.index,
    orderByUserController.index
  );

orderByUserRouter
  .route('/:id')
  .get(
    authenticated,
    OrderByUserValidationAdapter.show,
    orderByUserController.show
  );

export default orderByUserRouter;
