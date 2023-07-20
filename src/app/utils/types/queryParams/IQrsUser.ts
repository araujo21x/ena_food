import { Types } from 'mongoose';
import IMyQueries from './IMyQueries';

export default interface IQrsUser extends IMyQueries {
  id?: Types.ObjectId;
  notId?: number;
  name?: string;
  document?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  role?: string;
  status?: string;
  state?: string;
  city?: string;
}
