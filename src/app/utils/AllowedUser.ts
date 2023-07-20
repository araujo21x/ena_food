import { Request } from 'express';

import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Status from '@myTypes/enums/UserStatus';
import userService from '@services/user/UserService';
import { IUser } from '@models/User.model';
import UserRole from '@myTypes/enums/UserRole';

class AllowedUser {
  public async generic(req: Request, rolesValid?: UserRole[]): Promise<IUser> {
    const { userId: id } = req;

    const user: IUser = await userService.getBy({ id });
    if (rolesValid && !rolesValid.includes(user.role)) {
      throw new AppError(errorMessages.HAS_NO_ASSOCIATED_PERMISSION, 403);
    }

    if (user.status !== Status.ACTIVE) {
      throw new AppError(errorMessages.ACCESS_DENIED, 403);
    }

    return user;
  }
}

export default new AllowedUser();
