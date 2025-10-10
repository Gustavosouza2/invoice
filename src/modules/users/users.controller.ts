import {
  Get,
  Body,
  Patch,
  Param,
  Delete,
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
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('/get-user/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update-user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
