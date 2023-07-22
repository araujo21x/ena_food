import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodProductByUserValidations from '../ZodProductByUserValidations';

class ZodComponentsProductByUser {
  static readonly componentShow: IComponentZod = {
    name: 'ShowProductByUser',
    type: 'path',
    properties: ZodProductByUserValidations.schemaShow,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'IndexProductByUser',
    type: 'query',
    properties: ZodProductByUserValidations.schemaIndex,
  };

  static readonly document: IComponentDoc = {
    fileName: 'productByUser',
    components: [this.componentShow, this.componentIndex],
  };
}

export default ZodComponentsProductByUser;
