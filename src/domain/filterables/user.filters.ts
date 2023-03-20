import { FilterableOf } from '@gabrieljsilva/nestjs-graphql-filter';
import { User } from '@models';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserFilters extends FilterableOf(User) {}
