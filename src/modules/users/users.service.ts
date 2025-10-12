import { Injectable } from '@nestjs/common';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { PrismaService } from '../../common/prisma/prisma.service';
import type {
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  DeleteUserRequest,
  UpdateUserResponse,
  GetAllUsersResponse,
} from './types/user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<GetAllUsersResponse[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        accounts: {
          select: {
            id: true,
            userId: true,
            providerId: true,
            accountId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
      },
    });

    if (!users || users.length === 0) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'Users not found');
    }

    return users as GetAllUsersResponse[];
  }

  async findUserById({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        accounts: {
          select: {
            id: true,
            userId: true,
            providerId: true,
            accountId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
      },
    });

    if (!user) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'User not found');
    }
    return user;
  }

  async updateUser({
    id,
    userData,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    if (!updateUser) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'User not found');
    }

    const user = this.findUserById({ id });
    return user;
  }

  async removeUser({ id }: DeleteUserRequest): Promise<void> {
    const deleteUser = await this.prisma.user.delete({ where: { id } });

    if (!deleteUser) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Something went wrong in deleting user'
      );
    }
  }
}
