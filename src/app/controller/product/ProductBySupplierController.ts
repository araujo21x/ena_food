import UserRole from '@myTypes/enums/UserRole';
import productService from '@services/product/ProductService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';

class ProductBySupplierController {
  public async create(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);

    const { body } = req;
    body.supplierId = req.userId;

    await productService.create(body);

    return res.status(201).json({ message: 'Produto cadastrado com sucesso' });
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);
    const { id }: any = req.params;
    const { body } = req;

    let product = await productService.getBy({ id, supplierId: req.userId });

    if (body.discount !== undefined || body.value) {
      if (body.discount !== undefined && !body.value) {
        body.value = product.value;
      }
      if (body.discount === undefined && body.value) {
        body.discount = product.discount;
      }
    }

    product = await productService.edit(body, id);

    return res
      .status(200)
      .json({ message: 'Produto editado com sucesso', product });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);

    const { id }: any = req.params;
    const product = await productService.getBy({ id, supplierId: req.userId });

    return res.status(200).json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);

    const { query }: any = req;
    query.supplierId = req.userId;

    const products = await productService.index(query);
    const count = await productService.count(query);

    return res.status(200).json({ products, count });
  }
}

export default new ProductBySupplierController();
