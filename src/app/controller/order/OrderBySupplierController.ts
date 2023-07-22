/* eslint-disable no-underscore-dangle */
import OrderStatus from '@myTypes/enums/OrderStatus';
import UserRole from '@myTypes/enums/UserRole';
import orderBySupplierService from '@services/order/OrderBySupplierService';
import orderService from '@services/order/OrderService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';

class OrderBySupplierController {
  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);

    const { id }: any = req.params;
    const order = await orderService.getBy({
      id,
      supplierId: req.userId,
      notStatus: [OrderStatus.CART, OrderStatus.AWAITING_PAYMENT],
    });

    return res.status(200).json(order);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);

    const { query }: any = req;
    query.supplierId = req.userId;
    query.notStatus = [OrderStatus.CART, OrderStatus.AWAITING_PAYMENT];

    const orders = await orderService.index(query);
    const count = await orderService.count(query);

    return res.status(200).json({ orders, count });
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.SUPPLIER]);
    const { id }: any = req.params;

    const order = await orderService.getBy({
      id,
      supplierId: req.userId,
      notStatus: [OrderStatus.CART, OrderStatus.AWAITING_PAYMENT],
    });

    orderBySupplierService.statusIsValid(order.status, req.body.status);

    const orders = await orderService.edit(req.body, order.id);

    return res.status(200).json(orders);
  }
}

export default new OrderBySupplierController();
