import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { IUserRoleKey } from '@myTypes/keys/IUserRoleKey';
import { NextFunction, Request, Response } from 'express';

class ZodUserByUserValidations {
  static readonly schemaEditDefault = {
    name: ZodGenericValidation.stringOptional('nome'),
    phone: ZodGenericValidation.phone.nullable().optional(),
    password: ZodGenericValidation.password.nullable().optional(),
    confirmPassword: ZodGenericValidation.password.nullable().optional(),
  };

  static readonly schemaAddress = {
    name: ZodGenericValidation.string('nome'),
    default: zod.boolean(),
    street: ZodGenericValidation.string('rua'),
    district: ZodGenericValidation.string('bairro'),
    zipCode: ZodGenericValidation.numberIsString('rua').length(8),
    number: ZodGenericValidation.string('numero'),
    city: ZodGenericValidation.string('cidade'),
    state: ZodGenericValidation.string('cidade', 2, 2),
    complement: ZodGenericValidation.stringOptional('complemento'),
  };

  static readonly schemaEdit = {
    Fornecedor: {
      ...this.schemaEditDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(1)
        .nullable()
        .optional(),
      businessName: ZodGenericValidation.stringOptional('nome empresarial'),
    },
    Cliente: {
      ...this.schemaEditDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(5)
        .nullable()
        .optional(),
      birthDay: ZodGenericValidation.birthDay(18).nullable().optional(),
    },
    Empresa: {
      ...this.schemaEditDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(1)
        .nullable()
        .optional(),
      businessName: ZodGenericValidation.stringOptional('nome empresarial'),
    },
  };

  static schemaShow = {
    id: ZodGenericValidation.string('identificador'),
  };

  static schemaIndex = {
    name: ZodGenericValidation.stringOptional('nome'),
    city: ZodGenericValidation.stringOptional('cidade'),
    state: ZodGenericValidation.stringOptional('estado'),
    paginate: zod.enum(['yes', 'not']).optional().nullable(),
    limit: ZodGenericValidation.numberIsStringOptional('limite'),
    page: ZodGenericValidation.numberIsStringOptional('pagina'),
  };

  static editSelf(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod
        .object(this.schemaEdit[req.userRole as IUserRoleKey])
        .refine((date) => {
          if (date.password || date.confirmPassword) {
            if (date.password !== date.confirmPassword) return false;
          }

          return true;
        }, 'Senhas não conferem'),
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

export default ZodUserByUserValidations;
