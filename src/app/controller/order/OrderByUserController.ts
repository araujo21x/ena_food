/* eslint-disable no-underscore-dangle */
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import OrderStatus from '@myTypes/enums/OrderStatus';
import ProductStatus from '@myTypes/enums/ProductStatus';
import UserRole from '@myTypes/enums/UserRole';
import orderByUserService from '@services/order/OrderByUserService';
import orderService from '@services/order/OrderService';
import productService from '@services/product/ProductService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';

class OrderByUserController {
  public async item(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const client = await allowedUser.generic(req, [
      UserRole.CUSTOMER,
      UserRole.COMPANY,
    ]);

    let order = await orderService.searchBy({
      clientId: req.userId,
      status: OrderStatus.CART,
    });

    if (order && order.supplier.id !== body.supplierId) {
      throw new AppError(errorMessages.SUPPLIER_INVALID, 400);
    }

    const products = await productService.index({
      status: ProductStatus.ACTIVE,
      supplierId: body.supplierId,
    });

    const { newItems, valueItems } = orderByUserService.handleItemByOrder(
      products,
      body.items
    );

    if (!order) {
      order = await orderService.create({
        ...body,
        clientId: client.id,
        value: valueItems,
        items: newItems,
      });

      return res.status(201).json(order);
    }

    order = await orderService.edit(
      {
        value: valueItems,
        items: newItems as any,
      },
      order.id
    );

    return res.status(200).json(order);
  }

  public async getCurrent(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const order = await orderService.searchBy({
      clientId: req.userId,
      status: OrderStatus.CART,
    });
    if (!order) throw new AppError(errorMessages.CART_NOT_FOUND, 404);
    return res.status(200).json(order);
  }

  public async deleteCurrent(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const order = await orderService.getBy({
      clientId: req.userId,
      status: OrderStatus.CART,
    });

    await orderService.delete({ id: order.id });

    return res.status(200).json({ message: 'Carrinho deletado com sucesso' });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const { id }: any = req.params;
    const order = await orderService.getBy({
      id,
      clientId: req.userId,
      notStatus: [OrderStatus.CART],
    });

    return res.status(200).json(order);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);

    const { query }: any = req;
    query.clientId = req.userId;
    query.notStatus = [OrderStatus.CART];

    const orders = await orderService.index(query);

    return res.status(200).json(orders);
  }
}

export default new OrderByUserController();
