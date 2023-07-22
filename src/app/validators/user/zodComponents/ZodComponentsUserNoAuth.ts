import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodUserNoAuthValidations from '../ZodUserNoAuthValidations';

class ZodComponentsUserNoAuth {
  static readonly componentCreateClient: IComponentZod = {
    name: 'CreateNoAuthClient',
    type: 'body',
    properties: ZodUserNoAuthValidations.schemaCreate.Cliente,
  };

  static readonly componentCreateSupplier: IComponentZod = {
    name: 'CreateNoAuthSupplier',
    type: 'body',
    properties: ZodUserNoAuthValidations.schemaCreate.Fornecedor,
  };

  static readonly componentCreateCompany: IComponentZod = {
    name: 'CreateNoAuthCompany',
    type: 'body',
    properties: ZodUserNoAuthValidations.schemaCreate.Empresa,
  };

  static readonly document: IComponentDoc = {
    fileName: 'userNoAuth',
    components: [
      this.componentCreateClient,
      this.componentCreateSupplier,
      this.componentCreateCompany,
    ],
  };
}

export default ZodComponentsUserNoAuth;
