import { FilterableOf } from '../../utils/graphql/filterable';
import { Credentials } from '@models';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CredentialFilters extends FilterableOf(Credentials) {}
