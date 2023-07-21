import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import {
  ValidationsObjectZod,
  ZodValidation,
  zod,
} from '@lib/zod/ZodValidation';
import OrderStatus from '@myTypes/enums/OrderStatus';
import { NextFunction, Request, Response } from 'express';

class ZodOrderBySupplierValidations {
  static readonly schemaEdit = {
    status: zod.enum([
      OrderStatus.WAITING_PREPARATION,
      OrderStatus.IN_PREPARATION,
      OrderStatus.WAITING_WITHDRAWAL,
      OrderStatus.PRODUCT_SHIPPED,
      OrderStatus.FINISHED,
      OrderStatus.CANCELED,
    ]),
  };

  static readonly schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static readonly schemaIndex = {
    status: zod
      .enum([
        OrderStatus.WAITING_RESTAURANT,
        OrderStatus.WAITING_PREPARATION,
        OrderStatus.IN_PREPARATION,
        OrderStatus.WAITING_WITHDRAWAL,
        OrderStatus.PRODUCT_SHIPPED,
        OrderStatus.FINISHED,
        OrderStatus.CANCELED,
      ])
      .optional()
      .nullable(),
    paginate: zod.enum(['yes', 'not']).optional().nullable(),
    limit: ZodGenericValidation.numberIsStringOptional('limite'),
    page: ZodGenericValidation.numberIsStringOptional('pagina'),
  };

  static show(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaShow),
      'params',
      req,
      res,
      next
    );
  }

  static index(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaIndex),
      'query',
      req,
      res,
      next
    );
  }

  static edit(req: Request, res: Response, next: NextFunction) {
    const validationsObjectZod: ValidationsObjectZod[] = [
      { objectZod: zod.object(this.schemaShow), fieldsToTest: 'params' },
      { objectZod: zod.object(this.schemaEdit), fieldsToTest: 'body' },
    ];

    ZodValidation.validateMultiObject(validationsObjectZod, req, res, next);
  }
}

export default ZodOrderBySupplierValidations;
