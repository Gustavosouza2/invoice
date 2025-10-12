import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

const createInvoiceSchema = z.object({
  invoiceNumber: z.number(),
  verificationCode: z.string().optional(),
  issueDate: z.date().optional(),
  status: z.enum(['Normal', 'Cancelled']).default('Normal'),

  providerName: z.string(),
  providerCnpj: z.string(),
  providerMunicipalReg: z.string(),

  customerName: z.string(),
  customerCnpjOrCpf: z.string(),
  customerEmail: z.string().email().optional(),

  serviceDescription: z.string(),
  serviceValue: z.number(),
  taxRate: z.number().optional(),
  issValue: z.number().optional(),
  netValue: z.number().optional(),
  userId: z.string().uuid().optional(),
});

export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}
