import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

const createInvoiceSchema = z.object({
  customerEmail: z.string().email().optional(),
  invoiceNumber: z.coerce.number().optional(),
  providerMunicipalReg: z.string().optional(),
  type: z.enum(['WithIA', 'WithoutIA']),
  serviceDescription: z.string().min(1),
  customerCnpjOrCpf: z.string().min(1),
  providerName: z.string().min(1),
  providerCnpj: z.string().min(1),
  customerName: z.string().min(1),
  serviceValue: z.coerce.number(),
  issueDate: z.coerce.date(),
});

export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}
