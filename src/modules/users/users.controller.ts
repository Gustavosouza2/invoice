import { AuthGuard } from '@thallesp/nestjs-better-auth';
import {
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/get-users')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/get-user/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
