import OrderStatus from '@myTypes/enums/OrderStatus';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import DeliveryType from '@myTypes/enums/DeliveryType';
import schemaAddress, { IAddress } from './Address.model';
import schemaPayment, { IPayment } from './Payment.model';
import schemaItem, { IItem } from './Item.model';

export interface IOrder extends Document {
  supplier: Types.ObjectId;
  supplierId: Types.ObjectId;
  client: Types.ObjectId;
  clientId: Types.ObjectId;
  payment?: IPayment;
  address?: IAddress;
  items: Types.DocumentArray<IItem>;
  status: OrderStatus;
  value: number;
  discount: number;
  freight: number;
  deliveryType: DeliveryType;
}

const schemaOrder = {
  supplier: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  payment: schemaPayment,
  address: schemaAddress,
  items: [schemaItem],
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
    default: OrderStatus.CART,
  },
  value: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  freight: { type: Number, required: true, default: 0 },
  deliveryType: {
    type: String,
    enum: Object.values(DeliveryType),
    required: true,
    default: DeliveryType.DELIVERY,
  },
};

const schema = new Schema<IOrder, Model<IOrder>>(schemaOrder, {
  timestamps: true,
});

const Order = mongoose.model('Order', schema);
export default Order;
