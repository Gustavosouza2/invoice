import { Module } from '@nestjs/common';
import { ProjectAuthModule } from '../auth/auth.module';

import { PrismaService } from '../../common/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ProjectAuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
