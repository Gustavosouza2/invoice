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
    const dataToUpdate = {
      ...invoiceData,
      ...(invoiceData.issueDate && {
        issueDate: new Date(invoiceData.issueDate),
      }),
    };
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: dataToUpdate,
    });

    if (!updatedInvoice) {
      throw new CustomException(ErrorCode.BAD_REQUEST, 'Invoice update failed');
    }

    return this.findInvoiceById({ id });
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
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    };

    const formatDate = (date: Date | string): string => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(dateObj);
    };

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nota Fiscal #${invoice.invoiceNumber}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #1A1A1D;
            color: #F5F5F7;
            padding: 40px;
            line-height: 1.6;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #151518;
            border-radius: 12px;
            padding: 48px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          }
          
          .header {
            text-align: center;
            margin-bottom: 48px;
            padding-bottom: 32px;
            border-bottom: 2px solid #E1C379;
          }
          
          .header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #E1C379;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          
          .invoice-number {
            font-size: 18px;
            color: #A8A8B0;
            font-weight: 500;
          }
          
          .sections {
            display: grid;
            gap: 32px;
            margin-bottom: 40px;
          }
          
          .section {
            background: #2A2A2E;
            border: 1px solid #3E3E3F;
            border-radius: 8px;
            padding: 24px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #E1C379;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #3E3E3F;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid rgba(62, 62, 63, 0.5);
          }
          
          .info-row:last-child {
            border-bottom: none;
          }
          
          .info-label {
            font-weight: 600;
            color: #A8A8B0;
            min-width: 180px;
            font-size: 14px;
          }
          
          .info-value {
            color: #F5F5F7;
            font-size: 14px;
            flex: 1;
          }
          
          .service-section {
            background: linear-gradient(135deg, #2A2A2E 0%, #252529 100%);
            border: 1px solid #3E3E3F;
            border-radius: 8px;
            padding: 32px;
            margin-top: 8px;
          }
            
          
          .service-value {
            font-size: 36px;
            font-weight: 700;
            color: #E1C379;
            margin: 16px 0;
            text-align: center;
            padding: 20px;
            background: rgba(225, 195, 121, 0.1);
            border-radius: 8px;
          }
          
          .service-description {
            color: #F5F5F7;
            font-size: 15px;
            line-height: 1.8;
            padding: 16px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 6px;
            margin-top: 16px;
          }
          
          .footer {
            margin-top: 48px;
            padding-top: 32px;
            border-top: 1px solid #3E3E3F;
            text-align: center;
          }
          
          .issue-date {
            font-size: 16px;
            color: #A8A8B0;
            font-weight: 500;
          }
          
          .issue-date strong {
            color: #E1C379;
            margin-right: 8px;
          }
          
          @media print {
            body {
              padding: 20px;
            }
            
            .container {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NOTA FISCAL</h1>
            <div class="invoice-number">Nº ${invoice.invoiceNumber}</div>
          </div>
          
          <div class="sections">
            <div class="section">
              <h2 class="section-title">Dados do Prestador</h2>
              <div class="info-row">
                <span class="info-label">Prestador:</span>
                <span class="info-value">${invoice.providerName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">CNPJ/CPF:</span>
                <span class="info-value">${invoice.providerCnpj}</span>
              </div>
              ${
                invoice.providerMunicipalReg
                  ? `
              <div class="info-row">
                <span class="info-label">Registro Municipal:</span>
                <span class="info-value">${invoice.providerMunicipalReg}</span>
              </div>
              `
                  : ''
              }
            </div>
            
            <div class="section">
              <h2 class="section-title">Dados do Cliente</h2>
              <div class="info-row">
                <span class="info-label">Cliente:</span>
                <span class="info-value">${invoice.customerName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">CNPJ/CPF:</span>
                <span class="info-value">${invoice.customerCnpjOrCpf}</span>
              </div>
              ${
                invoice.customerEmail
                  ? `
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${invoice.customerEmail}</span>
              </div>
              `
                  : ''
              }
            </div>
            
            <div class="service-section">
              <h2 class="section-title">Serviço</h2>
              <div class="service-value">
                ${formatCurrency(invoice.serviceValue)}
              </div>
              <div class="service-description">
                ${invoice.serviceDescription}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="issue-date">
              <strong>Data de Emissão:</strong>${formatDate(invoice.issueDate)}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
