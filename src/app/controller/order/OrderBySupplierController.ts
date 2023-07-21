/* eslint-disable no-underscore-dangle */
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import OrderStatus from '@myTypes/enums/OrderStatus';
import UserRole from '@myTypes/enums/UserRole';
import { IOrderStatusKey } from '@myTypes/keys/IOrderStatusKey';
import orderService from '@services/order/OrderService';
import allowedUser from '@utils/AllowedUser';
import validStatusEdit from '@utils/validStatusEdit';
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

    return res.status(200).json(orders);
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.CUSTOMER, UserRole.COMPANY]);
    const { id }: any = req.params;

    const order = await orderService.getBy({
      id,
      supplierId: req.userId,
      notStatus: [OrderStatus.CART, OrderStatus.AWAITING_PAYMENT],
    });

    if (
      !validStatusEdit[order.status as IOrderStatusKey].includes(
        req.body.status
      )
    ) {
      throw new AppError(errorMessages.STATUS_INVALID_CHANGE, 400);
    }

    const orders = await orderService.edit(req.body, order.id);

    return res.status(200).json(orders);
  }
}

export default new OrderBySupplierController();
