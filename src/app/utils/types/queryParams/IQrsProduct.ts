import { Types } from 'mongoose';
import IMyQueries from './IMyQueries';

export default interface IQrsProduct extends IMyQueries {
  id?: Types.ObjectId;
  notId?: number;
  name?: string;
  status?: string;
  supplierId?: Types.ObjectId;
}
