import { PaginationMetadata } from './pagination-metadata';
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(model: Type<T>) {
  @ObjectType()
  class Paginated {
    @Field(() => [model])
    items: T[];

    @Field()
    meta: PaginationMetadata;
  }

  return Paginated;
}
