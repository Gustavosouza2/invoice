import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

const updateInvoiceSchema = z.object({
  invoiceNumber: z.number().optional(),
  verificationCode: z.string().optional(),
  issueDate: z.date().optional(),
  status: z.enum(['Normal', 'Cancelled']).optional(),

  providerName: z.string().optional(),
  providerCnpj: z.string().optional(),
  providerMunicipalReg: z.string().optional(),

  customerName: z.string().optional(),
  customerCnpjOrCpf: z.string().optional(),
  customerEmail: z.string().email().optional(),

  serviceDescription: z.string().optional(),
  serviceValue: z.number().optional(),
  taxRate: z.number().optional(),
  issValue: z.number().optional(),
  netValue: z.number().optional(),
  userId: z.string().uuid(),
});

export class UpdateInvoiceDto extends createZodDto(updateInvoiceSchema) {}
