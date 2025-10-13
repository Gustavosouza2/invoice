import {
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/get-users')
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('/get-user/:id')
  async findUserById(@Param('id') id: string) {
    return await this.usersService.findUserById({ id });
  }

  @UseGuards(JwtGuard)
  @Patch('/update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.updateUser({ id, userData: updateUserDto });
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-user/:id')
  @HttpCode(204)
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser({ id });
  }
}
