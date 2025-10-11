import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import {
  Public,
  Session,
  AuthGuard,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { type RegisterDto } from './dto/register.dto';
import { type LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register({ registerData: registerDto });
  }

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login({ loginData: loginDto });
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Session() session: UserSession) {
    return this.authService.logout({ token: session.session.token });
  }
}
