import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
  @Field()
  currentPage: number;

  @Field()
  totalPages: number;

  @Field()
  totalItemsCount: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  nextPage?: number;

  @Field({ nullable: true })
  previousPage?: number;
}
