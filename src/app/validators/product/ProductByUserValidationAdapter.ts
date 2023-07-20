import { NextFunction, Request, Response } from 'express';
import ZodProductByUserValidations from './ZodProductByUserValidations';

class ProductByUserValidationAdapter {
  static show(req: Request, res: Response, next: NextFunction) {
    return ZodProductByUserValidations.show(req, res, next);
  }

  static index(req: Request, res: Response, next: NextFunction) {
    return ZodProductByUserValidations.index(req, res, next);
  }
}

export default ProductByUserValidationAdapter;
