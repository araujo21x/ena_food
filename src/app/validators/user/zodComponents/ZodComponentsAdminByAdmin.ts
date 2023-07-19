import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodUserByAdminValidations from '../ZodAdminByAdminValidations';

class ZodComponentsAdminByAdmin {
  static readonly componentCreate: IComponentZod = {
    name: 'CreateAdmin',
    type: 'body',
    properties: ZodUserByAdminValidations.schemaCreate,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'indexAdmin',
    type: 'query',
    properties: ZodUserByAdminValidations.schemaIndex,
  };

  static readonly componentShow: IComponentZod = {
    name: 'showAdmin',
    type: 'path',
    properties: ZodUserByAdminValidations.schemaShow,
  };

  static readonly componentEdit: IComponentZod = {
    name: 'editAdmin',
    type: 'body',
    properties: ZodUserByAdminValidations.schemaEdit,
  };

  static readonly document: IComponentDoc = {
    fileName: 'adminByAdmin',
    components: [
      this.componentCreate,
      this.componentIndex,
      this.componentShow,
      this.componentEdit,
    ],
  };
}

export default ZodComponentsAdminByAdmin;
