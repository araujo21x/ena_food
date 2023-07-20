import PaymentStatus from '@myTypes/enums/PaymentStatus';
import { Types } from 'mongoose';

export interface IPayment {
  idGateway?: string;
  status: PaymentStatus;
}

const schemaPayment = {
  id: Types.ObjectId,
  idGateway: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    required: true,
    default: PaymentStatus.PENDING,
  },
};

export default schemaPayment;
