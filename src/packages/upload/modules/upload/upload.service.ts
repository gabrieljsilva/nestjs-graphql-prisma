import { Injectable, StreamableFile } from '@nestjs/common';
import { UploaderService } from '../../../../infra/uploader/uploader.service';
import { PrismaService } from '@prisma/module';
import { NotFoundException } from '@exceptions';
import { RESOURCE } from '@enums';
import { UploadFilters } from '../../../../domain/filterables';
import { PrismaFilterAdapter } from '../../../../utils/adapters';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploaderService: UploaderService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    return this.uploaderService.upload(file);
  }

  async getFileById(id: string): Promise<StreamableFile> {
    const upload = await this.prisma.upload.findUnique({
      where: { id },
    });

    if (!upload) {
      throw new NotFoundException(RESOURCE.UPLOAD, { id });
    }

    const file = await this.uploaderService.getFile(upload.key);

    return new StreamableFile(file, {
      type: upload.mimeType,
    });
  }

  async getUploads(filters?: UploadFilters) {
    const filterAdapter = new PrismaFilterAdapter();

    return await this.prisma.upload.findMany({
      where: filters && filterAdapter.getQuery(filters),
    });
  }
}
