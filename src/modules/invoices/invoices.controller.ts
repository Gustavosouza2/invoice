import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Body,
  Post,
  Query,
  Patch,
  Delete,
  Param,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { type CreateInvoiceDto } from './dto/create-invoice';
import { type UpdateInvoiceDto } from './dto/update-invoice';
import { InvoicesService } from './invoices.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtGuard)
  @Post('/create-invoice')
  @UseInterceptors(FileInterceptor('file'))
  createInvoice(
    @Body() CreateInvoiceDto: CreateInvoiceDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.invoicesService.createInvoice({
      file,
      invoiceData: CreateInvoiceDto,
    });
  }

  @UseGuards(JwtGuard)
  @Get('/get-invoices')
  findAllInvoices(@Query('page') page = 1, @Query('per_page') per_page = 10) {
    return this.invoicesService.findAllInvoices({
      page: Number(page),
      per_page: Number(per_page),
    });
  }

  @UseGuards(JwtGuard)
  @Get('/get-invoice/:id')
  findInvoiceById(@Param('id') id: string) {
    return this.invoicesService.findInvoiceById({ id });
  }

  @UseGuards(JwtGuard)
  @Patch('/update-invoice/:id')
  updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoice: Partial<UpdateInvoiceDto>
  ) {
    return this.invoicesService.updateInvoice({
      id,
      invoiceData: updateInvoice,
    });
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-invoice/:id')
  removeInvoice(@Param('id') id: string) {
    return this.invoicesService.removeInvoice({ id });
  }
}
