import { Schema, Types } from 'mongoose';

export interface IItem {
  value: number;
  amount: number;
  productSupplierId: Types.ObjectId;
  productSupplier: Types.ObjectId;
}

const schemaItem = {
  id: Types.ObjectId,
  value: { type: Number, required: true },
  amount: { type: Number, required: true },
  productSupplier: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
};

export default schemaItem;
