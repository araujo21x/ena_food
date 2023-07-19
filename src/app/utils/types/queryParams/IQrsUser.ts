import IMyQueries from './IMyQueries';

export default interface IQrsUser extends IMyQueries {
  id?: number;
  notId?: number;
  name?: string;
  document?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  role?: string;
  status?: string;
}
