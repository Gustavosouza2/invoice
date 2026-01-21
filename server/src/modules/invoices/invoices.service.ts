import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { PrismaService } from 'src/common/prisma/prisma.service';
import type {
  Invoice,
  GetInvoiceRequest,
  GetInvoiceResponse,
  UpdateInvoiceRequest,
  CreateInvoiceRequest,
  DeleteInvoiceRequest,
  UpdateInvoiceResponse,
  GetAllInvoicesRequest,
  GetAllInvoicesResponse,
} from './types/invoice';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  private supabase = createClient(
    process.env.SUPABASE_URL ?? 'http://localhost',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'test-service-role-key'
  );

  async findAllInvoices({
    page,
    per_page,
    customer_name,
  }: GetAllInvoicesRequest): Promise<GetAllInvoicesResponse> {
    const skip = (page - 1) * per_page;

    const where: {
      customerName?: {
        contains: string;
        mode: 'insensitive';
      };
    } = {};

    if (customer_name) {
      where.customerName = {
        contains: customer_name,
        mode: 'insensitive',
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        skip,
        take: per_page,
        where,
        include: {
          user: { include: { accounts: false } },
          File: true,
        },
      }),
      this.prisma.invoice.count({ where }),
    ]);

    if (!data.length) {
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
        user: { include: { accounts: false } },
        File: true,
      },
    });

    if (!invoice) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'Invoice not found');
    }

    return invoice;
  }

  async createInvoice({ file, invoiceData }: CreateInvoiceRequest) {
    if (!invoiceData.userId) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'userId is required');
    }

    try {
      const {
        providerMunicipalReg,
        serviceDescription,
        customerCnpjOrCpf,
        invoiceNumber,
        customerEmail,
        serviceValue,
        providerName,
        providerCnpj,
        customerName,
        issueDate,
        userId,
        type,
      } = invoiceData;

      const invoice = await this.prisma.invoice.create({
        data: {
          userId,
          providerName,
          providerCnpj,
          customerName,
          customerEmail,
          customerCnpjOrCpf,
          type: type ?? 'WithoutIA',
          issueDate: new Date(issueDate),
          invoiceNumber: invoiceNumber ?? 0,
          serviceValue: Number(serviceValue),
          serviceDescription: serviceDescription ?? '',
          providerMunicipalReg: providerMunicipalReg ?? '',
        },
      });

      if (!invoice) {
        throw new CustomException(
          ErrorCode.INTERNAL_ERROR,
          'Invoice creation failed'
        );
      }

      if (file) {
        const filePath = await this.uploadFileInvoice({ file });
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
        include: { user: { include: { accounts: false } }, File: true },
      });

      if (!invoiceWithRelations)
        throw new CustomException(
          ErrorCode.INTERNAL_ERROR,
          'Invoice not found after creation'
        );

      return invoiceWithRelations;
    } catch (error) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        (error as string) ?? 'Invoice creation failed'
      );
    }
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
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.file.deleteMany({ where: { invoiceId: id } });

      const deleted = await tx.invoice.delete({ where: { id } });
      return deleted;
    });

    if (!result) {
      throw new CustomException(
        ErrorCode.INTERNAL_ERROR,
        'Invoice deletion failed'
      );
    }
  }

  private async uploadFileInvoice({
    file,
  }: {
    file: Express.Multer.File;
  }): Promise<string> {
    const filePath = `invoices/${Date.now()}_${file.originalname}`;
    const { error } = await this.supabase.storage
      .from('invoices')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new CustomException(
        ErrorCode.BAD_REQUEST,
        error.message || 'Error uploading file to Supabase:'
      );
    }

    const { data: publicUrlData } = this.supabase.storage
      .from('invoices')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl;
  }

  generateInvoiceHTML(invoice: Invoice): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nota Fiscal #${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f3f3f3; }
        </style>
      </head>
      <body>
        <h1>Numero da nota #${invoice.invoiceNumber}</h1>
        <section>
        <h2>Dados do Prestador</h2>
        <p><strong>Prestador:</strong> ${invoice.providerName}</p>
        <p><strong>Cnpj/Cpf:</strong> ${invoice.providerCnpj}</p>
        <p><strong>Registro municipal:</strong> ${invoice.providerMunicipalReg ?? ''}</p>
        </section>

        <section>
        <h2>Dados do Cliente</h2>
        <p><strong>Cliente:</strong> ${invoice.customerName}</p>
        <p><strong>Cnpj/Cpf:</strong> ${invoice.customerCnpjOrCpf}</p>
        <p><strong>Email:</strong> ${invoice.customerEmail ?? ''}</p>
        </section>


        <section>
        <h2>Serviço</h2>
        <p><strong>Valor:</strong> ${invoice.serviceValue}</p>
        <p><strong>Descrição:</strong> ${invoice.serviceDescription}</p>
        </section>

        <p><strong>Data:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
      </body>
      </html>
`;
  }
}
