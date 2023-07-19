import AppError from '@errors/AppError';
import { emailMsg } from '@lib/zod/zodMessages';
import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import UserRole from '@myTypes/enums/UserRole';
import { IUserRoleKey } from '@myTypes/keys/IUserRoleKey';
import { NextFunction, Request, Response } from 'express';

class ZodUserNoAuthValidations {
  static readonly schemaCreateDefault = {
    name: ZodGenericValidation.string('nome'),
    phone: ZodGenericValidation.phone,
    email: ZodGenericValidation.string('email').email(emailMsg('email')),
    password: ZodGenericValidation.password,
    confirmPassword: ZodGenericValidation.password,
    role: zod.enum([UserRole.COMPANY, UserRole.CUSTOMER, UserRole.SUPPLIER]),
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
      addresses: zod.object(this.schemaAddress).array().min(1).max(1),
      document: ZodGenericValidation.cpfCnpj,
      businessName: ZodGenericValidation.string('nome empresarial'),
    },
    Cliente: {
      ...this.schemaCreateDefault,
      addresses: zod.object(this.schemaAddress).array().min(1).max(5),
      document: ZodGenericValidation.cpf,
      birthDay: ZodGenericValidation.birthDay(18),
    },
    Empresa: {
      ...this.schemaCreateDefault,
      addresses: zod.object(this.schemaAddress).array().min(1).max(1),
      document: ZodGenericValidation.cnpj,
      businessName: ZodGenericValidation.string('nome empresarial'),
    },
  };

  static create(req: Request, res: Response, next: NextFunction) {
    const rolesValid = [UserRole.COMPANY, UserRole.SUPPLIER, UserRole.CUSTOMER];

    if (!req.body.role) throw new AppError('Função do usuário é obrigatória!');
    if (!rolesValid.includes(req.body.role)) {
      throw new AppError('Função do usuário invalida!');
    }

    ZodValidation.validate(
      zod
        .object(this.schemaCreate[req.body.role as IUserRoleKey])
        .refine((date) => {
          if (date.password !== date.confirmPassword) return false;

          return true;
        }, 'Senhas não conferem'),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodUserNoAuthValidations;
