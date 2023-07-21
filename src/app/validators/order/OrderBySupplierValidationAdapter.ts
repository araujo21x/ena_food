import { NextFunction, Request, Response } from 'express';
import ZodOrderBySupplierValidations from './ZodOrderBySupplierValidations';

class OrderBySupplierValidationAdapter {
  static edit(req: Request, res: Response, next: NextFunction) {
    return ZodOrderBySupplierValidations.edit(req, res, next);
  }

  static show(req: Request, res: Response, next: NextFunction) {
    return ZodOrderBySupplierValidations.show(req, res, next);
  }

  static index(req: Request, res: Response, next: NextFunction) {
    return ZodOrderBySupplierValidations.index(req, res, next);
  }
}

export default OrderBySupplierValidationAdapter;
