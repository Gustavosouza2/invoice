import { Module } from '@nestjs/common';
import { ProjectAuthModule } from '../auth/auth.module';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { FilesService } from '../files/files.service';

@Module({
  imports: [ProjectAuthModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, FilesService],
})
export class InvoicesModule {}
