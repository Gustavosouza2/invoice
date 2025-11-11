import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type {
  LoginRequest,
  LogoutRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshRequest,
  RefreshResponse,
} from './types/authentication';
import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { auth } from './auth';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  private generateJwtToken(user: {
    id: string;
    email: string;
    name?: string | null;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name ?? undefined,
    };
    return this.jwtService.sign(payload);
  }

  async register({ registerData }: RegisterRequest): Promise<RegisterResponse> {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: registerData.email,
          password: registerData.password,
          name: registerData.name,
          phone: registerData.phone,
        },
      });

      if (!result.token)
        throw new CustomException(ErrorCode.INTERNAL_ERROR, 'Token not found');

      if (!result.user)
        throw new CustomException(ErrorCode.NOT_FOUND, 'User not found');

      const jwt = this.generateJwtToken({
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      });

      return {
        jwt,
        success: true,
        user: result.user,
        token: result.token,
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Internal server error'
      );
    }
  }

  async login({ loginData }: LoginRequest): Promise<LoginResponse> {
    try {
      const signInResponse = await auth.api.signInEmail({
        body: {
          email: loginData.email,
          password: loginData.password,
        },
      });

      if (!signInResponse.user)
        throw new CustomException(ErrorCode.BAD_REQUEST, 'Sign in failed');

      if (!signInResponse.token)
        throw new CustomException(ErrorCode.INTERNAL_ERROR, 'Token not found');

      const jwt = this.generateJwtToken({
        id: signInResponse.user.id,
        email: signInResponse.user.email,
        name: signInResponse.user.name,
      });

      return {
        jwt,
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

  async logout({ token }: LogoutRequest): Promise<LogoutResponse> {
    try {
      const signOutResponse = await auth.api.signOut({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!signOutResponse.success)
        throw new CustomException(ErrorCode.BAD_REQUEST, 'Sign out failed');

      return { success: true };
    } catch (error) {
      // Fallback to delete session from DB if Better Auth failed
      try {
        await this.prisma.session.delete({ where: { token } });
        return { success: true };
      } catch {
        throw new CustomException(
          ErrorCode.INTERNAL_ERROR,
          (error as string) ?? 'Internal server error'
        );
      }
    }
  }

  async refresh({ token }: RefreshRequest): Promise<RefreshResponse> {
    try {
      // Validate session via DB as source of truth
      const session = await this.prisma.session.findUnique({
        where: { token },
      });

      if (!session) {
        throw new CustomException(ErrorCode.UNAUTHORIZED, 'Invalid session');
      }

      if (new Date(session.expiresAt) <= new Date()) {
        throw new CustomException(ErrorCode.UNAUTHORIZED, 'Session expired');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, email: true, name: true },
      });

      if (!user) {
        throw new CustomException(ErrorCode.NOT_FOUND, 'User not found');
      }

      const jwt = this.generateJwtToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return { jwt, success: true };
    } catch (error) {
      if (error instanceof CustomException) {
        throw error;
      }
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Internal server error'
      );
    }
  }
}
