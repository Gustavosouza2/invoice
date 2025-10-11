import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

import { CustomException } from 'src/common/errors/exceptions/custom.exception';
import { ErrorCode } from 'src/common/errors/exceptions/error-codes';
import { PrismaClient } from 'generated/prisma';
import type {
  GetFileRequest,
  GetFileResponse,
  UpdateFileRequest,
  UpdateFileResponse,
} from './type/file';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new CustomException(
    ErrorCode.SERVICE_UNAVAILABLE,
    'Supabase environment variables are not set.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
@Injectable()
export class FilesService {
  private prisma = new PrismaClient();

  async findById({ id }: GetFileRequest): Promise<GetFileResponse> {
    const file = await this.prisma.file.findUnique({ where: { id } });

    if (!file) {
      throw new CustomException(ErrorCode.NOT_FOUND, 'File not found');
    }

    return file;
  }

  async uploadFileToSupabase({
    file,
  }: UpdateFileRequest): Promise<UpdateFileResponse> {
    const filePath = `invoices/${Date.now()}_${file.originalname}`;
    const { error } = await supabase.storage
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

    const { data: publicUrlData } = supabase.storage
      .from('invoices')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl;
  }
}
