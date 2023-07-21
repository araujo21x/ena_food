import PaymentStatus from '@myTypes/enums/PaymentStatus';
import PaymentType from '@myTypes/enums/PaymentType';
import { Types } from 'mongoose';

export interface IPayment {
  idGateway?: string;
  status: PaymentStatus;
  paymentType: PaymentType;
}

const schemaPayment = {
  id: Types.ObjectId,
  idGateway: { type: String, required: false },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    required: false,
    default: PaymentStatus.PENDING,
  },
  paymentType: {
    type: String,
    enum: Object.values(PaymentType),
    required: false,
    default: PaymentType.APP,
  },
};

export default schemaPayment;
