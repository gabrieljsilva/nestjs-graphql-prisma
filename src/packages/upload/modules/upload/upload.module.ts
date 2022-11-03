import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { UploaderModule } from '../../../../infra/uploader/uploader.module';
import { LocalUploadProvider } from '../../../../infra/uploader/domain/providers/localUploadProvider';
import { UploadController } from './upload.controller';

@Module({
  imports: [UploaderModule.forRoot(LocalUploadProvider)],
  providers: [UploadService, UploadResolver],
  controllers: [UploadController],
  exports: [UploadResolver],
})
export class UploadModule {}
