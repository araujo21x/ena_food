import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Order, { IOrder } from '@models/Order.model';
import { Types } from 'mongoose';
import IQrsOrder from '@myTypes/queryParams/IQrsOrder';
import orderFieldService from './OrderFieldService';

class OrderService {
  public async searchBy(filter: IQrsOrder): Promise<IOrder | null> {
    if (!filter.operation) filter.operation = '$and';

    const order = await Order.findOne({
      [filter.operation]: orderFieldService.filter(filter),
    })
      .populate('items.product')
      .populate('client')
      .populate('supplier');

    return order;
  }

  public async getBy(filter: IQrsOrder): Promise<IOrder> {
    const order: IOrder | null = await this.searchBy(filter);
    if (!order) throw new AppError(errorMessages.ORDER_NOT_FOUND, 404);

    return order;
  }

  public async create(body: IOrder): Promise<IOrder> {
    const order = new Order(orderFieldService.factory(body));
    const newOrder = await order.save();

    return newOrder;
  }

  public async edit(
    body: Partial<IOrder>,
    id: Types.ObjectId
  ): Promise<IOrder> {
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      orderFieldService.factory(body),
      { new: true }
    );

    if (!order) throw new AppError(errorMessages.ORDER_ALREADY_EXISTS, 404);

    return order;
  }

  public async index(filter: IQrsOrder): Promise<any> {
    if (!filter.operation) filter.operation = '$and';

    const query = Order.find({
      [filter.operation]: orderFieldService.filter(filter),
    })
      .populate('items.product')
      .populate('client')
      .populate('supplier');

    if (!filter.paginate || filter.paginate === 'yes') {
      const { limit = 10, page = 1 } = filter;
      query.skip((page - 1) * limit).limit(limit);
    }
    const result = await query;

    return result;
  }

  public async delete(filter: IQrsOrder): Promise<void> {
    await Order.deleteOne({ _id: filter.id });
  }
}

export default new OrderService();
