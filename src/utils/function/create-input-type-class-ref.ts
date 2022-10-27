import { Type } from '@nestjs/common';
import { InputType, PartialType, PickType } from '@nestjs/graphql';

export function createInputTypeClassRef(classType: Type, fields: string[]) {
  return PickType(PartialType(classType), fields, InputType);
}
