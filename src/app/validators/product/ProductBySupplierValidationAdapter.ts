import { NextFunction, Request, Response } from 'express';
import ZodProductBySupplierValidations from './ZodProductBySupplierValidations';

class ProductBySupplierValidationAdapter {
  static create(req: Request, res: Response, next: NextFunction) {
    return ZodProductBySupplierValidations.create(req, res, next);
  }

  static edit(req: Request, res: Response, next: NextFunction) {
    return ZodProductBySupplierValidations.edit(req, res, next);
  }

  static show(req: Request, res: Response, next: NextFunction) {
    return ZodProductBySupplierValidations.show(req, res, next);
  }

  static index(req: Request, res: Response, next: NextFunction) {
    return ZodProductBySupplierValidations.index(req, res, next);
  }
}

export default ProductBySupplierValidationAdapter;
