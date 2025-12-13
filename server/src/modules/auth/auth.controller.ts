import {
  Req,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import {
  Public,
  Session,
  Optional,
  AuthGuard,
} from '@thallesp/nestjs-better-auth';

import { type RegisterDto } from './dto/register.dto';
import { type LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { type Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register({ registerData: registerDto });
  }

  @Public()
  @HttpCode(200)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login({ loginData: loginDto });
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Optional()
  async logout(@Req() req: Request, @Session() token: string) {
    const authHeader = req.headers.authorization;
    const headerToken =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer')
        ? authHeader.slice(7)
        : undefined;

    const finalToken = token ?? headerToken;
    if (!finalToken) {
      throw new BadRequestException('Missing session token');
    }

    return this.authService.logout({ token: finalToken });
  }

  @Public()
  @HttpCode(200)
  @Post('/refresh')
  @Optional()
  async refresh(@Req() req: Request, @Session() token: string) {
    const authHeader = req.headers.authorization;
    const headerToken =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : undefined;

    const finalToken = token ?? headerToken;
    if (!finalToken) {
      throw new BadRequestException('Missing session token');
    }

    return this.authService.refresh({ token: finalToken });
  }
}
