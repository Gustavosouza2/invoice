import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

const createInvoiceSchema = z.object({
  status: z.enum(['Normal', 'Cancelled']).optional(),
  invoiceNumber: z.coerce.number().optional(),
  verificationCode: z.string().optional(),
  issueDate: z.coerce.date(),

  providerName: z.string().min(1),
  providerCnpj: z.string().min(1),
  providerMunicipalReg: z.string().optional(),

  customerName: z.string().min(1),
  customerCnpjOrCpf: z.string().min(1),
  customerEmail: z.string().email().optional(),

  serviceDescription: z.string().min(1),
  serviceValue: z.coerce.number(),

  taxRate: z.coerce.number().optional(),
  issValue: z.coerce.number().optional(),
  netValue: z.coerce.number().optional(),

  userId: z.string().optional(),
});

export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}
