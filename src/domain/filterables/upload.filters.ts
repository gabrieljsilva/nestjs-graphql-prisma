import { FilterableOf } from '../../utils/graphql/filterable';
import { Upload } from '@models';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UploadFilters extends FilterableOf(Upload) {}
