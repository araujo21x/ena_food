import ProductStatus from '@myTypes/enums/ProductStatus';
import UserRole from '@myTypes/enums/UserRole';
import productService from '@services/product/ProductService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';

class ProductByUserController {
  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const { id }: any = req.params;
    const product = await productService.getBy({
      id,
      status: ProductStatus.ACTIVE,
    });

    return res.status(200).json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const { query }: any = req;
    query.status = ProductStatus.ACTIVE;

    const products = await productService.index(query);
    const count = await productService.count(query);

    return res.status(200).json({ products, count });
  }
}

export default new ProductByUserController();
