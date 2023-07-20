import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodProductByUserValidations {
  static schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static schemaIndex = {
    name: ZodGenericValidation.stringOptional('nome'),
    supplierId: ZodGenericValidation.stringOptional(
      'identificador do fornecedor'
    ),
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
}

export default ZodProductByUserValidations;
