/* eslint-disable no-underscore-dangle */
import { IProduct } from '@models/Product.model';
import IQrsProduct from '@myTypes/queryParams/IQrsProduct';
import { FilterQuery } from 'mongoose';

class ProductFieldService {
  public filter(filter: IQrsProduct): FilterQuery<IProduct>[] {
    const { id, status, name, supplierId } = filter;
    const where: FilterQuery<IProduct>[] = [];

    if (id) where.push({ _id: id });
    if (name) where.push({ name });
    if (status) where.push({ status });
    if (supplierId) where.push({ supplier: supplierId });

    return where;
  }

  public factory(body: Partial<IProduct>): Partial<IProduct> {
    const product: Partial<IProduct> = {};

    if (body.name) product.name = body.name;
    if (body.value) product.value = body.value;
    if (body.discount !== undefined) product.discount = body.discount;
    if (body.value && body.discount !== undefined) {
      if (body.discount === 0) {
        product.discountedValue = body.value;
      } else {
        product.discountedValue =
          body.value - body.value * (body.discount / 100);
      }
    }
    if (body.preparationTime) product.preparationTime = body.preparationTime;
    if (body.status) product.status = body.status;
    if (body.supplierId) product.supplier = body.supplierId;

    return product;
  }
}

export default new ProductFieldService();
