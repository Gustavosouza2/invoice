import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { InvoicesController } from './invoices.controller';
import { ProjectAuthModule } from '../auth/auth.module';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [ProjectAuthModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class InvoicesModule {}
