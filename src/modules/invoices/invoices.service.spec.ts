import { Test } from '@nestjs/testing';

import type {
  GetAllInvoicesRequest,
  CreateInvoiceRequest,
} from './types/invoice';
import { FilesService } from '../files/files.service';
import { InvoicesService } from './invoices.service';

type InvoiceRow = { id: string };

type InvoiceModelMock = {
  findMany: jest.Mock<Promise<InvoiceRow[]>, [object?]>;
  count: jest.Mock<Promise<number>, [void?]>;
  findUnique: jest.Mock<Promise<InvoiceRow | null>, [object]>;
  create: jest.Mock<Promise<InvoiceRow>, [object]>;
  update: jest.Mock<Promise<InvoiceRow>, [object]>;
  delete: jest.Mock<Promise<InvoiceRow>, [object]>;
};

type FileModelMock = {
  create: jest.Mock<Promise<InvoiceRow>, [object]>;
};

type PrismaMock = {
  invoice: InvoiceModelMock;
  file: FileModelMock;
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  const prismaMock: PrismaMock = {
    invoice: {
      findMany: jest.fn<Promise<InvoiceRow[]>, [object?]>(),
      count: jest.fn<Promise<number>, [void?]>(),
      findUnique: jest.fn<Promise<InvoiceRow | null>, [object]>(),
      create: jest.fn<Promise<InvoiceRow>, [object]>(),
      update: jest.fn<Promise<InvoiceRow>, [object]>(),
      delete: jest.fn<Promise<InvoiceRow>, [object]>(),
    },
    file: {
      create: jest.fn<Promise<InvoiceRow>, [object]>(),
    },
  };

  const filesMock: FilesService = {
    uploadFileToSupabase: jest.fn().mockResolvedValue('https://file.url'),
  } as unknown as FilesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InvoicesService,
        { provide: FilesService, useValue: filesMock },
      ],
    }).compile();

    service = moduleRef.get(InvoicesService);
    (service as unknown as { prisma: PrismaMock }).prisma = prismaMock;
    jest.clearAllMocks();
  });

  it('findAllInvoices', async () => {
    prismaMock.invoice.findMany.mockResolvedValue([{ id: '1' }]);
    prismaMock.invoice.count.mockResolvedValue(1);
    const req: GetAllInvoicesRequest = {
      page: 1,
      per_page: 10,
    };
    const result = await service.findAllInvoices(req);
    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
  });

  it('createInvoice', async () => {
    prismaMock.invoice.create.mockResolvedValue({ id: '1' });
    prismaMock.invoice.findUnique.mockResolvedValue({
      id: '1',
      file: {},
      user: {},
    } as InvoiceRow);
    const invoiceData = {
      service_description: 's',
      invoice_number: '5',
      license_plate: 'ABC1234',
      customer_name: 'c',
      vehicle_model: 'v',
      total_amount: '3',
      labor_cost: '4',
      part_name: 'p',
      userId: 'u',
      cost: '1',
      service_price: '2',
      date: new Date(),
    } as unknown as CreateInvoiceRequest['invoiceData'];
    const result = await service.createInvoice({
      invoiceData,
      file: { mimetype: 'image/png' } as unknown as Express.Multer.File,
    });
    expect((result as InvoiceRow).id).toBeDefined();
    expect(() => {
      (filesMock.uploadFileToSupabase as unknown as () => void)();
    }).not.toThrow();
  });
});
