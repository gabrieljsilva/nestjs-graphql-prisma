import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultTestingValue, FilterableField } from '@decorators';
import { Role } from './role.model';

@ObjectType()
export class Credentials {
  @FilterableField()
  @DefaultTestingValue('00000000-0000-4000-0000-000000000000')
  id: string;

  @FilterableField()
  @Field()
  @DefaultTestingValue('jonh.doe@email.com')
  email: string;

  password: string;

  @DefaultTestingValue(() => [Role])
  roles: Role[];
}
