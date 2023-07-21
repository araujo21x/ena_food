/* eslint-disable no-underscore-dangle */
import { IOrder } from '@models/Order.model';
import IQrsOrder from '@myTypes/queryParams/IQrsOrder';
import { FilterQuery } from 'mongoose';

class OrderFieldService {
  public filter(filter: IQrsOrder): FilterQuery<IOrder>[] {
    const { id, status, supplierId, clientId, notStatus } = filter;
    const where: FilterQuery<IOrder>[] = [];

    if (id) where.push({ _id: id });
    if (status && status !== 'Todos') where.push({ status });
    if (supplierId) where.push({ supplier: supplierId });
    if (clientId) where.push({ client: clientId });
    if (notStatus && !status && status !== 'Todos') {
      notStatus.forEach((element) => {
        where.push({ status: { $ne: element } });
      });
    }

    return where;
  }

  public factory(body: Partial<IOrder>): Partial<IOrder> {
    const order: Partial<IOrder> = {};

    if (body.value) order.value = body.value;
    if (body.discount !== undefined) order.discount = body.discount;
    if (body.freight !== undefined) order.freight = body.freight;
    if (body.status) order.status = body.status;
    if (body.supplierId) order.supplier = body.supplierId;
    if (body.clientId) order.client = body.clientId;
    if (body.items) order.items = body.items;
    if (body.payment) order.payment = body.payment;
    if (body.address) order.address = body.address;

    return order;
  }
}

export default new OrderFieldService();
