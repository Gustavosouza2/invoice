import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

import { FilesService } from './files.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtGuard)
  @Get('/get-file/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    return res.download(join(process.cwd(), file.url));
  }
}
