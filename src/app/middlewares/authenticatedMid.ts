import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import auth from '@config/auth';
import UserRole from '@myTypes/enums/UserRole';

export interface ITokenPayload {
  userId: Types.ObjectId;
  userRole: UserRole;
}

async function authenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) throw new AppError(errorMessages.TOKEN_NOT_PROVIDED, 401);

  const [, token] = authToken.split(' ');

  if (!token) throw new AppError(errorMessages.BADLY_FORMATTED_TOKEN, 401);

  try {
    const data: string | jwt.JwtPayload = jwt.verify(token, auth.secret);
    const { userId, userRole } = data as ITokenPayload;

    req.userId = userId;
    req.userRole = userRole;

    return next();
  } catch (error) {
    throw new AppError(errorMessages.INVALID_TOKEN, 401);
  }
}

export default authenticated;
