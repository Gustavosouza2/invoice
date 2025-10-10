import { Module } from '@nestjs/common';
import { ProjectAuthModule } from '../auth/auth.module';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
@Module({
  imports: [ProjectAuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
