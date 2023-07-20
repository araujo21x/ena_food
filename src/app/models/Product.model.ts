import ProductStatus from '@myTypes/enums/ProductStatus';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
  id: Types.ObjectId;
  name: string;
  value: number;
  discount: number;
  discountedValue: number;
  preparationTime: number;
  status: ProductStatus;
  supplier: Types.ObjectId;
  supplierId: Types.ObjectId;
}

const schemaProduct = {
  name: { type: String, required: true },
  value: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  discountedValue: { type: Number, required: true },
  preparationTime: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(ProductStatus),
    required: true,
    default: ProductStatus.ACTIVE,
  },
  supplier: { type: Schema.Types.ObjectId, ref: 'User', required: true },
};

const schema = new Schema<IProduct, Model<IProduct>>(schemaProduct, {
  timestamps: true,
});

const Product = mongoose.model('Product', schema);
export default Product;
