import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import { FilterableEntity, FilterableField } from '@decorators';

@FilterableEntity()
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
