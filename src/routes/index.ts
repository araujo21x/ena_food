import { Router } from 'express';

import noAuthRouter from './generic/noAuth.routes';
import sessionsRouter from './generic/sessions.routes';
import supplierRouter from './supplier/supplier.routes';
import userRouter from './generic/user.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/noAuth', noAuthRouter);
routes.use('/user', userRouter);
routes.use('/supplier', supplierRouter);

export default routes;
