import { Injectable } from '@nestjs/common';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { PrismaService } from '../../common/prisma/prisma.service';
import { type GetUsersResponse, type User } from './types/user';
import { type UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<GetUsersResponse[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        accounts: true,
        createdAt: true,
      },
    });

    if (!users || users.length === 0) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'Users not found');
    }

    return users as GetUsersResponse[];
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        accounts: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'User not found');
    }
    return user as User;
  }

  async updateUser(id: string, userData: Partial<UpdateUserDto>) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    if (!updateUser) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'User not found');
    }

    return this.findUserById(id);
  }

  async removeUser(id: string) {
    const deleteUser = await this.prisma.user.delete({ where: { id } });

    if (!deleteUser) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Something went wrong in deleting user'
      );
    }

    return deleteUser;
  }
}
