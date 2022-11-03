import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { FileUploader } from './domain/types';

@Injectable()
export class UploaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploader: FileUploader,
  ) {}

  async upload(file: Express.Multer.File) {
    const fileMetadata = await this.fileUploader.upload(file);

    return this.prisma.upload.create({
      data: {
        id: fileMetadata.key,
        key: fileMetadata.key,
        url: fileMetadata.url,
        mimeType: fileMetadata.mimeType,
        originalName: fileMetadata.originalName,
      },
    });
  }

  async getFile(key: string) {
    return this.fileUploader.getFile(key);
  }
}
