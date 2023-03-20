import { FilterableOf } from '@gabrieljsilva/nestjs-graphql-filter';
import { Upload } from '@models';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UploadFilters extends FilterableOf(Upload) {}
