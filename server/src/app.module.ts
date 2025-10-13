import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { Module } from '@nestjs/common';

import { InvoicesModule } from './modules/invoices/invoices.module';
import { ProjectAuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth } from './modules/auth/auth';

@Module({
  imports: [
    UsersModule,
    InvoicesModule,
    ProjectAuthModule,
    BetterAuthModule.forRoot(auth),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
