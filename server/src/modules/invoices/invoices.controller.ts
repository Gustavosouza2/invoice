import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Res,
  Req,
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
  UnauthorizedException,
} from '@nestjs/common';
import { type Response } from 'express';

import { type CreateInvoiceDto } from './dto/create-invoice';
import { type UpdateInvoiceDto } from './dto/update-invoice';
import { InvoicesService } from './invoices.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  private getUserIdOrThrow(req: { user?: { userId?: string } }): string {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedException('Unauthorized');
    return userId;
  }

  @UseGuards(JwtGuard)
  @Post('/create-invoice')
  @UseInterceptors(FileInterceptor('file'))
  async createInvoice(
    @Req() req: { user?: { userId?: string } },
    @Body() CreateInvoiceDto: CreateInvoiceDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const userId = this.getUserIdOrThrow(req);
    return this.invoicesService.createInvoice({
      file,
      invoiceData: CreateInvoiceDto,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Get('/get-invoices')
  async findAllInvoices(
    @Req() req: { user?: { userId?: string } },
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('per_page') per_page: number
  ) {
    const userId = this.getUserIdOrThrow(req);
    return this.invoicesService.findAllInvoices({
      page: Number(page),
      per_page: Number(per_page),
      customer_name: String(name),
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Get('/get-invoice/:id')
  async findInvoiceById(
    @Req() req: { user?: { userId?: string } },
    @Param('id') id: string
  ) {
    const userId = this.getUserIdOrThrow(req);
    return this.invoicesService.findInvoiceById({
      id,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Patch('/update-invoice/:id')
  async updateInvoice(
    @Req() req: { user?: { userId?: string } },
    @Param('id') id: string,
    @Body() updateInvoice: UpdateInvoiceDto
  ) {
    const userId = this.getUserIdOrThrow(req);
    return this.invoicesService.updateInvoice({
      id,
      invoiceData: updateInvoice,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-invoice/:id')
  @HttpCode(204)
  async removeInvoice(
    @Req() req: { user?: { userId?: string } },
    @Param('id') id: string
  ) {
    const userId = this.getUserIdOrThrow(req);
    await this.invoicesService.removeInvoice({
      id,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id/document')
  async viewInvoiceDocument(
    @Req() req: { user?: { userId?: string } },
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const userId = this.getUserIdOrThrow(req);
    const invoice = await this.invoicesService.findInvoiceById({
      id,
      userId,
    });

    const invoiceDocument = this.invoicesService.generateInvoiceHTML(invoice);

    res.setHeader('Content-Type', 'text/html');
    return res.send(invoiceDocument);
  }

  @UseGuards(JwtGuard)
  @Get(':id/file')
  async getInvoiceFile(
    @Req() req: { user?: { userId?: string } },
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const userId = this.getUserIdOrThrow(req);
    const invoice = await this.invoicesService.findInvoiceById({
      id,
      userId,
    });
    if (!invoice?.File) throw new NotFoundException('File not found');
    return res.redirect(invoice.File.url);
  }
}
