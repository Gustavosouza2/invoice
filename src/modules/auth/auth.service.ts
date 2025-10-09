import { Injectable } from '@nestjs/common';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { PrismaService } from '../../common/prisma/prisma.service';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import { auth } from './auth';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(registerDto: RegisterDto) {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: registerDto.email,
          password: registerDto.password,
          name: registerDto.name,
          phone: registerDto.phone,
        },
      });

      if (!result.token)
        throw new CustomException(ErrorCode.INTERNAL_ERROR, 'Token not found');

      if (!result.user)
        throw new CustomException(ErrorCode.NOT_FOUND, 'User not found');

      return {
        success: true,
        user: result.user,
        token: result.token,
        message: 'User registered successfully',
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Internal server error';
      throw new CustomException(ErrorCode.INTERNAL_ERROR, message);
    }
  }

  async login(payload: LoginDto) {
    try {
      const signInResponse = await auth.api.signInEmail({
        body: {
          email: payload.email,
          password: payload.password,
        },
      });

      if (!signInResponse.user)
        throw new CustomException(ErrorCode.BAD_REQUEST, 'Sign in failed');

      if (!signInResponse.token)
        throw new CustomException(ErrorCode.INTERNAL_ERROR, 'Token not found');

      return {
        success: true,
        user: signInResponse.user,
        token: signInResponse.token,
        message: 'User logged in successfully',
      };
    } catch (error) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Internal server error'
      );
    }
  }

  async logout(sessionToken: string) {
    try {
      const signOutResponse = await auth.api.signOut({
        headers: {
          authorization: `Bearer ${sessionToken}`,
        },
      });

      if (!signOutResponse.success)
        throw new CustomException(ErrorCode.BAD_REQUEST, 'Sign out failed');

      return { success: true };
    } catch (error) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Internal server error'
      );
    }
  }

  async getJwtToken(sessionToken: string) {
    try {
      const response = await auth.api.getToken({
        headers: {
          authorization: `Bearer ${sessionToken}`,
        },
      });
      return response;
    } catch (error) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Internal server error'
      );
    }
  }
}
