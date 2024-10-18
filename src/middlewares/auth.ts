/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // checking token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // verifying jwt access token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    // we can access user from any where in req
    req.user = decoded;

    next();
  });
};

export default auth;
