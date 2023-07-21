import { Types } from 'mongoose';
import IMyQueries from './IMyQueries';

export default interface IQrsOrder extends IMyQueries {
  id?: Types.ObjectId;
  notId?: number;
  supplierId?: Types.ObjectId;
  clientId?: Types.ObjectId;
  status?: string;
  notStatus?: string[];
}
