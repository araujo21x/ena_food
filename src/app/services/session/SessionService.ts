/* eslint-disable no-underscore-dangle */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import ILogin from '@myTypes/body/ILogin';
import IAuthorized from '@myTypes/generics/IAuthorized';
import auth from '@config/auth';
import UserModel, { IUser } from '@models/User.model';
import UserStatus from '@myTypes/enums/UserStatus';
import UserRole from '@myTypes/enums/UserRole';

class SessionService {
  public async standardLogin(body: ILogin): Promise<IAuthorized> {
    const user = await this.getUserSession(body.email);

    await this.comparePassword(user.password as string, body.password);

    user.password = '*******';

    return { token: this.generateJWT(user.id, user.role), user };
  }

  private async getUserSession(email: string): Promise<IUser> {
    const user = await UserModel.findOne({ email }).select(
      'name email phone businessName document role status password birthDay addresses createdAt updatedAt'
    );

    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    if (user.status === UserStatus.INACTIVE) {
      throw new AppError(errorMessages.ACCESS_DENIED, 404);
    }

    return user;
  }

  private async comparePassword(
    userPassword: string,
    password: string
  ): Promise<void> {
    const validPassword = await bcryptjs.compare(password, userPassword);
    if (!validPassword) {
      throw new AppError(errorMessages.INVALID_CREDENTIALS, 400);
    }
  }

  public generateJWT(userId: Types.ObjectId, userRole: UserRole): string {
    return jwt.sign({ userId, userRole }, auth.secret, {});
  }
}

export default new SessionService();
