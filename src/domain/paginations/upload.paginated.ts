import { Paginated } from '../../utils/graphql';
import { Upload } from '@models';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadPaginated extends Paginated(Upload) {}
