import userByUserController from '@controller/user/UserByUserController';
import authenticated from '@middlewares/authenticatedMid';
import UserByUserValidationAdapter from '@validators/user/UserByUserValidationAdapter';
import { Router } from 'express';

const userSelfRouter = Router();

userSelfRouter
  .route('/')
  .get(authenticated, userByUserController.showSelf)
  .patch(
    authenticated,
    UserByUserValidationAdapter.editSelf,
    userByUserController.editSelf
  );

export default userSelfRouter;
