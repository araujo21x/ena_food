import { Request } from 'express';

import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Status from '@myTypes/enums/UserStatus';
import userService from '@services/user/UserService';
import { IUser } from '@models/User.model';

class AllowedUser {
  public async generic(req: Request): Promise<IUser> {
    const { userId: id } = req;

    const user: IUser = await userService.getBy({ id });

    if (user.status !== Status.ACTIVE) {
      throw new AppError(errorMessages.ACCESS_DENIED, 403);
    }

    return user;
  }
}

export default new AllowedUser();
