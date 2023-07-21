import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import { IItem } from '@models/Item.model';
import { IProduct } from '@models/Product.model';
import OrderStatus from '@myTypes/enums/OrderStatus';
import PaymentStatus from '@myTypes/enums/PaymentStatus';
import PaymentType from '@myTypes/enums/PaymentType';

class OrderByUserService {
  public handleItemByOrder(products: IProduct[], items: Partial<IItem>[]) {
    const newItems: Partial<IItem>[] = [];
    let valueItems: number = 0;

    items.forEach((item) => {
      const find = products.find((product) => product.id === item.productId);
      if (!find) return;

      newItems.push({
        value: find.discountedValue,
        amount: item.amount,
        product: find.id,
      });

      valueItems += find.value * (item.amount as number);
    });

    if (newItems.length !== items.length) {
      throw new AppError(errorMessages.PRODUCT_INVALID, 400);
    }

    return { newItems, valueItems };
  }

  public handlerStatusByPaymentOrder(paymentType: PaymentType, body: any) {
    // para teste já que não tem gateway estou deixando os tipos que validam no
    // no gateway como array vazio
    // const PAYMENT_TYPES_FOR_PENDING_STATUS: PaymentType[] = [PaymentType.APP];
    const PAYMENT_TYPES_FOR_PENDING_STATUS: PaymentType[] = [];

    if (PAYMENT_TYPES_FOR_PENDING_STATUS.includes(paymentType)) {
      body.payment = {
        status: PaymentStatus.PENDING,
        paymentType,
      };

      body.status = OrderStatus.AWAITING_PAYMENT;

      return;
    }

    body.payment = {
      status: PaymentStatus.ACCEPTED,
      paymentType,
    };

    body.status = OrderStatus.WAITING_RESTAURANT;
  }
}

export default new OrderByUserService();
