import { type UpdateUserDto } from '../dto/update-user.dto';

export type Account = {
  password: string | null;
  providerId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  id: string;
};

export type User = {
  password: string | null;
  emailVerified: boolean;
  phone: string | null;
  image: string | null;
  accounts: Account[];
  updatedAt: Date;
  createdAt: Date;
  email: string;
  name: string;
  id: string;
};

export type GetAllUsersResponse = {
  accounts: Account[];
  createdAt: Date;
  phone: string;
  email: string;
  name: string;
  id: string;
};

export type GetUserRequest = {
  id: string;
};

export type GetUserResponse = {
  phone: string | null;
  accounts: Account[];
  createdAt: Date;
  email: string;
  name: string;
  id: string;
};

export type UpdateUserRequest = {
  id: string;
  userData: Partial<UpdateUserDto>;
};

export type UpdateUserResponse = GetUserResponse;

export type DeleteUserRequest = {
  id: string;
};
