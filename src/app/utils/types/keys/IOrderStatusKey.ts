import OrderStatus from '@myTypes/enums/OrderStatus';

export type IOrderStatusKey =
  | OrderStatus.WAITING_RESTAURANT
  | OrderStatus.WAITING_PREPARATION
  | OrderStatus.IN_PREPARATION
  | OrderStatus.WAITING_WITHDRAWAL
  | OrderStatus.PRODUCT_SHIPPED;
