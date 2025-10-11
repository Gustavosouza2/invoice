import { Test } from '@nestjs/testing';
import { Stream } from 'stream';

import { FilesService } from './files.service';

jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: 'https://public.url' } }),
      }),
    },
  }),
}));

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = moduleRef.get(FilesService);
  });

  it('uploadFileToSupabase', async () => {
    const file = {
      originalname: 'a.png',
      buffer: Buffer.from('x'),
      mimetype: 'image/png',
      fieldname: 'file',
      size: 1,
      encoding: '7bit',
      destination: '',
      filename: '',
      path: '',
      stream: undefined as unknown as Stream,
    } as unknown as Express.Multer.File;

    const result = await service.uploadFileToSupabase({ file });
    expect(result).toBe('https://public.url');
  });
});
