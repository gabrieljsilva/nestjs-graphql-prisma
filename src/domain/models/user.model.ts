import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import {
  FilterableEntity,
  FilterableField,
  OrderableEntity,
  OrderableField,
} from '@decorators';

@OrderableEntity()
@FilterableEntity()
@ObjectType()
export class User {
  @FilterableField()
  @Field()
  id: string;

  @OrderableField()
  @FilterableField()
  @Field()
  name: string;

  @Field()
  credentials?: Credentials;
}
