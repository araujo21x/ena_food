import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodOrderByUserValidations from '../ZodOrderByUserValidations';

class ZodComponentsOrderByUser {
  static readonly componentCreateAndEdit: IComponentZod = {
    name: 'CreateAndEditOrderByUser',
    type: 'body',
    properties: ZodOrderByUserValidations.schemaCreateAndEdit,
  };

  static readonly componentFinished: IComponentZod = {
    name: 'FinishedOrderByUser',
    type: 'body',
    properties: ZodOrderByUserValidations.schemaFinished,
  };

  static readonly componentShow: IComponentZod = {
    name: 'ShowOrderByUser',
    type: 'path',
    properties: ZodOrderByUserValidations.schemaShow,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'IndexOrderByUser',
    type: 'query',
    properties: ZodOrderByUserValidations.schemaIndex,
  };

  static readonly document: IComponentDoc = {
    fileName: 'OrderByUser',
    components: [
      this.componentCreateAndEdit,
      this.componentFinished,
      this.componentShow,
      this.componentIndex,
    ],
  };
}

export default ZodComponentsOrderByUser;
