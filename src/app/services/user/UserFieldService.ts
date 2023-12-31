/* eslint-disable no-underscore-dangle */
import { IUser } from '@models/User.model';
import hashPassword from '@utils/hashPassword';
import IQrsUser from '@myTypes/queryParams/IQrsUser';
import { FilterQuery } from 'mongoose';

class UserFieldService {
  public filter(filter: IQrsUser): FilterQuery<IUser>[] {
    const {
      id,
      document,
      name,
      email,
      phone,
      businessName,
      role,
      status,
      city,
      state,
    } = filter;
    const where: FilterQuery<IUser>[] = [];

    if (id) where.push({ _id: id });
    if (name) where.push({ name });
    if (document) where.push({ document });
    if (email) where.push({ email });
    if (phone) where.push({ phone });
    if (businessName) where.push({ businessName });
    if (role) where.push({ role });
    if (status) where.push({ status });
    if (city) where.push({ 'addresses.city': city });
    if (state) where.push({ 'addresses.state': state });

    return where;
  }

  public factory(body: Partial<IUser>): Partial<IUser> {
    const user: Partial<IUser> = {};

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
