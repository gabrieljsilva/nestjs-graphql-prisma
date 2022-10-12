import { InputType } from '@nestjs/graphql';
import { User } from '@models';
import { FilterableOf } from '../../utils/graphql/filterable';

@InputType()
export class UserFilters extends FilterableOf(User) {}
