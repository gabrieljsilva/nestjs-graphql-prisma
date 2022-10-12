import { Type } from '@nestjs/common';

export const filterableFieldsMap = {};

export function FilterableEntity() {
  return (constructor: Type) => {
    filterableFieldsMap[constructor.name] = Reflect.getMetadata(
      'filterableFields',
      constructor,
    );
  };
}

export function FilterableField() {
  return (target: any, key: string) => {
    const fields = Reflect.getMetadata('filterableFields', target.constructor);
    fields
      ? fields.push(key)
      : Reflect.defineMetadata('filterableFields', [key], target.constructor);
  };
}
