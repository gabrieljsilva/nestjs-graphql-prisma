import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import { DefaultTestingValue } from '@decorators';
import { FilterableField } from '@gabrieljsilva/nestjs-graphql-filter';

@ObjectType()
export class User {
  @FilterableField()
  @Field()
  @DefaultTestingValue('00000000-0000-4000-0000-000000000000')
  id: string;

  @FilterableField()
  @Field()
  @DefaultTestingValue('John Doe')
  name: string;

  @FilterableField()
  @Field()
  @DefaultTestingValue(() => Credentials)
  credentials?: Credentials;
}
