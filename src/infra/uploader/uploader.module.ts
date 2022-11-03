import { DynamicModule, Module, Type } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileUploader } from './domain/types';
import { LocalUploadProvider } from './domain/providers/localUploadProvider';

@Module({
  providers: [UploaderService],
})
export class UploaderModule {
  static forRoot(
    provider: Type<FileUploader> = LocalUploadProvider,
  ): DynamicModule {
    return {
      module: UploaderModule,
      imports: [],
      providers: [
        UploaderService,
        {
          provide: FileUploader,
          useClass: provider,
        },
      ],
      exports: [UploaderService],
    };
  }
}
