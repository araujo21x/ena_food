import { Types } from 'mongoose';

export interface IAddress {
  id: Types.ObjectId;
  name: string;
  default: boolean;
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
  name: { type: String, required: false },
  default: { type: Boolean, required: false },
  street: { type: String, required: false },
  district: { type: String, required: false },
  zipCode: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  number: { type: String, required: false },
  complement: { type: String, required: false },
};

export default schemaAddress;
