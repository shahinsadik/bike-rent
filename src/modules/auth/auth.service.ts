/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import config from '../../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import AppError from '../../errors/appError';
import { TUserLogIn, TUserSignUp } from './auth.interface';

//* user sign up
const userSignUpIntoDB = async (payload: TUserSignUp) => {
  // converting the plain password into hash password
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashPassword;
  const result = await User.create(payload);

  // removing password field while sending the response
  const removeField = result.toObject();
  const { password, ...remainingData } = removeField;

  return remainingData;
};

//* user login
const userLoginIntoDB = async (payload: TUserLogIn) => {
  // checking if the user exists
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // checking if the password is correct or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  // removing the password,createdAt,updatedAt field in response
  const removeFields = user.toObject();
  const { password, createdAt, updatedAt, ...remainingData } = removeFields;

  // creating jwt token and sending to the client
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  return { token: accessToken, remainingData };
};

export const AuthServices = {
  userSignUpIntoDB,
  userLoginIntoDB,
};
