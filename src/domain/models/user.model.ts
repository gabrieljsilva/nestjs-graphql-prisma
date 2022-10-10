import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  credentials?: Credentials;
}
