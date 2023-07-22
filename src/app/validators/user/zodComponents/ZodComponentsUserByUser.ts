import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodUserByUserValidations from '../ZodUserByUserValidations';

class ZodComponentsUserByUser {
  static readonly componentEditSelfClient: IComponentZod = {
    name: 'EditSelfClient',
    type: 'body',
    properties: ZodUserByUserValidations.schemaEdit.Cliente,
  };

  static readonly componentEditSelfSupplier: IComponentZod = {
    name: 'EditSelfSupplier',
    type: 'body',
    properties: ZodUserByUserValidations.schemaEdit.Fornecedor,
  };

  static readonly componentEditSelfCompany: IComponentZod = {
    name: 'EditSelfCompany',
    type: 'body',
    properties: ZodUserByUserValidations.schemaEdit.Empresa,
  };

  static readonly componentShowSelf: IComponentZod = {
    name: 'ShowSelf',
    type: 'path',
    properties: ZodUserByUserValidations.schemaShow,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'IndexUserByUsers',
    type: 'query',
    properties: ZodUserByUserValidations.schemaIndex,
  };

  static readonly document: IComponentDoc = {
    fileName: 'userByUser',
    components: [
      this.componentEditSelfClient,
      this.componentEditSelfSupplier,
      this.componentEditSelfCompany,
      this.componentShowSelf,
      this.componentIndex,
    ],
  };
}

export default ZodComponentsUserByUser;
