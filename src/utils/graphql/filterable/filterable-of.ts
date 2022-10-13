import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { filterableFieldsMap } from '@decorators';
import { Type } from '@nestjs/common';
import { FilterableInterface } from '../../../domain/interfaces/filter';
import { OrderableOption } from '../../../enums/orderable-option.enum';

export function FilterableOf(type: Type) {
  const [fields, Orderable] = filterableFieldsMap[type.name];
  const classRef = PickType(PartialType(type), fields, InputType);
  type ClassType = typeof classRef;

  @InputType()
  class Filterable implements FilterableInterface<ClassType> {
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

    @Field(() => Orderable, { nullable: true })
    ORDER: Record<keyof ClassType, OrderableOption>;
  }

  return Filterable;
}
