import { Schema, Types } from 'mongoose';

export interface IItem {
  value: number;
  amount: number;
  productId: Types.ObjectId;
  product: Types.ObjectId;
}

const schemaItem = {
  id: Types.ObjectId,
  value: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
};

export default schemaItem;
