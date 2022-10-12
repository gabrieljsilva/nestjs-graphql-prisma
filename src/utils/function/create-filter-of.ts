import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { filterableFieldsMap } from '@decorators';
import { Type } from '@nestjs/common';
import { FilterInterface } from '../../domain/interfaces/filter';

export function CreateFilterOf(type: Type) {
  const classRef = PickType(
    PartialType(type),
    filterableFieldsMap[type.name],
    InputType,
  );
  type ClassType = typeof classRef;

  @InputType()
  class Filter implements FilterInterface<ClassType> {
    @Field(() => classRef, { nullable: true })
    EQUALS: ClassType;

    @Field(() => classRef, { nullable: true })
    LIKE: ClassType;

    @Field(() => classRef, { nullable: true })
    NOT: ClassType;

    @Field(() => classRef, { nullable: true })
    AND: ClassType;

    @Field(() => classRef, { nullable: true })
    OR: ClassType;
  }

  return Filter;
}
