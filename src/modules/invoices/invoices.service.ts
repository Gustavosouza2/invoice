import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { FilesService } from '../files/files.service';
import { PrismaClient } from 'generated/prisma';
import type {
  GetInvoiceRequest,
  GetInvoiceResponse,
  DeleteInvoiceRequest,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  GetllInvoicesResponse,
  GetAllInvoicesRequest,
  CreateInvoiceResponse,
  UpdateInvoiceResponse,
} from './types/invoice';

@Injectable()
export class InvoicesService {
  private prisma = new PrismaClient();

  constructor(private readonly filesService: FilesService) {}

  async findAllInvoices({
    page,
    per_page,
  }: GetAllInvoicesRequest): Promise<GetllInvoicesResponse> {
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

  async findInvoiceById({
    id,
  }: GetInvoiceRequest): Promise<GetInvoiceResponse> {
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

  async createInvoice({
    file,
    invoiceData,
  }: CreateInvoiceRequest): Promise<CreateInvoiceResponse> {
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
      const filePath = await this.filesService.uploadFileToSupabase({ file });
      await this.prisma.file.create({
        data: {
          id: randomUUID(),
          url: filePath,
          type: file.mimetype,
          invoiceId: invoice.id,
        },
      });
    }

    const invoiceWithRelations = await this.prisma.invoice.findUnique({
      where: { id: invoice.id },
      include: { file: true, user: true },
    });

    if (!invoiceWithRelations)
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Invoice not found after creation'
      );

    return invoiceWithRelations;
  }

  async updateInvoice({
    id,
    invoiceData,
  }: UpdateInvoiceRequest): Promise<UpdateInvoiceResponse> {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: invoiceData,
    });

    if (!updatedInvoice) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'Invoice update failed');
    }

    const invoice = await this.findInvoiceById({ id });
    return invoice;
  }

  async removeInvoice({ id }: DeleteInvoiceRequest): Promise<void> {
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
  }
}
