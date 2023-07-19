import { IUser } from '@models/User.model';

export default interface IAuthorized {
  token: string;
  user: IUser;
}
