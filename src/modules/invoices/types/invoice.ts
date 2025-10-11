import { type UpdateInvoiceDto } from '../dto/update-invoice';
import { type CreateInvoiceDto } from '../dto/create-invoice';
import { type User } from 'src/modules/users/types/user';
import { type File } from 'src/modules/files/type/file';

export type UserWithoutAccounts = Omit<User, 'accounts'>;

export type Invoice = {
  service_description: string;
  invoice_number: number;
  license_plate: string;
  vehicle_model: string;
  customer_name: string;
  service_price: number;
  total_amount: number;
  labor_cost: number;
  part_name: string;
  userId: string;
  cost: number;
  id: string;
  file: File;
  user: User;
  date: Date;
};

export type BaseInvoiceType = {
  service_description: string;
  user: UserWithoutAccounts;
  invoice_number: number;
  customer_name: string;
  service_price: number;
  license_plate: string;
  vehicle_model: string;
  total_amount: number;
  labor_cost: number;
  part_name: string;
  file: File | null;
  userId: string;
  cost: number;
  date: Date;
  id: string;
};

export type GetAllInvoicesRequest = {
  per_page: number;
  page: number;
};

export type GetllInvoicesResponse = Awaited<{
  data: BaseInvoiceType[];
  total_pages: number;
  per_page: number;
  total: number;
  page: number;
}>;

export type GetInvoiceRequest = {
  id: string;
};

export type GetInvoiceResponse = Awaited<BaseInvoiceType>;

export type CreateInvoiceRequest = {
  invoiceData: CreateInvoiceDto;
  file: Express.Multer.File;
};

export type CreateInvoiceResponse = Awaited<BaseInvoiceType>;

export type UpdateInvoiceRequest = {
  invoiceData: Partial<UpdateInvoiceDto>;
  id: string;
};

export type UpdateInvoiceResponse = Awaited<BaseInvoiceType>;

export type DeleteInvoiceRequest = {
  id: string;
};
