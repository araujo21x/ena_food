import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User, { IUser } from '@models/User.model';
import IForgetFields from '@myTypes/generics/IForgetFields';
import hashPassword from '@utils/hashPassword';
import crypto from 'crypto';
import { Types } from 'mongoose';

class PasswordService {
  public async forgot(email: string): Promise<string> {
    const { passwordResetExpires, passwordResetToken } =
      this.generateForgetFields();

    await User.findOneAndUpdate(
      { email },
      { passwordResetExpires, passwordResetToken }
    );

    return passwordResetToken;
  }

  public generateForgetFields(): IForgetFields {
    const passwordResetToken: string = crypto
      .randomBytes(9)
      .toString('hex')
      .slice(0, 6);

    const now: Date = new Date();
    now.setHours(now.getHours() + 4);

    return { passwordResetExpires: now, passwordResetToken };
  }

  public async getUserByCodeReset(code: string): Promise<IUser> {
    const user = await User.findOne({ passwordResetToken: code }).select(
      'passwordResetExpires passwordResetToken'
    );

    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    return user;
  }

  public resetTokenIsValid(expirationDate: Date): void {
    const now: Date = new Date();

    if (now >= expirationDate) {
      throw new AppError(errorMessages.EXPIRED_PASSWORD_REGISTER, 400);
    }
  }

  public async reset(id: Types.ObjectId, password: string): Promise<void> {
    await User.findOneAndUpdate(
      { _id: id },
      {
        passwordResetExpires: null,
        passwordResetToken: null,
        password: hashPassword(password),
      }
    );
  }
}

export default new PasswordService();
