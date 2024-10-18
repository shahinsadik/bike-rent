import { USER_ROLE } from './user.constant';

type UserRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
};

export type TUserRole = keyof typeof USER_ROLE;
