import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Product, { IProduct } from '@models/Product.model';
import { Types } from 'mongoose';
import IQrsProduct from '@myTypes/queryParams/IQrsProduct';
import productFieldService from './ProductFieldService';

class ProductService {
  public async searchBy(filter: IQrsProduct): Promise<IProduct | null> {
    if (!filter.operation) filter.operation = '$and';

    const product = await Product.findOne({
      [filter.operation]: productFieldService.filter(filter),
    });

    return product;
  }

  public async getBy(filter: IQrsProduct): Promise<IProduct> {
    const product: IProduct | null = await this.searchBy(filter);
    if (!product) throw new AppError(errorMessages.PRODUCT_NOT_FOUND, 404);

    return product;
  }

  public async create(body: IProduct): Promise<IProduct> {
    const product = new Product(productFieldService.factory(body));
    const newProduct = await product.save();

    return newProduct;
  }

  public async edit(
    body: Partial<IProduct>,
    id: Types.ObjectId
  ): Promise<IProduct> {
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      productFieldService.factory(body),
      { new: true }
    );

    if (!product) throw new AppError(errorMessages.PRODUCT_NOT_FOUND, 404);

    return product;
  }

  public async index(filter: IQrsProduct): Promise<any> {
    if (!filter.operation) filter.operation = '$and';

    const query = Product.find({
      [filter.operation]: productFieldService.filter(filter),
    }).populate('supplier');

    if (!filter.paginate || filter.paginate === 'yes') {
      const { limit = 10, page = 1 } = filter;
      query.skip((page - 1) * limit).limit(limit);
    }
    const result = await query;

    return result;
  }
}

export default new ProductService();
