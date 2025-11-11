import { type User } from 'src/modules/users/types/user';
import { type RegisterDto } from '../dto/register.dto';
import { type LoginDto } from '../dto/login.dto';

type BetterAuthUser = Pick<
  User,
  'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'
>;

export type RegisterRequest = {
  registerData: RegisterDto;
};

export type RegisterResponse = Awaited<{
  user: BetterAuthUser;
  success: boolean;
  message: string;
  token: string;
  jwt: string;
}>;

export type LoginRequest = {
  loginData: LoginDto;
};

export type LoginResponse = Awaited<{
  user: BetterAuthUser;
  success: boolean;
  message: string;
  token: string;
  jwt: string;
}>;

export type LogoutRequest = {
  token: string;
};

export type LogoutResponse = Awaited<{
  success: boolean;
}>;

export type RefreshRequest = {
  token: string;
};

export type RefreshResponse = Awaited<{
  jwt: string;
  success: boolean;
}>;
