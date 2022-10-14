import { Type } from '@nestjs/common';
import { InputType, PartialType, PickType } from '@nestjs/graphql';

export function createClassTypeRef(classType: Type, fields: string[]) {
  return PickType(PartialType(classType), fields, InputType);
}
