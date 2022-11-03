import { Injectable, StreamableFile } from '@nestjs/common';
import { UploaderService } from '../../../../infra/uploader/uploader.service';
import { PrismaService } from '@prisma/module';
import { NotFoundException } from '@exceptions';
import { RESOURCE } from '@enums';
import { UploadFilters } from '../../../../domain/filterables';
import { PrismaFilterAdapter } from '../../../../utils/adapters';
import { PaginationInput } from '../../../../utils/graphql';
import { calculatePaginationMetadata } from '../../../../utils/function';

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

  async getUploads(
    paginationInput = new PaginationInput(),
    filters?: UploadFilters,
  ) {
    const { take, skip } = paginationInput;

    const totalItemsCount = await this.prisma.upload.count();

    const filterAdapter = new PrismaFilterAdapter();

    const uploads = await this.prisma.upload.findMany({
      take,
      skip,
      where: filters && filterAdapter.getQuery(filters),
    });

    const paginationMetadata = calculatePaginationMetadata({
      skip,
      take,
      totalItemsCount,
    });

    return {
      items: uploads,
      meta: paginationMetadata,
    };
  }
}
