import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { IUserRoleKey } from '@myTypes/keys/IUserRoleKey';
import { NextFunction, Request, Response } from 'express';

class ZodUserByUserValidations {
  static readonly schemaCreateDefault = {
    name: ZodGenericValidation.stringOptional('nome'),
    phone: ZodGenericValidation.cpfCnpj.nullable().optional(),
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

  static readonly schemaCreate = {
    Fornecedor: {
      ...this.schemaCreateDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(1)
        .nullable()
        .optional(),
      businessName: ZodGenericValidation.stringOptional('nome empresarial'),
    },
    Cliente: {
      ...this.schemaCreateDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(5)
        .nullable()
        .optional(),
      birthDay: ZodGenericValidation.birthDay(18).nullable().optional(),
    },
    Empresa: {
      ...this.schemaCreateDefault,
      addresses: zod
        .object(this.schemaAddress)
        .array()
        .max(1)
        .nullable()
        .optional(),
      businessName: ZodGenericValidation.stringOptional('nome empresarial'),
    },
  };

  static editSelf(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod
        .object(this.schemaCreate[req.userRole as IUserRoleKey])
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
}

export default ZodUserByUserValidations;
