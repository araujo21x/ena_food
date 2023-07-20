/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

enum OrderStatus {
  CART = 'Carrinho',
  AWAITING_PAYMENT = 'Aguardando pagamento',
  WAITING_RESTAURANT = 'Aguardando Restaurante',
  WAITING_PREPARATION = 'Esperando preparação',
  IN_PREPARATION = 'Em preparação',
  WAITING_WITHDRAWAL = 'Aguardando retirada',
  PRODUCT_SHIPPED = 'Produto enviado',
  FINISHED = 'Finalizado',
  CANCELED = 'Cancelado',
}

export default OrderStatus;
