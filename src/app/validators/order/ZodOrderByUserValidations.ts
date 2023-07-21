import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import DeliveryType from '@myTypes/enums/DeliveryType';
import OrderStatus from '@myTypes/enums/OrderStatus';
import PaymentType from '@myTypes/enums/PaymentType';
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

  static readonly schemaFinished = {
    deliveryType: zod.enum([DeliveryType.DELIVERY, DeliveryType.WITHDRAWAL]),
    address: zod.object({
      name: ZodGenericValidation.string('nome'),
      street: ZodGenericValidation.string('rua'),
      district: ZodGenericValidation.string('bairro'),
      zipCode: ZodGenericValidation.numberIsString('rua').length(8),
      number: ZodGenericValidation.string('numero'),
      city: ZodGenericValidation.string('cidade'),
      state: ZodGenericValidation.string('cidade', 2, 2),
      complement: ZodGenericValidation.stringOptional('complemento'),
    }),
    paymentType: zod.enum([
      PaymentType.APP,
      PaymentType.CREDIT_CAR,
      PaymentType.FOOD_STAMPS,
      PaymentType.MONEY,
    ]),
  };

  static readonly schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static readonly schemaIndex = {
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

  static finished(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaFinished),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodOrderByUserValidations;
