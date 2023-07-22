import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodOrderBySupplierValidations from '../ZodOrderBySupplierValidations';

class ZodComponentsOrderBySupplier {
  static readonly componentEdit: IComponentZod = {
    name: 'EditOrderBySupplier',
    type: 'body',
    properties: ZodOrderBySupplierValidations.schemaEdit,
  };

  static readonly componentShow: IComponentZod = {
    name: 'ShowOrderBySupplier',
    type: 'path',
    properties: ZodOrderBySupplierValidations.schemaShow,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'IndexOrderBySupplier',
    type: 'query',
    properties: ZodOrderBySupplierValidations.schemaIndex,
  };

  static readonly document: IComponentDoc = {
    fileName: 'OrderBySupplier',
    components: [this.componentEdit, this.componentShow, this.componentIndex],
  };
}

export default ZodComponentsOrderBySupplier;
