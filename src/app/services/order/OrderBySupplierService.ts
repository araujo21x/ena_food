import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import OrderStatus from '@myTypes/enums/OrderStatus';
import { IOrderStatusKey } from '@myTypes/keys/IOrderStatusKey';
import validStatusEdit from '@utils/validStatusEdit';

class OrderBySupplierService {
  public statusIsValid(
    currentStatus: OrderStatus,
    newStatus: OrderStatus
  ): void {
    const NON_CHANGEABLE_STATUS: OrderStatus[] = [
      OrderStatus.CANCELED,
      OrderStatus.FINISHED,
    ];

    if (NON_CHANGEABLE_STATUS.includes(currentStatus)) {
      throw new AppError(errorMessages.CURRENT_STATUS_CANNOT_BE_CHANGED, 400);
    }

    if (
      !validStatusEdit[currentStatus as IOrderStatusKey].includes(newStatus)
    ) {
      throw new AppError(errorMessages.STATUS_INVALID_CHANGE, 400);
    }
  }
}

export default new OrderBySupplierService();
