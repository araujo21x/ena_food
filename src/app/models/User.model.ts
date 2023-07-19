import UserStatus from '@myTypes/enums/UserStatus';
import mongoose, { Types, Schema, Model } from 'mongoose';
import UserRole from '@myTypes/enums/UserRole';
import schemaAddress, { IAddress } from './Address.model';

interface IUser {
  id: Types.ObjectId;
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  document: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date | string;
  birthDay?: Date | string;
  addresses: Types.DocumentArray<IAddress>;
  createdAt: Date;
  updatedAt: Date;
}

const schemaUser = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, max: 11 },
  businessName: { type: String, required: false },
  document: { type: String, required: true, max: 15 },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.CUSTOMER,
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    required: true,
    default: UserStatus.ACTIVE,
  },
  birthDay: { type: Date, required: false },
  password: { type: String, required: true, select: false },
  passwordResetToken: { type: String, required: false, select: false },
  passwordResetExpires: { type: Date, required: false, select: false },
  addresses: [schemaAddress],
};

const schema = new Schema<IUser, Model<IUser>>(schemaUser, {
  timestamps: true,
});
export { IUser };
const User = mongoose.model('User', schema);
export default User;
