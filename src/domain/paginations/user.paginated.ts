import { Paginated } from '../../utils/graphql';
import { User } from '@models';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPaginated extends Paginated(User) {}
