import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodUserByUserValidations from '../ZodUserByUserValidations';

class ZodComponentsUserByUser {
  static readonly componentCreate: IComponentZod = {
    name: 'createUserByUser',
    type: 'body',
    properties: ZodUserByUserValidations.schemaCreate,
  };

  static readonly componentEdit: IComponentZod = {
    name: 'editUserByUser',
    type: 'body',
    properties: ZodUserByUserValidations.schemaEdit,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'indexUserByUser',
    type: 'query',
    properties: ZodUserByUserValidations.schemaIndex,
  };

  static readonly componentShow: IComponentZod = {
    name: 'showUserByUser',
    type: 'path',
    properties: ZodUserByUserValidations.schemaShow,
  };

  static readonly componentEditSelf: IComponentZod = {
    name: 'editSelfUserByUser',
    type: 'body',
    properties: ZodUserByUserValidations.schemaEditSelf,
  };

  static readonly document: IComponentDoc = {
    fileName: 'userByUser',
    components: [
      this.componentCreate,
      this.componentEdit,
      this.componentIndex,
      this.componentShow,
      this.componentEditSelf,
    ],
  };
}

export default ZodComponentsUserByUser;
