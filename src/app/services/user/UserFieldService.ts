/* eslint-disable no-underscore-dangle */
import { IUser } from '@models/User.model';
import hashPassword from '@utils/hashPassword';
import IQrsUser from '@myTypes/queryParams/IQrsUser';
import { FilterQuery } from 'mongoose';

class UserFieldService {
  public filter(filter: IQrsUser): FilterQuery<IUser>[] {
    const { document, email, phone, businessName, role, status } = filter;
    const where: FilterQuery<IUser>[] = [];

    if (document) where.push({ document });
    if (email) where.push({ email });
    if (phone) where.push({ phone });
    if (businessName) where.push({ businessName });
    if (role) where.push({ role });
    if (status) where.push({ status });

    return where;
  }

  public factory(body: Partial<IUser>): Partial<IUser> {
    const user: Partial<IUser> = {};

    if (body.id) user._id = body.id;
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.phone) user.phone = body.phone.replace(/[^\d]+/g, '');
    if (body.businessName) user.businessName = body.businessName;
    if (body.document) user.document = body.document.replace(/[^\d]+/g, '');
    if (body.role) user.role = body.role;
    if (body.status) user.status = body.status;
    if (body.birthDay) user.birthDay = body.birthDay;
    if (body.password) user.password = hashPassword(body.password);
    if (body.addresses) user.addresses = body.addresses;

    return user;
  }
}

export default new UserFieldService();
