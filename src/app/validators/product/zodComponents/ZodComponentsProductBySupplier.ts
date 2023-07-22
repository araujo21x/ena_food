import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodProductBySupplierValidations from '../ZodProductBySupplierValidations';

class ZodComponentsProductBySupplier {
  static readonly componentCreate: IComponentZod = {
    name: 'CreateProductBySupplier',
    type: 'body',
    properties: ZodProductBySupplierValidations.schemaCreate,
  };

  static readonly componentEdit: IComponentZod = {
    name: 'EditProductBySupplier',
    type: 'body',
    properties: ZodProductBySupplierValidations.schemaEdit,
  };

  static readonly componentShow: IComponentZod = {
    name: 'ShowProductBySupplier',
    type: 'path',
    properties: ZodProductBySupplierValidations.schemaShow,
  };

  static readonly componentIndex: IComponentZod = {
    name: 'IndexProductBySupplier',
    type: 'query',
    properties: ZodProductBySupplierValidations.schemaIndex,
  };

  static readonly document: IComponentDoc = {
    fileName: 'productBySupplier',
    components: [
      this.componentCreate,
      this.componentEdit,
      this.componentShow,
      this.componentIndex,
    ],
  };
}

export default ZodComponentsProductBySupplier;
