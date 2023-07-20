import { NextFunction, Request, Response } from 'express';
import ZodUserByUserValidations from './ZodUserByUserValidations';

class UserByUserValidationAdapter {
  static editSelf(req: Request, res: Response, next: NextFunction) {
    return ZodUserByUserValidations.editSelf(req, res, next);
  }

  static index(req: Request, res: Response, next: NextFunction) {
    return ZodUserByUserValidations.index(req, res, next);
  }

  static show(req: Request, res: Response, next: NextFunction) {
    return ZodUserByUserValidations.show(req, res, next);
  }
}

export default UserByUserValidationAdapter;
