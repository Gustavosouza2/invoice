import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Res,
  Body,
  Post,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { type Response } from 'express';

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
  async createInvoice(
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
  async findAllInvoices(
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('per_page') per_page: number
  ) {
    return this.invoicesService.findAllInvoices({
      page: Number(page),
      per_page: Number(per_page),
      customer_name: String(name),
    });
  }

  @UseGuards(JwtGuard)
  @Get('/get-invoice/:id')
  async findInvoiceById(@Param('id') id: string) {
    return this.invoicesService.findInvoiceById({ id });
  }

  @UseGuards(JwtGuard)
  @Patch('/update-invoice/:id')
  async updateInvoice(
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
  @HttpCode(204)
  async removeInvoice(@Param('id') id: string) {
    await this.invoicesService.removeInvoice({ id });
  }

  @UseGuards(JwtGuard)
  @Get(':id/document')
  async viewInvoiceDocument(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findInvoiceById({ id });

    const invoiceDocument = this.invoicesService.generateInvoiceHTML(invoice);

    res.setHeader('Content-Type', 'text/html');
    return res.send(invoiceDocument);
  }

  @UseGuards(JwtGuard)
  @Get(':id/file')
  async getInvoiceFile(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findInvoiceById({ id });
    if (!invoice?.File) throw new NotFoundException('File not found');
    return res.redirect(invoice.File.url);
  }
}
