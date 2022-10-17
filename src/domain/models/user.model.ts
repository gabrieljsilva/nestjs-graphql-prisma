import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import { FilterableField } from '@decorators';

@ObjectType()
export class User {
  @Field()
  id: string;

  @FilterableField()
  @Field()
  name: string;

  @FilterableField()
  @Field()
  credentials?: Credentials;
}
