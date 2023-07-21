import OrderStatus from '@myTypes/enums/OrderStatus';

export default {
  'Aguardando Restaurante': [
    OrderStatus.CANCELED,
    OrderStatus.WAITING_PREPARATION,
  ],
  'Esperando preparação': [OrderStatus.CANCELED, OrderStatus.IN_PREPARATION],
  'Em preparação': [
    OrderStatus.CANCELED,
    OrderStatus.WAITING_WITHDRAWAL,
    OrderStatus.PRODUCT_SHIPPED,
  ],
  'Aguardando retirada': [OrderStatus.CANCELED, OrderStatus.FINISHED],
  'Produto enviado': [OrderStatus.CANCELED, OrderStatus.FINISHED],
};
