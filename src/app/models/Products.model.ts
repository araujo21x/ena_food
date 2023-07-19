import { Types } from 'mongoose';

export interface IAddress {
  id: Types.ObjectId;
  name: string;
  default: string;
  street: string;
  district: string;
  zipCode: string;
  number: string;
  complement?: string;
}

const schemaAddress = {
  id: Types.ObjectId,
  name: { type: String, required: true },
  default: { type: Boolean, required: true },
  street: { type: String, required: true },
  district: { type: String, required: true },
  zipCode: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, required: false },
};

export default schemaAddress;
