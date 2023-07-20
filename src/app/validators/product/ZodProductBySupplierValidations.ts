import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import {
  ValidationsObjectZod,
  ZodValidation,
  zod,
} from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodProductBySupplierValidations {
  static readonly schemaCreate = {
    name: ZodGenericValidation.string('nome'),
    value: ZodGenericValidation.decimal('valor'),
    discount: ZodGenericValidation.numeric('porcentagem de desconto')
      .max(100)
      .optional()
      .nullable(),
    preparationTime: ZodGenericValidation.numeric('tempo de preparação'),
  };

  static readonly schemaEdit = {
    name: ZodGenericValidation.stringOptional('nome'),
    value: ZodGenericValidation.decimalOptional('valor'),
    discount: ZodGenericValidation.numeric('porcentagem de desconto')
      .max(100)
      .optional()
      .nullable(),
    preparationTime: ZodGenericValidation.decimalOptional(
      'tempo de preparação'
    ),
  };

  static schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static schemaIndex = {
    name: ZodGenericValidation.stringOptional('nome'),
    paginate: zod.enum(['yes', 'not']).optional().nullable(),
    limit: ZodGenericValidation.numberIsStringOptional('limite'),
    page: ZodGenericValidation.numberIsStringOptional('pagina'),
  };

  static create(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaCreate),
      'body',
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

export default ZodProductBySupplierValidations;
