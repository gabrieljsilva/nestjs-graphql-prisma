import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@decorators';
import { Role } from './role.model';

@ObjectType()
export class Credentials {
  @FilterableField()
  id: string;

  @FilterableField()
  @Field()
  email: string;

  password: string;

  roles: Role[];
}
