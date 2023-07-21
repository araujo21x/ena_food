import { NextFunction, Request, Response } from 'express';
import ZodOrderByUserValidations from './ZodOrderByUserValidations';

class OrderByUserValidationAdapter {
  static item(req: Request, res: Response, next: NextFunction) {
    return ZodOrderByUserValidations.item(req, res, next);
  }

  static show(req: Request, res: Response, next: NextFunction) {
    return ZodOrderByUserValidations.show(req, res, next);
  }

  static index(req: Request, res: Response, next: NextFunction) {
    return ZodOrderByUserValidations.index(req, res, next);
  }

  static finished(req: Request, res: Response, next: NextFunction) {
    return ZodOrderByUserValidations.finished(req, res, next);
  }
}

export default OrderByUserValidationAdapter;
