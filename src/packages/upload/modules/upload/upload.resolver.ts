import { Args, Query, Resolver } from '@nestjs/graphql';
import { Upload } from '@models';
import { UploadService } from './upload.service';
import { UploadFilters } from '../../../../domain/filterables';

@Resolver(Upload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => [Upload])
  async getUploads(@Args('filters') filters: UploadFilters) {
    return this.uploadService.getUploads(filters);
  }
}
