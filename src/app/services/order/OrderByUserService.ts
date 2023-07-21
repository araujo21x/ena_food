import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import { IItem } from '@models/Item.model';
import { IProduct } from '@models/Product.model';

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
}

export default new OrderByUserService();
