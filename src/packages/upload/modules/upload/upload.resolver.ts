import { Args, Query, Resolver } from '@nestjs/graphql';
import { Upload } from '@models';
import { UploadService } from './upload.service';
import { UploadFilters } from '../../../../domain/filterables';
import { PaginationInput } from '../../../../utils/graphql';
import { UploadPaginated } from '../../../../domain/paginations';

@Resolver(Upload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => UploadPaginated)
  async getUploads(
    @Args('filters') filters: UploadFilters,
    @Args('pagination') paginationInput: PaginationInput,
  ) {
    return this.uploadService.getUploads(paginationInput, filters);
  }
}
