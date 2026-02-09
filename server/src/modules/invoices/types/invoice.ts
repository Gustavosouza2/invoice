import { type UpdateInvoiceDto } from '../dto/update-invoice';
import { type CreateInvoiceDto } from '../dto/create-invoice';
import type { Prisma } from 'generated/prisma';

export type GetAllInvoicesRequest = {
  customer_name: string;
  per_page: number;
  userId: string;
  page: number;
};

export type Invoice = Prisma.InvoiceGetPayload<{
  include: { user: { include: { accounts: false } }; File: true };
}>;

export type GetAllInvoicesResponse = Awaited<{
  total_pages: number;
  per_page: number;
  data: Invoice[];
  total: number;
  page: number;
}>;

export type GetInvoiceRequest = {
  userId: string;
  id: string;
};

export type GetInvoiceResponse = Awaited<Invoice>;

export type CreateInvoiceRequest = {
  invoiceData: CreateInvoiceDto;
  file?: Express.Multer.File;
  userId: string;
};

export type CreateInvoiceResponse = Awaited<Invoice>;

export type UpdateInvoiceRequest = {
  invoiceData: Partial<UpdateInvoiceDto>;
  userId: string;
  id: string;
};

export type UpdateInvoiceResponse = Awaited<Invoice>;

export type DeleteInvoiceRequest = {
  userId: string;
  id: string;
};
