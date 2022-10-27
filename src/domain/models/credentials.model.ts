import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@decorators';

@ObjectType()
export class Credentials {
  @FilterableField()
  id: string;

  @FilterableField()
  @Field()
  email: string;

  password: string;
}
