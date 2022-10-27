import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field()
  take: number;

  @Field()
  skip: number;
}
