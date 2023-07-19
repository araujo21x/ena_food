import userNoAuthController from '@controller/user/UserNoAuthController';
import UserNoAuthValidationAdapter from '@validators/user/UserNoAuthValidationAdapter';
import { Router } from 'express';

const noAuthUserRouter = Router();

noAuthUserRouter.post(
  '/',
  UserNoAuthValidationAdapter.create,
  userNoAuthController.create
);

export default noAuthUserRouter;
