import { Injectable, StreamableFile } from '@nestjs/common';
import { UploaderService } from '../../../../infra/uploader/uploader.service';
import { PrismaService } from '@prisma/module';
import { NotFoundException } from '@exceptions';
import { RESOURCE } from '@enums';
import { UploadFilters } from '../../../../domain/filterables';
import { PaginationInput } from '../../../../utils/graphql';
import { calculatePaginationMetadata } from '../../../../utils/function';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';
import { Prisma } from '@prisma/client';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploaderService: UploaderService,
    private readonly graphqlFilterService: GraphqlFilterService,
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

    const uploads = await this.prisma.upload.findMany({
      take,
      skip,
      where:
        this.graphqlFilterService.getQuery<Prisma.UploadWhereInput>(filters),
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
