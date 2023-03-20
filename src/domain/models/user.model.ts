import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import { FilterableField } from '@gabrieljsilva/nestjs-graphql-filter';

@ObjectType()
export class User {
  @FilterableField()
  @Field()
  id: string;

  @FilterableField()
  @Field()
  name: string;

  @FilterableField()
  @Field()
  credentials?: Credentials;
}
