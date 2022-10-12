import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableEntity, FilterableField } from '@decorators';

@FilterableEntity()
@ObjectType()
export class Credentials {
  @FilterableField()
  id: string;

  @FilterableField()
  @Field()
  email: string;

  password: string;
}
