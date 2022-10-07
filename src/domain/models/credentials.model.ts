import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Credentials {
  id: string;

  @Field()
  email: string;

  password: string;
}
