import { Types } from 'mongoose';

export interface IAddress {
  id: Types.ObjectId;
  name: string;
  default: string;
  street: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const schemaAddress = {
  id: Types.ObjectId,
  name: { type: String, required: true },
  default: { type: Boolean, required: true },
  street: { type: String, required: true },
  district: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, required: false },
};

export default schemaAddress;
