import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

const updateInvoiceSchema = z.object({
  type: z.enum(['WithIA', 'WithoutIA']).optional(),
  customerEmail: z.string().email().optional(),
  providerMunicipalReg: z.string().optional(),
  serviceDescription: z.string().optional(),
  customerCnpjOrCpf: z.string().optional(),
  invoiceNumber: z.number().optional(),
  providerName: z.string().optional(),
  providerCnpj: z.string().optional(),
  customerName: z.string().optional(),
  serviceValue: z.number().optional(),
  issueDate: z.coerce.date().optional(),
});

export class UpdateInvoiceDto extends createZodDto(updateInvoiceSchema) {}
