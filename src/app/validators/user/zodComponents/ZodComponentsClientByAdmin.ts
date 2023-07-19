import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodClientByAdminValidations from '../ZodClientByAdminValidations';

class ZodComponentsClientByAdmin {
  static readonly componentIndex: IComponentZod = {
    name: 'indexClientByAdmin',
    type: 'query',
    properties: ZodClientByAdminValidations.schemaIndex,
  };

  static readonly componentShow: IComponentZod = {
    name: 'showClientByAdmin',
    type: 'path',
    properties: ZodClientByAdminValidations.schemaShow,
  };

  static readonly componentEdit: IComponentZod = {
    name: 'editClientByAdmin',
    type: 'body',
    properties: ZodClientByAdminValidations.schemaEdit,
  };

  static readonly document: IComponentDoc = {
    fileName: 'clientByAdmin',
    components: [this.componentIndex, this.componentShow, this.componentEdit],
  };
}

export default ZodComponentsClientByAdmin;
