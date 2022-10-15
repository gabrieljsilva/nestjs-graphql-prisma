import { FilterableOf } from '../../utils/graphql/filterable';
import { User } from '@models';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserFilters extends FilterableOf(User) {}
