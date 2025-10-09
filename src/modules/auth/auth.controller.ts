import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import {
  Session,
  AuthGuard,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Session() session: UserSession) {
    return this.authService.logout(session.session.token);
  }

  @UseGuards(AuthGuard)
  @Post('jwt')
  async jwt(@Session() session: UserSession) {
    return this.authService.getJwtToken(session.session.token);
  }
}
