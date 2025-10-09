import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { UpdateInvoiceDto } from './dto/update-invoice';
import { CreateInvoiceDto } from './dto/create-invoice';
import { FilesService } from '../files/files.service';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class InvoicesService {
  private prisma = new PrismaClient();

  constructor(private readonly filesService: FilesService) {}

  async findAllInvoices(page = 1, per_page = 10) {
    const skip = (page - 1) * per_page;
    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        skip,
        take: per_page,
        include: { user: true, file: true },
      }),
      this.prisma.invoice.count(),
    ]);

    if (!data || total === 0) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'No invoices found');
    }

    return {
      data,
      total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    };
  }

  async findInvoiceById(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        user: true,
        file: true,
      },
    });

    if (!invoice) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'Invoice not found');
    }

    return invoice;
  }

  async createInvoice(
    invoiceData: CreateInvoiceDto,
    file: Express.Multer.File
  ) {
    const newInvoice = {
      ...invoiceData,
      id: randomUUID(),
      cost: Number(invoiceData.cost),
      service_price: Number(invoiceData?.service_price),
      total_amount: Number(invoiceData.total_amount),
      labor_cost: Number(invoiceData.labor_cost),
      invoice_number: Number(invoiceData.invoice_number),
    };

    const invoice = await this.prisma.invoice.create({
      data: newInvoice,
    });

    if (!invoice) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Invoice creation failed'
      );
    }

    if (file) {
      const filePath = await this.filesService.uploadFileToSupabase(file);
      await this.prisma.file.create({
        data: {
          id: randomUUID(),
          url: filePath,
          type: file.mimetype,
          invoiceId: invoice.id,
        },
      });
    }

    return this.prisma.invoice.findUnique({
      where: { id: invoice.id },
      include: { file: true, user: true },
    });
  }

  async updateInvoice(id: string, invoiceData: Partial<UpdateInvoiceDto>) {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: invoiceData,
    });

    if (!updatedInvoice) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'Invoice update failed');
    }

    return this.findInvoiceById(id);
  }

  async removeInvoice(id: string) {
    const deletedInvoice = await this.prisma.invoice.delete({
      where: { id },
      include: { file: true },
    });

    if (!deletedInvoice) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Invoice deletion failed'
      );
    }

    return deletedInvoice;
  }
}
