import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import OrderStatus from '@myTypes/enums/OrderStatus';
import { NextFunction, Request, Response } from 'express';

class ZodOrderByUserValidations {
  static readonly schemaCreateAndEdit = {
    supplierId: ZodGenericValidation.string('identificador do fornecedor'),
    items: zod
      .object({
        productId: ZodGenericValidation.string('identificador do produto'),
        amount: ZodGenericValidation.numeric('quantidade'),
      })
      .array()
      .min(1),
  };

  static schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static schemaIndex = {
    status: zod
      .enum([
        OrderStatus.AWAITING_PAYMENT,
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

  static item(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaCreateAndEdit).transform((data) => {
        const itemsNoDuplicate: any[] = [];

        data.items.forEach((item) => {
          const index = itemsNoDuplicate.findIndex(
            (element: any) => element.productId === item.productId
          );

          if (index === -1) {
            itemsNoDuplicate.push(item);
          } else {
            itemsNoDuplicate[index].amount += item.amount;
          }
        });

        data.items = itemsNoDuplicate;

        return data;
      }),
      'body',
      req,
      res,
      next
    );
  }

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
}

export default ZodOrderByUserValidations;
