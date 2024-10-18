type UserRole = 'admin' | 'user';

export interface TUserSignUp {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export type TUserLogIn = {
  email: string;
  password: string;
};
