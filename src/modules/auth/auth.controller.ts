import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import {
  Public,
  Session,
  AuthGuard,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Session() session: UserSession) {
    return this.authService.logout(session.session.token);
  }
}
