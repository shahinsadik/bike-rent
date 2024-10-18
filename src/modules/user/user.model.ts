/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

import { TUserSignUp } from '../auth/auth.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Phone is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid role',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUserSignUp>('User', userSchema);
