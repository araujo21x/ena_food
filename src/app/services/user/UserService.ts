import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User, { IUser } from '@models/User.model';
import { Types } from 'mongoose';
import IQrsUser from '@myTypes/queryParams/IQrsUser';
import userFieldService from './UserFieldService';

class UserService {
  public async searchBy(filter: IQrsUser): Promise<IUser | null> {
    if (!filter.operation) filter.operation = '$and';

    const user = await User.findOne({
      [filter.operation]: userFieldService.filter(filter),
    });

    return user;
  }

  public async getBy(filter: IQrsUser): Promise<IUser> {
    const user: IUser | null = await this.searchBy(filter);
    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    return user;
  }

  public async existInDb(filter: IQrsUser): Promise<void> {
    if (!filter.operation) filter.operation = '$or';
    const user: IUser | null = await this.searchBy(filter);
    if (user) throw new AppError(errorMessages.USER_ALREADY_EXISTS, 404);
  }

  public async create(body: IUser): Promise<IUser> {
    const user = new User(userFieldService.factory(body));
    const newUser = await user.save();

    return newUser;
  }

  public async edit(body: Partial<IUser>, id: Types.ObjectId): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      userFieldService.factory(body),
      { new: true }
    );

    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);
    return user;
  }

  public async index(filter: IQrsUser): Promise<any> {
    if (!filter.operation) filter.operation = '$and';

    const query = User.find({
      [filter.operation]: userFieldService.filter(filter),
    }).sort({ createdAt: -1 });

    if (!filter.paginate || filter.paginate === 'yes') {
      const { limit = 10, page = 1 } = filter;
      query.skip((page - 1) * limit).limit(limit);
    }
    const result = await query;

    return result;
  }
}

export default new UserService();
