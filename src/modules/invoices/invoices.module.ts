import { Module } from '@nestjs/common';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, FilesService],
})
export class InvoicesModule {}
